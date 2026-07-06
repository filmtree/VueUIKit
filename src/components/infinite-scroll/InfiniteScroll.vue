<script setup lang="ts">
    import {
      computed,
      toRef,
      useAttrs,
    } from 'vue'
    
    import { useInfiniteScroll } from '/src/composables/useInfiniteScroll'
    
    import './InfiniteScroll.css'
    
    defineOptions({
      /**
       * class, style, aria-* 등을 루트 요소에 직접 병합하기 위해 자동 상속을 끕니다.
       */
      inheritAttrs: false,
    })
    
    type InfiniteScrollProps = {
      /**
       * 다음 데이터를 더 불러올 수 있는지 여부입니다.
       */
      hasMore: boolean
    
      /**
       * 현재 데이터를 불러오는 중인지 여부입니다.
       */
      isLoading: boolean
    
      /**
       * 첫 진입 로딩 상태입니다.
       */
      isInitialLoading?: boolean
    
      /**
       * 에러 메시지입니다.
       */
      error?: string | null
    
      /**
       * 데이터가 없을 때 보여줄 문구입니다.
       */
      emptyText?: string
    
      /**
       * 로딩 중 보여줄 문구입니다.
       */
      loadingText?: string
    
      /**
       * 마지막 데이터까지 도달했을 때 보여줄 문구입니다.
       */
      endText?: string
    
      /**
       * 현재 렌더링된 아이템 개수입니다.
       */
      itemCount?: number
    
      /**
       * Infinite Scroll 감지 비활성화 여부입니다.
       */
      disabled?: boolean
    
      /**
       * 화면에 닿기 전 미리 감지할 거리입니다.
       */
      rootMargin?: string
    
      /**
       * IntersectionObserver threshold 값입니다.
       */
      threshold?: number
    }
    
    const props = withDefaults(defineProps<InfiniteScrollProps>(), {
      isInitialLoading: false,
      error: null,
      emptyText: '데이터가 없습니다.',
      loadingText: '불러오는 중입니다.',
      endText: '마지막 데이터입니다.',
      itemCount: 0,
      disabled: false,
      rootMargin: '300px',
      threshold: 0,
    })
    
    const emit = defineEmits<{
      /**
       * 다음 데이터를 불러와야 할 때 발생하는 이벤트입니다.
       */
      loadMore: []
    }>()
    
    const attrs = useAttrs()
    
    /**
     * 외부에서 전달된 class와 컴포넌트 기본 class를 병합합니다.
     */
    const infiniteScrollClassName = computed(() => {
      return [
        'infinite-scroll',
        attrs.class,
      ].filter(Boolean)
    })
    
    /**
     * class를 제외한 나머지 attrs만 루트 요소에 전달합니다.
     */
    const rootAttrs = computed(() => {
      const {
        class: _class,
        ...restAttrs
      } = attrs
    
      return restAttrs
    })
    
    /**
     * 빈 목록 상태입니다.
     */
    const isEmpty = computed(() => {
      return (
        !props.isInitialLoading &&
        !props.isLoading &&
        !props.error &&
        props.itemCount === 0
      )
    })
    
    /**
     * 하단 감지 요소를 보여줄지 결정합니다.
     */
    const showTarget = computed(() => {
      return (
        !props.disabled &&
        !props.error &&
        props.hasMore
      )
    })
    
    const { targetRef } = useInfiniteScroll({
      hasMore: toRef(props, 'hasMore'),
      isLoading: toRef(props, 'isLoading'),
      disabled: toRef(props, 'disabled'),
      rootMargin: toRef(props, 'rootMargin'),
      threshold: toRef(props, 'threshold'),
      onLoadMore: () => {
        emit('loadMore')
      },
    })
    </script>
    
    <template>
      <div
        :class="infiniteScrollClassName"
        v-bind="rootAttrs"
      >
        <div class="infinite-scroll__content">
          <slot />
        </div>
    
        <div
          v-if="isEmpty"
          class="infinite-scroll__empty"
        >
          <slot name="empty">
            {{ emptyText }}
          </slot>
        </div>
    
        <div
          v-if="error"
          class="infinite-scroll__error"
          role="alert"
        >
          <slot name="error">
            {{ error }}
          </slot>
        </div>
    
        <div
          v-if="isLoading"
          class="infinite-scroll__loading"
          aria-live="polite"
        >
          <slot name="loading">
            <span
              class="infinite-scroll__spinner"
              aria-hidden="true"
            />
            <span>{{ loadingText }}</span>
          </slot>
        </div>
    
        <div
          v-if="!hasMore && !isLoading && !error && itemCount > 0"
          class="infinite-scroll__end"
        >
          <slot name="end">
            {{ endText }}
          </slot>
        </div>
    
        <div
          v-if="showTarget"
          ref="targetRef"
          class="infinite-scroll__target"
          aria-hidden="true"
        />
      </div>
    </template>