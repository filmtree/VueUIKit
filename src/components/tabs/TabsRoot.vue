<script setup lang="ts">
import {
  computed,
  provide,
  ref,
  useId,
} from 'vue'

import {
  tabsContextKey,
  type TabValue,
} from './tabsContext'

import './Tabs.css'

/**
 * TabsRoot Props입니다.
 */
interface TabsRootProps {
  /**
   * v-model로 전달받는 제어형 탭 값입니다.
   *
   * 이 값이 있으면 부모 상태로 탭을 제어합니다.
   */
  modelValue?: TabValue

  /**
   * 비제어 방식에서 처음 선택될 탭 값입니다.
   */
  defaultValue?: TabValue

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<TabsRootProps>(), {
  modelValue: undefined,
  defaultValue: '',
  class: '',
})

/**
 * 부모 컴포넌트로 탭 변경 값을 전달합니다.
 */
const emit = defineEmits<{
  'update:modelValue': [value: TabValue]
  valueChange: [value: TabValue]
}>()

/**
 * trigger와 panel의 id 연결을 위한 고유 id입니다.
 */
const baseId = useId()

/**
 * 비제어 방식에서 사용할 내부 상태입니다.
 */
const uncontrolledValue = ref<TabValue>(props.defaultValue)

/**
 * modelValue가 있으면 제어형으로 판단합니다.
 */
const isControlled = computed(() => {
  return props.modelValue !== undefined
})

/**
 * 실제 현재 선택된 탭 값입니다.
 */
const currentValue = computed<TabValue>({
  get() {
    return isControlled.value
      ? props.modelValue ?? ''
      : uncontrolledValue.value
  },

  set(nextValue) {
    /**
     * 비제어 방식이면 내부 상태를 변경합니다.
     */
    if (!isControlled.value) {
      uncontrolledValue.value = nextValue
    }

    /**
     * 제어형 / 비제어형과 관계없이 변경 이벤트를 전달합니다.
     */
    emit('update:modelValue', nextValue)
    emit('valueChange', nextValue)
  },
})

/**
 * 탭 값을 변경합니다.
 */
const setValue = (nextValue: TabValue) => {
  currentValue.value = nextValue
}

/**
 * 하위 TabsList, TabsTrigger, TabsPanel에서 사용할 값을 제공합니다.
 */
provide(tabsContextKey, {
  value: currentValue,
  setValue,
  baseId,
})

/**
 * TabsRoot className입니다.
 */
const tabsClassName = computed(() => {
  return [
    'tabs',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <div :class="tabsClassName">
    <slot />
  </div>
</template>