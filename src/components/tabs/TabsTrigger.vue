<script setup lang="ts">
import { computed, inject } from 'vue'

import {
  tabsContextKey,
  type TabValue,
} from './tabsContext'

/**
 * TabsTrigger Props입니다.
 */
interface TabsTriggerProps {
  /**
   * 해당 탭 버튼이 가리키는 고유 값입니다.
   */
  value: TabValue

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<TabsTriggerProps>(), {
  disabled: false,
  class: '',
})

/**
 * 클릭 이벤트입니다.
 */
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

/**
 * TabsRoot에서 제공한 Context를 가져옵니다.
 */
const tabs = inject(tabsContextKey)

if (!tabs) {
  throw new Error(
    'TabsTrigger는 TabsRoot 내부에서만 사용할 수 있습니다.',
  )
}

/**
 * 현재 탭이 선택되었는지 확인합니다.
 */
const selected = computed(() => {
  return tabs.value.value === props.value
})

/**
 * 접근성을 위해 trigger와 panel의 id를 연결합니다.
 */
const triggerId = computed(() => {
  return `${tabs.baseId}-trigger-${props.value}`
})

const panelId = computed(() => {
  return `${tabs.baseId}-panel-${props.value}`
})

/**
 * trigger className입니다.
 */
const triggerClassName = computed(() => {
  return [
    'tabs__trigger',
    selected.value && 'tabs__trigger--active',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

/**
 * 클릭 시 탭 값을 변경합니다.
 */
const handleClick = (event: MouseEvent) => {
  if (props.disabled) return

  tabs.setValue(props.value)
  emit('click', event)
}

/**
 * 키보드 조작 처리입니다.
 *
 * Enter / Space 키로 선택 가능하게 합니다.
 */
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) return

  if (event.key !== 'Enter' && event.key !== ' ') return

  event.preventDefault()
  tabs.setValue(props.value)
}
</script>

<template>
  <button
    type="button"
    :id="triggerId"
    :class="triggerClassName"
    role="tab"
    :aria-selected="selected"
    :aria-controls="panelId"
    :tabindex="selected ? 0 : -1"
    :disabled="disabled"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot />
  </button>
</template>