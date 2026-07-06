<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import './RangeSlider.css'

/**
 * RangeSlider Props입니다.
 */
interface RangeSliderProps {
  /**
   * v-model로 전달받는 현재 값입니다.
   */
  modelValue: number

  /**
   * 최소값입니다.
   */
  min?: number

  /**
   * 최대값입니다.
   */
  max?: number

  /**
   * 증가/감소 단위입니다.
   */
  step?: number

  /**
   * 라벨입니다.
   */
  label?: string

  /**
   * 설명 문구입니다.
   */
  description?: string

  /**
   * 현재 값을 화면에 표시할지 여부입니다.
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
   * input id입니다.
   */
  id?: string

  /**
   * 추가 className입니다.
   */
  class?: string

  /**
   * 값 뒤에 붙일 단위입니다.
   *
   * 예: %, 원, 점
   */
  unit?: string

  /**
   * 숫자에 콤마를 표시할지 여부입니다.
   */
  comma?: boolean
}

const props = withDefaults(defineProps<RangeSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  label: '',
  description: '',
  showValue: true,
  showMinMax: true,
  disabled: false,
  error: '',
  id: undefined,
  class: '',
  unit: '',
  comma: false,
})

/**
 * 부모 컴포넌트로 값을 전달합니다.
 */
const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
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
 * value가 min/max 범위를 벗어나지 않도록 보정한 값입니다.
 */
const safeValue = computed(() => {
  return clamp(props.modelValue, props.min, props.max)
})

/**
 * track 안에서 채워진 영역의 퍼센트입니다.
 */
const percent = computed(() => {
  return getPercent(safeValue.value, props.min, props.max)
})

/**
 * 표시용 값 포맷 함수입니다.
 *
 * Vue template에서는 function prop을 받기보다
 * 실무적으로 unit/comma 옵션만 둬도 충분한 경우가 많습니다.
 */
const formatValue = (value: number) => {
  const formattedValue = props.comma
    ? value.toLocaleString()
    : String(value)

  return `${formattedValue}${props.unit}`
}

/**
 * RangeSlider className입니다.
 */
const rangeSliderClassName = computed(() => {
  return [
    'range-slider',
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
    '--range-percent': `${percent.value}%`,
  } as CSSProperties
})

/**
 * input 값 변경 처리입니다.
 */
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  const nextValue = Number(target.value)
  const nextSafeValue = clamp(nextValue, props.min, props.max)

  emit('update:modelValue', nextSafeValue)
  emit('change', nextSafeValue)
}
</script>

<template>
  <div :class="rangeSliderClassName">
    <div
      v-if="label || showValue"
      class="range-slider__header"
    >
      <label
        v-if="label"
        class="range-slider__label"
        :for="id"
      >
        {{ label }}
      </label>

      <strong
        v-if="showValue"
        class="range-slider__value"
      >
        {{ formatValue(safeValue) }}
      </strong>
    </div>

    <p
      v-if="description"
      class="range-slider__description"
    >
      {{ description }}
    </p>

    <div
      class="range-slider__control"
      :style="controlStyle"
    >
      <input
        :id="id"
        type="range"
        class="range-slider__input"
        :value="safeValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :aria-invalid="Boolean(error) || undefined"
        @input="handleChange"
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