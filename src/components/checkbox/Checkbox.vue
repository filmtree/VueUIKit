<script setup lang="ts">
import { computed, ref, watch } from "vue";
import "./Checkbox.css";

/**
 * Checkbox props 타입입니다.
 */
type CheckboxProps = {
  /**
   * v-model로 전달되는 체크 상태입니다.
   */
  modelValue?: boolean;

  /**
   * 초기 체크 상태입니다.
   * 비제어 방식처럼 사용할 때 쓸 수 있습니다.
   */
  defaultChecked?: boolean;

  /**
   * 체크박스 id입니다.
   */
  id?: string;

  /**
   * 체크박스 name입니다.
   */
  name?: string;

  /**
   * 체크박스 value입니다.
   */
  value?: string;

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean;

  /**
   * 에러 상태 여부입니다.
   */
  error?: boolean;

  /**
   * 에러 메시지입니다.
   */
  errorMessage?: string;

  /**
   * 보조 안내 문구입니다.
   */
  helperText?: string;

  /**
   * 일부 선택 상태입니다.
   * 전체 체크박스에서 일부만 선택되었을 때 사용합니다.
   */
  indeterminate?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  id: undefined,
  name: undefined,
  value: undefined,
  disabled: false,
  error: false,
  errorMessage: "",
  helperText: "",
  indeterminate: false,
  class: "",
});

const emit = defineEmits<{
  /**
   * v-model 업데이트 이벤트입니다.
   */
  "update:modelValue": [value: boolean];

  /**
   * 체크 상태 변경 이벤트입니다.
   */
  change: [value: boolean, event: Event];
}>();

/**
 * 실제 input DOM입니다.
 * indeterminate는 HTML 속성이 아니라 DOM property로 직접 설정해야 합니다.
 */
const inputRef = ref<HTMLInputElement | null>(null);

/**
 * 내부 체크 상태입니다.
 * modelValue가 없을 때 defaultChecked 기반으로 동작합니다.
 */
const innerChecked = ref(props.defaultChecked);

/**
 * 제어 컴포넌트 여부입니다.
 */
const isControlled = computed(() => {
  return props.modelValue !== undefined;
});

/**
 * 실제 체크 상태입니다.
 */
const checked = computed(() => {
  return isControlled.value ? props.modelValue : innerChecked.value;
});

/**
 * 에러 상태 여부입니다.
 */
const hasError = computed(() => {
  return props.error || Boolean(props.errorMessage);
});

/**
 * 메시지 영역 id입니다.
 */
const messageId = computed(() => {
  return props.id ? `${props.id}-message` : undefined;
});

/**
 * Checkbox class 목록입니다.
 */
const checkboxClassName = computed(() => {
  return [
    "checkbox",
    hasError.value && "checkbox--error",
    props.disabled && "checkbox--disabled",
    props.indeterminate && "checkbox--indeterminate",
    props.class,
  ].filter(Boolean);
});

/**
 * indeterminate 상태를 input DOM property에 반영합니다.
 */
watch(
  () => props.indeterminate,
  (indeterminate) => {
    if (!inputRef.value) return;

    inputRef.value.indeterminate = indeterminate;
  },
  {
    immediate: true,
    flush: "post",
  }
);

/**
 * 체크박스 변경 이벤트입니다.
 */
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const nextChecked = target.checked;

  if (!isControlled.value) {
    innerChecked.value = nextChecked;
  }

  emit("update:modelValue", nextChecked);
  emit("change", nextChecked, event);
};
</script>

<template>
  <div class="checkbox-field">
    <label :class="checkboxClassName">
      <input
        ref="inputRef"
        :id="id"
        :name="name"
        :value="value"
        type="checkbox"
        :checked="checked"
        :disabled="disabled"
        :aria-invalid="hasError || undefined"
        :aria-describedby="messageId"
        @change="handleChange"
      />

      <span class="checkbox__box" />

      <span
        v-if="$slots.default"
        class="checkbox__label"
      >
        <slot />
      </span>
    </label>

    <p
      v-if="hasError && errorMessage"
      :id="messageId"
      class="checkbox-field__message checkbox-field__message--error"
    >
      {{ errorMessage }}
    </p>

    <p
      v-else-if="helperText"
      :id="messageId"
      class="checkbox-field__message checkbox-field__message--helper"
    >
      {{ helperText }}
    </p>
  </div>
</template>