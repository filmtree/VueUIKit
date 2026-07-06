<!-- components/accordion/AccordionContent.vue -->

<script setup lang="ts">
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import {
  AccordionItemContextKey,
} from './accordionContext'

defineOptions({
  name: 'AccordionContent',
})

const props = withDefaults(
  defineProps<{
    /**
     * 닫힌 콘텐츠를 DOM에서 제거할지 여부입니다.
     *
     * true이면 닫힘 애니메이션이 끝난 뒤 DOM에서 제거합니다.
     */
    unmountOnExit?: boolean

    /**
     * 추가 클래스입니다.
     */
    class?: string
  }>(),
  {
    unmountOnExit: false,
  },
)

const item = inject(AccordionItemContextKey)

if (!item) {
  throw new Error(
    'AccordionContent는 <AccordionItem> 내부에서만 사용할 수 있습니다.',
  )
}

/**
 * 실제 콘텐츠 높이를 측정할 내부 요소입니다.
 */
const innerRef = ref<HTMLDivElement | null>(null)

/**
 * 바깥 content에 적용할 height 값입니다.
 *
 * 닫힘: 0px
 * 열림: 실제 콘텐츠 scrollHeight
 */
const height = ref('0px')

/**
 * unmountOnExit를 사용할 때 렌더링 여부를 관리합니다.
 *
 * 닫힌 상태에서 바로 제거하면 닫힘 애니메이션을 볼 수 없으므로,
 * transition이 끝난 뒤 제거합니다.
 */
const shouldRender = ref(item.isOpen.value)

/**
 * 실제 DOM 렌더링 여부입니다.
 */
const shouldShowContent = computed(() => {
  if (!props.unmountOnExit) return true

  return shouldRender.value
})

let resizeObserver: ResizeObserver | null = null
let frameId = 0

/**
 * 현재 콘텐츠 높이를 다시 계산합니다.
 */
function updateHeight() {
  const innerElement = innerRef.value

  if (!innerElement) return

  if (item.isOpen.value) {
    height.value = `${innerElement.scrollHeight}px`
  } else {
    height.value = '0px'
  }
}

/**
 * requestAnimationFrame을 사용해서
 * 브라우저가 DOM을 반영한 다음 높이를 계산하게 합니다.
 */
function updateHeightNextFrame() {
  if (frameId) {
    window.cancelAnimationFrame(frameId)
  }

  frameId = window.requestAnimationFrame(() => {
    updateHeight()
  })
}

/**
 * ResizeObserver를 설정합니다.
 *
 * 내부 콘텐츠가 나중에 바뀌어도 높이를 다시 계산합니다.
 * 예:
 * - API 데이터 로딩 후 내용 증가
 * - 이미지 로딩 후 높이 증가
 * - 폰트 로딩 후 줄바꿈 변경
 */
function setupResizeObserver() {
  if (!innerRef.value) return

  if (resizeObserver) {
    resizeObserver.disconnect()
  }

  resizeObserver = new ResizeObserver(() => {
    if (item.isOpen.value) {
      updateHeight()
    }
  })

  resizeObserver.observe(innerRef.value)
}

/**
 * 열림/닫힘 상태가 바뀔 때 높이를 갱신합니다.
 */
watch(
  () => item.isOpen.value,
  async (isOpen) => {
    if (isOpen) {
      /**
       * 열릴 때는 먼저 DOM에 렌더링되도록 만듭니다.
       */
      shouldRender.value = true

      await nextTick()

      setupResizeObserver()
      updateHeightNextFrame()
    } else {
      /**
       * 닫힐 때는 height를 0px로 만듭니다.
       */
      updateHeightNextFrame()
    }
  },
  {
    immediate: true,
  },
)

/**
 * 컴포넌트가 마운트되면 ResizeObserver를 연결합니다.
 */
onMounted(async () => {
  await nextTick()

  setupResizeObserver()
  updateHeightNextFrame()
})

/**
 * transition이 끝났을 때 실행됩니다.
 */
function handleTransitionEnd(event: TransitionEvent) {
  if (event.propertyName !== 'height') return

  /**
   * 닫힘 애니메이션이 끝났고 unmountOnExit가 true이면 DOM에서 제거합니다.
   */
  if (!item.isOpen.value && props.unmountOnExit) {
    shouldRender.value = false
  }
}

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }

  if (frameId) {
    window.cancelAnimationFrame(frameId)
  }
})
</script>

<template>
  <div
    v-if="shouldShowContent"
    :id="item.contentId"
    class="accordion__content"
    :class="[
      item.isOpen.value && 'accordion__content--open',
      $props.class,
    ]"
    role="region"
    :aria-labelledby="item.triggerId"
    :aria-hidden="!item.isOpen.value"
    :data-state="item.isOpen.value ? 'open' : 'closed'"
    :style="{ height }"
    @transitionend="handleTransitionEnd"
  >
    <div
      ref="innerRef"
      class="accordion__content-inner"
    >
      <slot />
    </div>
  </div>
</template>