<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  provide,
  ref,
  watch,
} from 'vue'

import './Accordion.css'

import {
  AccordionContextKey,
  type AccordionContextValue,
  type AccordionType,
  type AccordionValue,
} from './accordionContext'

defineOptions({
  name: 'Accordion',
})

const props = withDefaults(
  defineProps<{
    /**
     * 하나만 열지, 여러 개를 열지 결정합니다.
     */
    type?: AccordionType

    /**
     * v-model로 제어할 현재 열린 값입니다.
     *
     * single이어도 내부 처리를 통일하기 위해 string[]도 허용합니다.
     */
    modelValue?: AccordionValue | AccordionValue[]

    /**
     * 비제어 방식에서 처음 열려 있을 값입니다.
     */
    defaultValue?: AccordionValue | AccordionValue[]

    /**
     * single 모드에서 이미 열린 아이템을 다시 클릭했을 때 닫을 수 있는지 여부입니다.
     */
    collapsible?: boolean

    /**
     * 추가 클래스입니다.
     */
    class?: string
  }>(),
  {
    type: 'single',
    collapsible: true,
  },
)

const emit = defineEmits<{
  /**
   * v-model 업데이트 이벤트입니다.
   */
  'update:modelValue': [value: AccordionValue[]]

  /**
   * 열림 값이 변경될 때 실행되는 이벤트입니다.
   */
  change: [value: AccordionValue[]]
}>()

/**
 * 문자열 또는 배열 값을 항상 배열로 변환합니다.
 */
function normalizeValue(
  value?: AccordionValue | AccordionValue[],
): AccordionValue[] {
  if (!value) return []

  return Array.isArray(value)
    ? value
    : [value]
}

/**
 * 컴포넌트 인스턴스 uid를 활용해서 aria 연결용 id를 만듭니다.
 */
const instance = getCurrentInstance()

const baseId = `accordion-${instance?.uid ?? Math.random().toString(36).slice(2)}`

/**
 * modelValue가 있으면 제어 방식으로 판단합니다.
 */
const isControlled = computed(() => props.modelValue !== undefined)

/**
 * 비제어 방식에서 사용할 내부 상태입니다.
 */
const uncontrolledValues = ref<AccordionValue[]>(
  normalizeValue(props.defaultValue),
)

/**
 * 현재 열려 있는 값입니다.
 *
 * 제어 방식이면 modelValue를 사용하고,
 * 비제어 방식이면 내부 상태를 사용합니다.
 */
const openValues = computed<AccordionValue[]>(() => {
  if (isControlled.value) {
    return normalizeValue(props.modelValue)
  }

  return uncontrolledValues.value
})

/**
 * type을 computed로 제공해서 하위 컴포넌트에서 반응형으로 사용할 수 있게 합니다.
 */
const accordionType = computed(() => props.type)

/**
 * 특정 아이템을 열거나 닫습니다.
 */
function toggleValue(targetValue: AccordionValue) {
  const isAlreadyOpen = openValues.value.includes(targetValue)

  let nextValues: AccordionValue[]

  if (props.type === 'single') {
    /**
     * single 모드에서는 하나만 열립니다.
     */
    if (isAlreadyOpen) {
      /**
       * collapsible이 true일 때만 다시 클릭해서 닫을 수 있습니다.
       */
      nextValues = props.collapsible
        ? []
        : [targetValue]
    } else {
      nextValues = [targetValue]
    }
  } else {
    /**
     * multiple 모드에서는 여러 개를 동시에 열 수 있습니다.
     */
    if (isAlreadyOpen) {
      nextValues = openValues.value.filter((value) => value !== targetValue)
    } else {
      nextValues = [...openValues.value, targetValue]
    }
  }

  /**
   * 비제어 방식이면 내부 상태를 변경합니다.
   */
  if (!isControlled.value) {
    uncontrolledValues.value = nextValues
  }

  /**
   * v-model과 change 이벤트를 모두 발생시킵니다.
   */
  emit('update:modelValue', nextValues)
  emit('change', nextValues)
}

/**
 * type이 single로 바뀌었는데 열린 값이 여러 개라면 첫 번째 값만 유지합니다.
 */
watch(
  () => props.type,
  (nextType) => {
    if (nextType !== 'single') return

    if (openValues.value.length <= 1) return

    const nextValues = openValues.value.slice(0, 1)

    if (!isControlled.value) {
      uncontrolledValues.value = nextValues
    }

    emit('update:modelValue', nextValues)
    emit('change', nextValues)
  },
)

/**
 * 하위 AccordionItem, AccordionTrigger, AccordionContent에서 사용할 값을 제공합니다.
 */
const contextValue: AccordionContextValue = {
  type: accordionType,
  openValues,
  toggleValue,
  baseId,
}

provide(AccordionContextKey, contextValue)
</script>

<template>
  <div
    class="accordion"
    :class="$props.class"
  >
    <slot />
  </div>
</template>