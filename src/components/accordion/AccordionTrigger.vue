<!-- components/accordion/AccordionTrigger.vue -->

<script setup lang="ts">
import {
  computed,
  inject,
} from 'vue'

import {
  AccordionContextKey,
  AccordionItemContextKey,
} from './accordionContext'

defineOptions({
  name: 'AccordionTrigger',
})

const props = withDefaults(
  defineProps<{
    /**
     * 버튼 비활성 여부입니다.
     */
    disabled?: boolean

    /**
     * 추가 클래스입니다.
     */
    class?: string
  }>(),
  {
    disabled: false,
  },
)

const accordion = inject(AccordionContextKey)
const item = inject(AccordionItemContextKey)

if (!accordion) {
  throw new Error(
    'AccordionTrigger는 <Accordion> 내부에서만 사용할 수 있습니다.',
  )
}

if (!item) {
  throw new Error(
    'AccordionTrigger는 <AccordionItem> 내부에서만 사용할 수 있습니다.',
  )
}

/**
 * item disabled 또는 trigger disabled 중 하나라도 true면 비활성 처리합니다.
 */
const isDisabled = computed(() => {
  return props.disabled || item.disabled.value
})

/**
 * 제목 버튼 클릭 시 열림/닫힘을 토글합니다.
 */
function handleClick() {
  if (isDisabled.value) return

  accordion.toggleValue(item.value)
}
</script>

<template>
  <button
    type="button"
    :id="item.triggerId"
    class="accordion__trigger"
    :class="$props.class"
    :aria-expanded="item.isOpen.value"
    :aria-controls="item.contentId"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <span class="accordion__title">
      <slot />
    </span>

    <span
      class="accordion__icon"
      aria-hidden="true"
    >
      <!--
        icon 슬롯이 있으면 커스텀 아이콘을 사용하고,
        없으면 기본 화살표를 사용합니다.
      -->
      <slot name="icon">
        ⌄
      </slot>
    </span>
  </button>
</template>