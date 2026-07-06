import {
    onBeforeUnmount,
    ref,
  } from 'vue'
  
  /**
   * 페이지 요청 함수에 전달되는 옵션입니다.
   */
  type FetchPageOptions = {
    signal: AbortSignal
  }
  
  /**
   * 페이지 요청 결과 타입입니다.
   */
  export type InfiniteListResponse<T> = {
    items: T[]
    hasMore: boolean
  }
  
  /**
   * Infinite List composable 옵션입니다.
   */
  export type UseInfiniteListOptions<T> = {
    /**
     * 실제 데이터를 요청하는 함수입니다.
     */
    fetchPage: (
      page: number,
      options: FetchPageOptions
    ) => Promise<InfiniteListResponse<T>>
  
    /**
     * 첫 페이지 번호입니다.
     */
    initialPage?: number
  
    /**
     * 에러 발생 시 사용할 기본 메시지입니다.
     */
    errorMessage?: string
  }
  
  /**
   * API 요청, page, loading, error, refresh 상태를 관리하는 composable입니다.
   */
  export function useInfiniteList<T>({
    fetchPage,
    initialPage = 1,
    errorMessage = '데이터를 불러오지 못했습니다.',
  }: UseInfiniteListOptions<T>) {
    /**
     * 목록 데이터입니다.
     */
    const items = ref<T[]>([])
  
    /**
     * 현재 페이지 번호입니다.
     */
    const page = ref(initialPage)
  
    /**
     * 다음 데이터를 더 불러올 수 있는지 여부입니다.
     */
    const hasMore = ref(true)
  
    /**
     * 로딩 상태입니다.
     */
    const isLoading = ref(false)
  
    /**
     * 첫 진입 로딩 상태입니다.
     */
    const isInitialLoading = ref(true)
  
    /**
     * 에러 메시지입니다.
     */
    const error = ref<string | null>(null)
  
    /**
     * 진행 중인 요청을 취소하기 위한 AbortController입니다.
     */
    let abortController: AbortController | null = null
  
    /**
     * 특정 페이지를 불러옵니다.
     */
    const loadPage = async (
      nextPage: number,
      options?: {
        replace?: boolean
      },
    ) => {
      if (isLoading.value) return
      if (!hasMore.value && nextPage !== initialPage) return
  
      /**
       * 이전 요청이 남아 있으면 취소합니다.
       */
      abortController?.abort()
  
      const controller = new AbortController()
      abortController = controller
  
      const shouldReplace = options?.replace ?? nextPage === initialPage
  
      try {
        isLoading.value = true
        error.value = null
  
        if (shouldReplace && items.value.length === 0) {
          isInitialLoading.value = true
        }
  
        const response = await fetchPage(nextPage, {
          signal: controller.signal,
        })
  
        /**
         * 첫 페이지 요청이면 기존 목록을 교체합니다.
         * 다음 페이지 요청이면 기존 목록 뒤에 추가합니다.
         */
        if (shouldReplace) {
          items.value = response.items
        } else {
          items.value = [
            ...items.value,
            ...response.items,
          ]
        }
  
        page.value = nextPage
        hasMore.value = response.hasMore
      } catch (requestError) {
        /**
         * 요청 취소는 일반 에러로 처리하지 않습니다.
         */
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return
        }
  
        error.value = errorMessage
      } finally {
        isLoading.value = false
        isInitialLoading.value = false
      }
    }
  
    /**
     * 다음 페이지를 불러옵니다.
     */
    const loadMore = () => {
      loadPage(page.value + 1, {
        replace: false,
      })
    }
  
    /**
     * 목록을 첫 페이지부터 다시 불러옵니다.
     */
    const refresh = () => {
      hasMore.value = true
      page.value = initialPage
  
      loadPage(initialPage, {
        replace: true,
      })
    }
  
    /**
     * 목록 상태를 초기화합니다.
     */
    const reset = () => {
      abortController?.abort()
  
      items.value = []
      page.value = initialPage
      hasMore.value = true
      isLoading.value = false
      isInitialLoading.value = true
      error.value = null
    }
  
    /**
     * 컴포넌트가 사라질 때 진행 중인 요청을 취소합니다.
     */
    onBeforeUnmount(() => {
      abortController?.abort()
    })
  
    return {
      items,
      page,
      hasMore,
      isLoading,
      isInitialLoading,
      error,
      loadPage,
      loadMore,
      refresh,
      reset,
    }
  }