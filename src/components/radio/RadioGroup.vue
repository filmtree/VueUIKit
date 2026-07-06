<script setup lang="ts">
import { computed } from 'vue'
import Radio from './Radio.vue'
import './Radio.css'

/**
 * RadioGroup 방향 타입입니다.
 */
type RadioDirection = 'vertical' | 'horizontal'

/**
 * Radio 옵션 타입입니다.
 */
export type RadioOption = {
  /**
   * 화면에 표시할 라벨입니다.
   */
  label: string

  /**
   * 실제 선택 값입니다.
   */
  value: string

  /**
   * 옵션별 비활성화 여부입니다.
   */
  disabled?: boolean
}

/**
 * RadioGroup props입니다.
 */
interface RadioGroupProps {
  /**
   * v-model로 전달받는 현재 선택 값입니다.
   */
  modelValue?: string

  /**
   * 그룹 label입니다.
   */
  label?: string

  /**
   * 필수값 표시 여부입니다.
   */
  required?: boolean

  /**
   * Radio name입니다.
   */
  name: string

  /**
   * Radio 옵션 목록입니다.
   */
  options: RadioOption[]

  /**
   * 배치 방향입니다.
   */
  direction?: RadioDirection

  /**
   * 그룹 전체 비활성화 여부입니다.
   */
  disabled?: boolean

  /**
   * 에러 상태 여부입니다.
   */
  error?: boolean

  /**
   * 에러 메시지입니다.
   */
  errorMessage?: string

  /**
   * 도움말 메시지입니다.
   */
  helperText?: string

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: undefined,
  label: '',
  required: false,
  direction: 'vertical',
  disabled: false,
  error: false,
  errorMessage: '',
  helperText: '',
  class: '',
})

/**
 * 부모 컴포넌트로 선택 값을 전달합니다.
 */
const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

/**
 * 현재 선택 값입니다.
 *
 * computed의 get/set을 사용하면
 * RadioGroup 내부에서 v-model처럼 사용할 수 있습니다.
 */
const selectedValue = computed({
  get() {
    return props.modelValue
  },

  set(value: string | undefined) {
    if (value === undefined) return

    emit('update:modelValue', value)
    emit('change', value)
  },
})

/**
 * 에러 상태 여부입니다.
 */
const hasError = computed(() => {
  return props.error || Boolean(props.errorMessage)
})

/**
 * RadioGroup className입니다.
 */
const groupClassName = computed(() => {
  return [
    'radio-group',
    `radio-group--${props.direction}`,
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

/**
 * 도움말 또는 에러 메시지와 연결할 id입니다.
 */
const messageId = computed(() => {
  return props.name ? `${props.name}-message` : undefined
})
</script>

<template>
  <fieldset
    :class="groupClassName"
    :aria-invalid="hasError"
    :aria-describedby="messageId"
  >
    <legend
      v-if="label"
      class="radio-group__legend"
    >
      {{ label }}

      <span
        v-if="required"
        class="radio-group__required"
      >
        *
      </span>
    </legend>

    <div class="radio-group__list">
      <Radio
        v-for="option in options"
        :key="option.value"
        v-model="selectedValue"
        :name="name"
        :value="option.value"
        :disabled="disabled || option.disabled"
        :error="hasError"
      >
        {{ option.label }}
      </Radio>
    </div>

    <p
      v-if="hasError && errorMessage"
      :id="messageId"
      class="radio-group__message radio-group__message--error"
    >
      {{ errorMessage }}
    </p>

    <p
      v-else-if="!hasError && helperText"
      :id="messageId"
      class="radio-group__message radio-group__message--helper"
    >
      {{ helperText }}
    </p>
  </fieldset>
</template>