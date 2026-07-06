<script setup lang="ts">
import { computed } from 'vue'
import './Select.css'

/**
 * Select 크기 타입입니다.
 */
type SelectSize = 'sm' | 'md' | 'lg'

/**
 * Select option 타입입니다.
 */
export type SelectOption = {
  /**
   * 화면에 표시할 option 라벨입니다.
   */
  label: string

  /**
   * 실제 option 값입니다.
   */
  value: string

  /**
   * option 비활성화 여부입니다.
   */
  disabled?: boolean
}

/**
 * Select props입니다.
 */
interface SelectProps {
  /**
   * v-model로 전달받는 현재 선택 값입니다.
   */
  modelValue?: string

  /**
   * 상단 라벨입니다.
   */
  label?: string

  /**
   * 필수 입력 표시 여부입니다.
   */
  required?: boolean

  /**
   * 도움말 문구입니다.
   */
  helperText?: string

  /**
   * 에러 상태 여부입니다.
   */
  error?: boolean

  /**
   * 에러 메시지입니다.
   */
  errorMessage?: string

  /**
   * 성공 상태 여부입니다.
   */
  success?: boolean

  /**
   * 성공 메시지입니다.
   */
  successMessage?: string

  /**
   * Select 크기입니다.
   */
  size?: SelectSize

  /**
   * 전체 너비 사용 여부입니다.
   */
  fullWidth?: boolean

  /**
   * option 목록입니다.
   */
  options?: SelectOption[]

  /**
   * placeholder option입니다.
   */
  placeholder?: string

  /**
   * select id입니다.
   */
  id?: string

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  label: '',
  required: false,
  helperText: '',
  error: false,
  errorMessage: '',
  success: false,
  successMessage: '',
  size: 'md',
  fullWidth: false,
  options: () => [],
  placeholder: '',
  id: undefined,
  disabled: false,
  class: '',
})

/**
 * 부모 컴포넌트로 선택 값을 전달합니다.
 */
const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, event: Event]
}>()

/**
 * 에러 상태 계산입니다.
 */
const hasError = computed(() => {
  return props.error || Boolean(props.errorMessage)
})

/**
 * 성공 상태 계산입니다.
 *
 * 에러가 있는 경우 성공 상태보다 에러 상태를 우선합니다.
 */
const hasSuccess = computed(() => {
  return props.success || Boolean(props.successMessage)
})

/**
 * 접근성 연결용 메시지 id입니다.
 */
const messageId = computed(() => {
  return props.id ? `${props.id}-message` : undefined
})

/**
 * select className입니다.
 */
const selectClassName = computed(() => {
  return [
    'select',
    `select--${props.size}`,
    props.fullWidth && 'select--full',
    hasError.value && 'select--error',
    !hasError.value && hasSuccess.value && 'select--success',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

/**
 * select field className입니다.
 */
const selectFieldClassName = computed(() => {
  return props.fullWidth
    ? 'select-field select-field--full'
    : 'select-field'
})

/**
 * select 값 변경 처리 함수입니다.
 */
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const nextValue = target.value

  emit('update:modelValue', nextValue)
  emit('change', nextValue, event)
}
</script>

<template>
  <div :class="selectFieldClassName">
    <label
      v-if="label"
      :for="id"
      class="select-field__label"
    >
      {{ label }}

      <span
        v-if="required"
        class="select-field__required"
      >
        *
      </span>
    </label>

    <div class="select-wrapper">
      <select
        :id="id"
        :value="modelValue"
        :class="selectClassName"
        :disabled="disabled"
        :aria-invalid="hasError"
        :aria-describedby="messageId"
        @change="handleChange"
      >
        <option
          v-if="placeholder"
          value=""
          disabled
        >
          {{ placeholder }}
        </option>

        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>

        <!--
          options 배열 외에 직접 option을 넣고 싶을 때 사용합니다.
        -->
        <slot />
      </select>

      <span class="select-arrow">
        ▼
      </span>
    </div>

    <p
      v-if="hasError && errorMessage"
      :id="messageId"
      class="select-field__message select-field__message--error"
    >
      {{ errorMessage }}
    </p>

    <p
      v-else-if="!hasError && hasSuccess && successMessage"
      :id="messageId"
      class="select-field__message select-field__message--success"
    >
      {{ successMessage }}
    </p>

    <p
      v-else-if="!hasError && !hasSuccess && helperText"
      :id="messageId"
      class="select-field__message select-field__message--helper"
    >
      {{ helperText }}
    </p>
  </div>
</template>