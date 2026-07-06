<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import './CustomSelect.css'

/**
 * CustomSelect 크기 타입입니다.
 */
type CustomSelectSize = 'sm' | 'md' | 'lg'

/**
 * CustomSelect option 타입입니다.
 */
export type CustomSelectOption = {
  /**
   * 화면에 표시할 라벨입니다.
   */
  label: string

  /**
   * 실제 선택 값입니다.
   */
  value: string

  /**
   * option 비활성화 여부입니다.
   */
  disabled?: boolean
}

/**
 * CustomSelect props입니다.
 */
interface CustomSelectProps {
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
   * placeholder 문구입니다.
   */
  placeholder?: string

  /**
   * option 목록입니다.
   */
  options: CustomSelectOption[]

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
   * 크기입니다.
   */
  size?: CustomSelectSize

  /**
   * 전체 너비 여부입니다.
   */
  fullWidth?: boolean

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<CustomSelectProps>(), {
  modelValue: '',
  label: '',
  required: false,
  placeholder: '선택하세요',
  helperText: '',
  error: false,
  errorMessage: '',
  success: false,
  successMessage: '',
  size: 'md',
  fullWidth: false,
  disabled: false,
  class: '',
})

/**
 * 부모 컴포넌트로 선택 값을 전달합니다.
 */
const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, option: CustomSelectOption]
}>()

/**
 * CustomSelect 전체 영역 ref입니다.
 */
const rootRef = ref<HTMLDivElement | null>(null)

/**
 * dropdown 열림 상태입니다.
 */
const open = ref(false)

/**
 * 키보드 이동 시 현재 활성화된 option index입니다.
 */
const activeIndex = ref(-1)

/**
 * 현재 선택된 option입니다.
 */
const selectedOption = computed(() => {
  return props.options.find((option) => {
    return option.value === props.modelValue
  })
})

/**
 * 선택 가능한 option만 추출합니다.
 */
const enabledOptions = computed(() => {
  return props.options.filter((option) => {
    return !option.disabled
  })
})

/**
 * 에러 상태 계산입니다.
 */
const hasError = computed(() => {
  return props.error || Boolean(props.errorMessage)
})

/**
 * 성공 상태 계산입니다.
 */
const hasSuccess = computed(() => {
  return props.success || Boolean(props.successMessage)
})

/**
 * field className입니다.
 */
const fieldClassName = computed(() => {
  return props.fullWidth
    ? 'custom-select-field custom-select-field--full'
    : 'custom-select-field'
})

/**
 * button className입니다.
 */
const selectClassName = computed(() => {
  return [
    'custom-select',
    `custom-select--${props.size}`,
    props.fullWidth && 'custom-select--full',
    props.disabled && 'custom-select--disabled',
    open.value && 'custom-select--open',
    hasError.value && 'custom-select--error',
    !hasError.value && hasSuccess.value && 'custom-select--success',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

/**
 * option 선택 처리 함수입니다.
 */
const handleSelect = (option: CustomSelectOption) => {
  if (option.disabled) return

  emit('update:modelValue', option.value)
  emit('change', option.value, option)

  open.value = false
}

/**
 * 버튼 클릭 시 dropdown을 열고 닫습니다.
 */
const handleToggle = () => {
  if (props.disabled) return

  open.value = !open.value
}

/**
 * 외부 클릭 시 dropdown을 닫습니다.
 */
const handleDocumentClick = (event: MouseEvent) => {
  if (!rootRef.value) return

  const target = event.target as Node

  if (!rootRef.value.contains(target)) {
    open.value = false
  }
}

/**
 * 키보드 조작 처리 함수입니다.
 */
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) return

  /**
   * Enter 또는 Space로 열거나 선택합니다.
   */
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()

    if (!open.value) {
      open.value = true
      return
    }

    const targetOption = enabledOptions.value[activeIndex.value]

    if (targetOption) {
      handleSelect(targetOption)
    }
  }

  /**
   * ArrowDown으로 아래 option으로 이동합니다.
   */
  if (event.key === 'ArrowDown') {
    event.preventDefault()

    open.value = true

    activeIndex.value =
      activeIndex.value + 1 >= enabledOptions.value.length
        ? 0
        : activeIndex.value + 1
  }

  /**
   * ArrowUp으로 위 option으로 이동합니다.
   */
  if (event.key === 'ArrowUp') {
    event.preventDefault()

    open.value = true

    activeIndex.value =
      activeIndex.value - 1 < 0
        ? enabledOptions.value.length - 1
        : activeIndex.value - 1
  }

  /**
   * Escape로 dropdown을 닫습니다.
   */
  if (event.key === 'Escape') {
    open.value = false
  }
}

/**
 * option className을 생성합니다.
 */
const getOptionClassName = (option: CustomSelectOption) => {
  const selected = option.value === props.modelValue

  const active =
    enabledOptions.value[activeIndex.value]?.value === option.value

  return [
    'custom-select__option',
    selected && 'custom-select__option--selected',
    active && 'custom-select__option--active',
    option.disabled && 'custom-select__option--disabled',
  ]
    .filter(Boolean)
    .join(' ')
}

/**
 * option 선택 여부를 확인합니다.
 */
const isSelectedOption = (option: CustomSelectOption) => {
  return option.value === props.modelValue
}

/**
 * 컴포넌트가 마운트되면 외부 클릭 이벤트를 등록합니다.
 */
onMounted(() => {
  document.addEventListener('mousedown', handleDocumentClick)
})

/**
 * 컴포넌트가 제거되면 외부 클릭 이벤트를 정리합니다.
 */
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleDocumentClick)
})
</script>

<template>
  <div
    ref="rootRef"
    :class="fieldClassName"
  >
    <span
      v-if="label"
      class="custom-select-field__label"
    >
      {{ label }}

      <span
        v-if="required"
        class="custom-select-field__required"
      >
        *
      </span>
    </span>

    <button
      type="button"
      :class="selectClassName"
      :disabled="disabled"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-invalid="hasError"
      @click="handleToggle"
      @keydown="handleKeyDown"
    >
      <span
        :class="
          selectedOption
            ? 'custom-select__value'
            : 'custom-select__placeholder'
        "
      >
        {{ selectedOption ? selectedOption.label : placeholder }}
      </span>

      <span class="custom-select__arrow">
        ▼
      </span>
    </button>

    <ul
      v-if="open"
      class="custom-select__list"
      role="listbox"
    >
      <li
        v-for="option in options"
        :key="option.value"
        role="option"
        :aria-selected="isSelectedOption(option)"
        :class="getOptionClassName(option)"
        @click="handleSelect(option)"
      >
        {{ option.label }}
      </li>
    </ul>

    <p
      v-if="hasError && errorMessage"
      class="custom-select-field__message custom-select-field__message--error"
    >
      {{ errorMessage }}
    </p>

    <p
      v-else-if="!hasError && hasSuccess && successMessage"
      class="custom-select-field__message custom-select-field__message--success"
    >
      {{ successMessage }}
    </p>

    <p
      v-else-if="!hasError && !hasSuccess && helperText"
      class="custom-select-field__message custom-select-field__message--helper"
    >
      {{ helperText }}
    </p>
  </div>
</template>