<script setup lang="ts">
import './Radio.css'
import { computed } from 'vue'
/**
 * Radio 컴포넌트 props입니다.
 */
interface RadioProps {
  /**
   * v-model로 전달받는 현재 선택 값입니다.
   */
  modelValue?: string | number | boolean

  /**
   * 현재 Radio가 가지는 실제 값입니다.
   */
  value: string | number | boolean

  /**
   * input name 속성입니다.
   * 같은 그룹의 Radio는 동일한 name을 가져야 합니다.
   */
  name?: string

  /**
   * label prop으로 텍스트를 전달할 때 사용합니다.
   */
  label?: string

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean

  /**
   * 에러 상태 여부입니다.
   */
  error?: boolean

  /**
   * input id입니다.
   */
  id?: string

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  name: undefined,
  label: '',
  disabled: false,
  error: false,
  id: undefined,
  class: '',
})

/**
 * v-model 업데이트 이벤트입니다.
 */
const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean, event: Event]
}>()

/**
 * 현재 Radio가 선택되었는지 확인합니다.
 */
const isChecked = computed(() => {
  return props.modelValue === props.value
})

/**
 * Radio className입니다.
 */
const radioClassName = computed(() => {
  return [
    'radio',
    props.error && 'radio--error',
    props.disabled && 'radio--disabled',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

/**
 * Radio 값 변경 처리 함수입니다.
 */
const handleChange = (event: Event) => {
  if (props.disabled) return

  emit('update:modelValue', props.value)
  emit('change', props.value, event)
}
</script>

<template>
  <label :class="radioClassName">
    <input
      :id="id"
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      :aria-invalid="error"
      @change="handleChange"
    />

    <span class="radio__circle" />

    <span
      v-if="$slots.default || label"
      class="radio__label"
    >
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>