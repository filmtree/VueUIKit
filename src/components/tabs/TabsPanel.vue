<script setup lang="ts">
import { computed, inject } from 'vue'

import {
  tabsContextKey,
  type TabValue,
} from './tabsContext'

/**
 * TabsPanel Props입니다.
 */
interface TabsPanelProps {
  /**
   * 해당 패널이 어떤 탭 값과 연결되는지 지정합니다.
   */
  value: TabValue

  /**
   * 비활성 패널을 DOM에서 제거할지 여부입니다.
   */
  unmountOnExit?: boolean

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<TabsPanelProps>(), {
  unmountOnExit: true,
  class: '',
})

/**
 * TabsRoot에서 제공한 Context를 가져옵니다.
 */
const tabs = inject(tabsContextKey)

if (!tabs) {
  throw new Error(
    'TabsPanel은 TabsRoot 내부에서만 사용할 수 있습니다.',
  )
}

/**
 * 현재 패널이 선택되었는지 확인합니다.
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
 * panel className입니다.
 */
const panelClassName = computed(() => {
  return [
    'tabs__panel',
    selected.value && 'tabs__panel--active',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <!--
    unmountOnExit이 true이면 선택되지 않은 패널은 DOM에서 제거합니다.
  -->
  <div
    v-if="selected || !unmountOnExit"
    :id="panelId"
    :class="panelClassName"
    role="tabpanel"
    :aria-labelledby="triggerId"
    :hidden="!selected"
  >
    <slot />
  </div>
</template>