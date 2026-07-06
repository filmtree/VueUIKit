<script setup lang="ts">
import { computed, useAttrs, useId } from "vue";
import "./Input.css";

/**
 * Input 크기 타입입니다.
 */
export type InputSize =
  | "sm"
  | "md"
  | "lg";

/**
 * Input modelValue 타입입니다.
 * input value는 일반적으로 string, number를 주로 사용합니다.
 */
export type InputModelValue =
  | string
  | number;

/**
 * Input props 타입입니다.
 */
type InputProps = {
  /**
   * v-model로 전달되는 입력값입니다.
   */
  modelValue?: InputModelValue;

  /**
   * input 상단에 표시할 라벨입니다.
   */
  label?: string;

  /**
   * 필수 입력 표시 여부입니다.
   */
  required?: boolean;

  /**
   * 기본 안내 문구입니다.
   */
  helperText?: string;

  /**
   * 에러 상태 여부입니다.
   */
  error?: boolean;

  /**
   * 에러 메시지입니다.
   */
  errorMessage?: string;

  /**
   * 성공 상태 여부입니다.
   */
  success?: boolean;

  /**
   * 성공 메시지입니다.
   */
  successMessage?: string;

  /**
   * input 크기입니다.
   */
  size?: InputSize;

  /**
   * 100% 너비 사용 여부입니다.
   */
  fullWidth?: boolean;

  /**
   * 입력값 삭제 버튼 사용 여부입니다.
   */
  clearable?: boolean;

  /**
   * input id입니다.
   * 전달하지 않으면 내부에서 자동 생성합니다.
   */
  id?: string;

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean;

  /**
   * 읽기 전용 여부입니다.
   */
  readonly?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: "",
  label: "",
  required: false,
  helperText: "",
  error: false,
  errorMessage: "",
  success: false,
  successMessage: "",
  size: "md",
  fullWidth: false,
  clearable: false,
  id: undefined,
  disabled: false,
  readonly: false,
  class: "",
});

const emit = defineEmits<{
  /**
   * v-model 업데이트 이벤트입니다.
   */
  "update:modelValue": [value: InputModelValue];

  /**
   * input 이벤트입니다.
   */
  input: [event: Event];

  /**
   * change 이벤트입니다.
   */
  change: [event: Event];

  /**
   * clear 버튼 클릭 이벤트입니다.
   */
  clear: [];
}>();

/**
 * placeholder, type, name, autocomplete 같은
 * 기본 input attribute를 받을 수 있게 합니다.
 */
const attrs = useAttrs();

/**
 * 외부 id가 없을 때 사용할 자동 id입니다.
 */
const generatedId = useId();

/**
 * 실제 input id입니다.
 */
const inputId = computed(() => {
  return props.id ?? generatedId;
});

/**
 * error props가 true이거나 errorMessage가 있으면 에러 상태로 처리합니다.
 */
const hasError = computed(() => {
  return props.error || Boolean(props.errorMessage);
});

/**
 * success props가 true이거나 successMessage가 있으면 성공 상태로 처리합니다.
 */
const hasSuccess = computed(() => {
  return props.success || Boolean(props.successMessage);
});

/**
 * clear 버튼 노출 여부를 판단하기 위해 현재 입력값이 있는지 확인합니다.
 */
const hasValue = computed(() => {
  return (
    props.modelValue !== undefined &&
    props.modelValue !== null &&
    String(props.modelValue).length > 0
  );
});

/**
 * input과 하단 메시지를 aria-describedby로 연결하기 위한 id입니다.
 */
const messageId = computed(() => {
  if (!hasError.value && !hasSuccess.value && !props.helperText) {
    return undefined;
  }

  return `${inputId.value}-message`;
});

/**
 * InputField class 목록입니다.
 */
const inputFieldClassName = computed(() => {
  return [
    "input-field",
    props.fullWidth && "input-field--full",
  ].filter(Boolean);
});

/**
 * 상태와 옵션에 따라 input wrapper에 적용할 class 목록입니다.
 */
const inputClassName = computed(() => {
  return [
    "input",
    `input--${props.size}`,
    props.fullWidth && "input--full",
    hasError.value && "input--error",

    /**
     * 에러가 없을 때만 성공 스타일을 적용합니다.
     */
    !hasError.value && hasSuccess.value && "input--success",

    /**
     * 아이콘 존재 여부에 따라 여백 조절용 클래스를 추가합니다.
     */
    attrs.class,
    props.class,
  ].filter(Boolean);
});

/**
 * 실제 input으로 전달할 attrs입니다.
 * class/style은 wrapper에서 처리하기 위해 제외합니다.
 */
const inputAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    ...restAttrs
  } = attrs;

  return restAttrs;
});

/**
 * input 값 변경 이벤트입니다.
 */
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const nextValue = target.value;

  emit("update:modelValue", nextValue);
  emit("input", event);
};

/**
 * change 이벤트입니다.
 */
const handleChange = (event: Event) => {
  emit("change", event);
};

/**
 * clear 버튼 클릭 시 입력값을 빈 문자열로 초기화합니다.
 */
const handleClear = () => {
  if (props.disabled || props.readonly) return;

  emit("update:modelValue", "");
  emit("clear");
};
</script>

<template>
  <div :class="inputFieldClassName">
    <!-- label이 있을 때만 렌더링 -->
    <label
      v-if="label"
      class="input-field__label"
      :for="inputId"
    >
      {{ label }}

      <!-- 필수 입력 표시 -->
      <span
        v-if="required"
        class="input-field__required"
        aria-hidden="true"
      >
        *
      </span>
    </label>

    <div :class="inputClassName">
      <!-- 왼쪽 아이콘 영역 -->
      <span
        v-if="$slots.leftIcon"
        class="input__icon input__icon--left"
        aria-hidden="true"
      >
        <slot name="leftIcon" />
      </span>

      <!-- 실제 input 요소 -->
      <input
        v-bind="inputAttrs"
        :id="inputId"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-invalid="hasError || undefined"
        :aria-describedby="messageId"
        @input="handleInput"
        @change="handleChange"
      />

      <!-- clearable이 true이고 입력값이 있을 때만 삭제 버튼 표시 -->
      <button
        v-if="clearable && hasValue"
        type="button"
        class="input__clear"
        aria-label="입력값 삭제"
        :disabled="disabled || readonly"
        @click="handleClear"
      >
        ×
      </button>

      <!-- 오른쪽 아이콘 영역 -->
      <span
        v-if="$slots.rightIcon"
        class="input__icon input__icon--right"
        aria-hidden="true"
      >
        <slot name="rightIcon" />
      </span>
    </div>

    <!-- 에러 메시지는 성공/도움말보다 우선 노출 -->
    <p
      v-if="hasError && errorMessage"
      :id="messageId"
      class="input-field__message input-field__message--error"
    >
      {{ errorMessage }}
    </p>

    <!-- 에러가 없고 성공 상태일 때 성공 메시지 노출 -->
    <p
      v-else-if="!hasError && hasSuccess && successMessage"
      :id="messageId"
      class="input-field__message input-field__message--success"
    >
      {{ successMessage }}
    </p>

    <!-- 에러/성공 메시지가 없을 때 기본 안내 문구 노출 -->
    <p
      v-else-if="!hasError && !hasSuccess && helperText"
      :id="messageId"
      class="input-field__message input-field__message--helper"
    >
      {{ helperText }}
    </p>
  </div>
</template>