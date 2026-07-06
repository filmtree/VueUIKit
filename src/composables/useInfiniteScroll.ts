import {
    onBeforeUnmount,
    ref,
    watch,
    type Ref,
  } from 'vue'
  
  /**
   * ref 값 또는 일반 값을 모두 받을 수 있도록 만든 타입입니다.
   */
  type MaybeRef<T> = Ref<T> | T
  
  /**
   * Infinite Scroll 감지 옵션입니다.
   */
  export type UseInfiniteScrollOptions = {
    /**
     * 다음 데이터를 더 불러올 수 있는지 여부입니다.
     */
    hasMore: Ref<boolean>
  
    /**
     * 현재 로딩 중인지 여부입니다.
     */
    isLoading: Ref<boolean>
  
    /**
     * Infinite Scroll 감지를 비활성화할지 여부입니다.
     */
    disabled?: MaybeRef<boolean>
  
    /**
     * 감지 대상이 화면에 들어왔을 때 실행할 함수입니다.
     */
    onLoadMore: () => void
  
    /**
     * window가 아닌 특정 스크롤 박스를 기준으로 감지할 때 사용합니다.
     */
    rootRef?: Ref<HTMLElement | null>
  
    /**
     * 화면에 닿기 전에 미리 감지할 거리입니다.
     */
    rootMargin?: MaybeRef<string>
  
    /**
     * 감지 요소가 얼마나 보여야 실행할지 정합니다.
     */
    threshold?: MaybeRef<number>
  }
  
  /**
   * ref 값이면 value를 꺼내고,
   * 일반 값이면 그대로 반환합니다.
   */
  function resolveValue<T>(value: MaybeRef<T>): T {
    if (
      typeof value === 'object' &&
      value !== null &&
      'value' in value
    ) {
      return value.value
    }
  
    return value
  }
  
  /**
   * IntersectionObserver 기반 Infinite Scroll composable입니다.
   */
  export function useInfiniteScroll({
    hasMore,
    isLoading,
    disabled = false,
    onLoadMore,
    rootRef,
    rootMargin = '300px',
    threshold = 0,
  }: UseInfiniteScrollOptions) {
    /**
     * 화면 하단 감지용 DOM ref입니다.
     */
    const targetRef = ref<HTMLElement | null>(null)
  
    /**
     * IntersectionObserver 인스턴스입니다.
     */
    let observer: IntersectionObserver | null = null
  
    /**
     * 기존 observer를 정리합니다.
     */
    const cleanupObserver = () => {
      if (!observer) return
  
      observer.disconnect()
      observer = null
    }
  
    /**
     * observer를 새로 생성합니다.
     */
    const setupObserver = () => {
      cleanupObserver()
  
      const target = targetRef.value
      const root = rootRef?.value ?? null
      const isDisabled = resolveValue(disabled)
  
      /**
       * 감지 대상 DOM이 없으면 실행하지 않습니다.
       */
      if (!target) return
  
      /**
       * 비활성화 상태면 실행하지 않습니다.
       */
      if (isDisabled) return
  
      /**
       * 더 불러올 데이터가 없으면 실행하지 않습니다.
       */
      if (!hasMore.value) return
  
      /**
       * 이미 로딩 중이면 중복 요청을 막습니다.
       */
      if (isLoading.value) return
  
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
  
          if (!entry?.isIntersecting) return
          if (resolveValue(disabled)) return
          if (!hasMore.value) return
          if (isLoading.value) return
  
          onLoadMore()
        },
        {
          root,
          rootMargin: resolveValue(rootMargin),
          threshold: resolveValue(threshold),
        },
      )
  
      observer.observe(target)
    }
  
    /**
     * target, root, 로딩 상태, hasMore 상태가 바뀌면 observer를 다시 설정합니다.
     */
    watch(
      [
        targetRef,
        () => rootRef?.value ?? null,
        hasMore,
        isLoading,
        () => resolveValue(disabled),
        () => resolveValue(rootMargin),
        () => resolveValue(threshold),
      ],
      () => {
        setupObserver()
      },
      {
        immediate: true,
        flush: 'post',
      },
    )
  
    /**
     * 컴포넌트가 제거되면 observer를 정리합니다.
     */
    onBeforeUnmount(() => {
      cleanupObserver()
    })
  
    return {
      targetRef,
    }
  }