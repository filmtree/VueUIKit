<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import './RangeSlider.css'

/**
 * MultiRangeSlider 값 타입입니다.
 */
export type MultiRangeValue = {
  min: number
  max: number
}

/**
 * MultiRangeSlider Props입니다.
 */
interface MultiRangeSliderProps {
  /**
   * v-model로 전달받는 최소/최대 값입니다.
   */
  modelValue: MultiRangeValue

  /**
   * 전체 최소값입니다.
   */
  min?: number

  /**
   * 전체 최대값입니다.
   */
  max?: number

  /**
   * 증가/감소 단위입니다.
   */
  step?: number

  /**
   * 두 핸들 사이의 최소 간격입니다.
   */
  minGap?: number

  /**
   * 라벨입니다.
   */
  label?: string

  /**
   * 설명 문구입니다.
   */
  description?: string

  /**
   * 현재 선택 범위를 표시할지 여부입니다.
   */
  showValue?: boolean

  /**
   * min/max 값을 표시할지 여부입니다.
   */
  showMinMax?: boolean

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean

  /**
   * 에러 메시지입니다.
   */
  error?: string

  /**
   * 추가 className입니다.
   */
  class?: string

  /**
   * 값 뒤에 붙일 단위입니다.
   */
  unit?: string

  /**
   * 숫자에 콤마를 표시할지 여부입니다.
   */
  comma?: boolean
}

const props = withDefaults(defineProps<MultiRangeSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  minGap: undefined,
  label: '',
  description: '',
  showValue: true,
  showMinMax: true,
  disabled: false,
  error: '',
  class: '',
  unit: '',
  comma: false,
})

/**
 * 부모 컴포넌트로 최소/최대 값을 전달합니다.
 */
const emit = defineEmits<{
  'update:modelValue': [value: MultiRangeValue]
  change: [value: MultiRangeValue]
}>()

/**
 * 숫자를 min/max 사이로 보정합니다.
 */
const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

/**
 * 현재 값이 전체 범위에서 몇 % 위치인지 계산합니다.
 */
const getPercent = (value: number, min: number, max: number) => {
  if (max === min) return 0

  return ((value - min) / (max - min)) * 100
}

/**
 * 실제 사용할 최소 간격입니다.
 *
 * minGap을 따로 넘기지 않으면 step 값을 기본 간격으로 사용합니다.
 */
const gap = computed(() => {
  return props.minGap ?? props.step
})

/**
 * 외부에서 들어온 min 값을 안전하게 보정합니다.
 */
const safeMinValue = computed(() => {
  return clamp(props.modelValue.min, props.min, props.max)
})

/**
 * 외부에서 들어온 max 값을 안전하게 보정합니다.
 */
const safeMaxValue = computed(() => {
  return clamp(props.modelValue.max, props.min, props.max)
})

/**
 * minGap을 고려해서 실제 사용할 왼쪽 값입니다.
 */
const leftValue = computed(() => {
  return Math.min(
    safeMinValue.value,
    safeMaxValue.value - gap.value,
  )
})

/**
 * minGap을 고려해서 실제 사용할 오른쪽 값입니다.
 */
const rightValue = computed(() => {
  return Math.max(
    safeMaxValue.value,
    safeMinValue.value + gap.value,
  )
})

/**
 * track에서 선택된 구간의 시작 퍼센트입니다.
 */
const leftPercent = computed(() => {
  return getPercent(leftValue.value, props.min, props.max)
})

/**
 * track에서 선택된 구간의 끝 퍼센트입니다.
 */
const rightPercent = computed(() => {
  return getPercent(rightValue.value, props.min, props.max)
})

/**
 * 표시용 값 포맷 함수입니다.
 */
const formatValue = (value: number) => {
  const formattedValue = props.comma
    ? value.toLocaleString()
    : String(value)

  return `${formattedValue}${props.unit}`
}

/**
 * MultiRangeSlider className입니다.
 */
const multiRangeSliderClassName = computed(() => {
  return [
    'range-slider',
    'multi-range-slider',
    props.disabled && 'range-slider--disabled',
    props.error && 'range-slider--error',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

/**
 * CSS 변수 style입니다.
 */
const controlStyle = computed<CSSProperties>(() => {
  return {
    '--range-left': `${leftPercent.value}%`,
    '--range-right': `${100 - rightPercent.value}%`,
  } as CSSProperties
})

/**
 * 변경된 값을 부모 컴포넌트로 전달합니다.
 */
const updateValue = (nextValue: MultiRangeValue) => {
  emit('update:modelValue', nextValue)
  emit('change', nextValue)
}

/**
 * 왼쪽 핸들 변경 처리입니다.
 */
const handleMinChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  const nextMin = Number(target.value)

  /**
   * 왼쪽 값은 오른쪽 값 - minGap을 넘을 수 없습니다.
   */
  const nextSafeMin = clamp(
    nextMin,
    props.min,
    rightValue.value - gap.value,
  )

  updateValue({
    min: nextSafeMin,
    max: rightValue.value,
  })
}

/**
 * 오른쪽 핸들 변경 처리입니다.
 */
const handleMaxChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  const nextMax = Number(target.value)

  /**
   * 오른쪽 값은 왼쪽 값 + minGap보다 작아질 수 없습니다.
   */
  const nextSafeMax = clamp(
    nextMax,
    leftValue.value + gap.value,
    props.max,
  )

  updateValue({
    min: leftValue.value,
    max: nextSafeMax,
  })
}
</script>

<template>
  <div :class="multiRangeSliderClassName">
    <div
      v-if="label || showValue"
      class="range-slider__header"
    >
      <span
        v-if="label"
        class="range-slider__label"
      >
        {{ label }}
      </span>

      <strong
        v-if="showValue"
        class="range-slider__value"
      >
        {{ formatValue(leftValue) }} ~ {{ formatValue(rightValue) }}
      </strong>
    </div>

    <p
      v-if="description"
      class="range-slider__description"
    >
      {{ description }}
    </p>

    <div
      class="multi-range-slider__control"
      :style="controlStyle"
    >
      <div class="multi-range-slider__track" />
      <div class="multi-range-slider__range" />

      <input
        type="range"
        class="multi-range-slider__input multi-range-slider__input--left"
        :value="leftValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        aria-label="최소값"
        :aria-invalid="Boolean(error) || undefined"
        @input="handleMinChange"
      />

      <input
        type="range"
        class="multi-range-slider__input multi-range-slider__input--right"
        :value="rightValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        aria-label="최대값"
        :aria-invalid="Boolean(error) || undefined"
        @input="handleMaxChange"
      />
    </div>

    <div
      v-if="showMinMax"
      class="range-slider__minmax"
    >
      <span>{{ formatValue(min) }}</span>
      <span>{{ formatValue(max) }}</span>
    </div>

    <p
      v-if="error"
      class="range-slider__error"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>