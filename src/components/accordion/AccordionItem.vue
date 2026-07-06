<!-- components/accordion/AccordionItem.vue -->

<script setup lang="ts">
import {
  computed,
  inject,
  provide,
} from 'vue'

import {
  AccordionContextKey,
  AccordionItemContextKey,
  type AccordionItemContextValue,
  type AccordionValue,
} from './accordionContext'

defineOptions({
  name: 'AccordionItem',
})

const props = withDefaults(
  defineProps<{
    /**
     * Accordion item을 구분하는 고유 값입니다.
     */
    value: AccordionValue

    /**
     * 비활성 여부입니다.
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

/**
 * 상위 Accordion에서 제공한 context를 가져옵니다.
 */
const accordion = inject(AccordionContextKey)

if (!accordion) {
  throw new Error(
    'AccordionItem은 <Accordion> 내부에서만 사용할 수 있습니다.',
  )
}

/**
 * id에 들어가기 어려운 문자를 안전한 문자열로 변환합니다.
 */
function createSafeIdSegment(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, '-')
}

const safeValue = createSafeIdSegment(props.value)

/**
 * 현재 item이 열려 있는지 여부입니다.
 */
const isOpen = computed(() => {
  return accordion.openValues.value.includes(props.value)
})

/**
 * disabled를 computed로 제공해서 하위 컴포넌트에서 반응형으로 사용할 수 있게 합니다.
 */
const disabled = computed(() => props.disabled)

/**
 * aria 연결을 위한 id입니다.
 */
const triggerId = `${accordion.baseId}-trigger-${safeValue}`
const contentId = `${accordion.baseId}-content-${safeValue}`

const itemContextValue: AccordionItemContextValue = {
  value: props.value,
  isOpen,
  disabled,
  triggerId,
  contentId,
}

provide(AccordionItemContextKey, itemContextValue)
</script>

<template>
  <div
    class="accordion__item"
    :class="[
      isOpen && 'accordion__item--open',
      disabled && 'accordion__item--disabled',
      $props.class,
    ]"
    :data-state="isOpen ? 'open' : 'closed'"
    :data-disabled="disabled || undefined"
  >
    <slot />
  </div>
</template>