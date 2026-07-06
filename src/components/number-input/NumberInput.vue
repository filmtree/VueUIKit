<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  useId,
} from "vue";

import "./NumberInput.css";

/**
 * NumberInput 값 타입입니다.
 *
 * 값이 없을 때는 undefined를 사용합니다.
 */
export type NumberInputValue = number | undefined;

/**
 * NumberInput props 타입입니다.
 */
type NumberInputProps = {
  /**
   * v-model로 전달되는 숫자 값입니다.
   */
  modelValue?: NumberInputValue;

  /**
   * 최솟값입니다.
   */
  min?: number;

  /**
   * 최댓값입니다.
   */
  max?: number;

  /**
   * 소수점 자리수입니다.
   *
   * 예:
   * decimalScale={2}
   * 12.3456 → 12.35
   */
  decimalScale?: number;

  /**
   * 음수 허용 여부입니다.
   */
  allowNegative?: boolean;

  /**
   * 천 단위 콤마 사용 여부입니다.
   */
  thousandSeparator?: boolean;

  /**
   * 숫자 앞에 붙는 문자열입니다.
   *
   * 예:
   * prefix="$"
   */
  prefix?: string;

  /**
   * 숫자 뒤에 붙는 문자열입니다.
   *
   * 예:
   * suffix="원"
   */
  suffix?: string;

  /**
   * 라벨 텍스트입니다.
   */
  label?: string;

  /**
   * 도움말 텍스트입니다.
   */
  helperText?: string;

  /**
   * 에러 메시지입니다.
   */
  errorMessage?: string;

  /**
   * placeholder입니다.
   */
  placeholder?: string;

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean;

  /**
   * 읽기 전용 여부입니다.
   */
  readonly?: boolean;

  /**
   * 입력값 삭제 버튼 사용 여부입니다.
   */
  clearable?: boolean;

  /**
   * input id입니다.
   */
  id?: string;

  /**
   * 100% 너비 사용 여부입니다.
   */
  fullWidth?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<NumberInputProps>(), {
  modelValue: undefined,
  min: undefined,
  max: undefined,
  decimalScale: undefined,
  allowNegative: true,
  thousandSeparator: false,
  prefix: "",
  suffix: "",
  label: "",
  helperText: "",
  errorMessage: "",
  placeholder: "",
  disabled: false,
  readonly: false,
  clearable: false,
  id: undefined,
  fullWidth: false,
  class: "",
});

const emit = defineEmits<{
  /**
   * v-model 업데이트 이벤트입니다.
   */
  "update:modelValue": [value: NumberInputValue];

  /**
   * 값 변경 이벤트입니다.
   */
  change: [value: NumberInputValue];

  /**
   * clear 버튼 클릭 이벤트입니다.
   */
  clear: [];
}>();

/**
 * 내부에서 화면에 보여줄 문자열입니다.
 *
 * 실제 modelValue는 number | undefined이고,
 * displayValue는 prefix, suffix, comma가 포함된 문자열입니다.
 */
const displayValue = ref("");

/**
 * input과 label을 연결하기 위한 id입니다.
 */
const generatedId = useId();

const inputId = computed(() => {
  return props.id ?? generatedId;
});

/**
 * 하단 메시지 id입니다.
 */
const messageId = computed(() => {
  if (!props.errorMessage && !props.helperText) {
    return undefined;
  }

  return `${inputId.value}-message`;
});

/**
 * 에러 상태입니다.
 */
const hasError = computed(() => {
  return Boolean(props.errorMessage);
});

/**
 * 값이 있는지 확인합니다.
 */
const hasValue = computed(() => {
  return displayValue.value.length > 0;
});

/**
 * 숫자를 사람이 읽기 좋은 문자열로 변환합니다.
 */
const formatNumber = (number: number) => {
  let formatted = number.toString();

  /**
   * 소수점 자리수가 지정된 경우 고정합니다.
   */
  if (props.decimalScale !== undefined) {
    formatted = number.toFixed(props.decimalScale);
  }

  /**
   * 천 단위 콤마를 적용합니다.
   */
  if (props.thousandSeparator) {
    const parts = formatted.split(".");

    parts[0] = Number(parts[0]).toLocaleString();

    formatted = parts.join(".");
  }

  /**
   * prefix를 붙입니다.
   */
  if (props.prefix) {
    formatted = `${props.prefix}${formatted}`;
  }

  /**
   * suffix를 붙입니다.
   */
  if (props.suffix) {
    formatted = `${formatted}${props.suffix}`;
  }

  return formatted;
};

/**
 * 화면에 표시된 문자열에서 실제 숫자 문자열만 추출합니다.
 */
const parseNumberText = (value: string) => {
  let result = value;

  /**
   * prefix 제거
   */
  if (props.prefix) {
    result = result.replace(props.prefix, "");
  }

  /**
   * suffix 제거
   */
  if (props.suffix) {
    result = result.replace(props.suffix, "");
  }

  /**
   * 천 단위 콤마 제거
   */
  result = result.replace(/,/g, "");

  /**
   * 숫자, 마이너스, 소수점 외 문자 제거
   */
  result = result.replace(/[^\d.-]/g, "");

  /**
   * 음수를 허용하지 않으면 - 제거
   */
  if (!props.allowNegative) {
    result = result.replace(/-/g, "");
  }

  /**
   * 마이너스는 맨 앞에 하나만 허용합니다.
   */
  result = result.replace(/(?!^)-/g, "");

  /**
   * 소수점은 하나만 허용합니다.
   */
  const firstDotIndex = result.indexOf(".");

  if (firstDotIndex !== -1) {
    const beforeDot = result.slice(0, firstDotIndex + 1);
    const afterDot = result.slice(firstDotIndex + 1).replace(/\./g, "");

    result = beforeDot + afterDot;
  }

  return result;
};

/**
 * min, max 범위를 적용합니다.
 */
const clampNumber = (number: number) => {
  let nextNumber = number;

  if (props.min !== undefined) {
    nextNumber = Math.max(props.min, nextNumber);
  }

  if (props.max !== undefined) {
    nextNumber = Math.min(props.max, nextNumber);
  }

  return nextNumber;
};

/**
 * 부모 modelValue가 변경되면 displayValue를 갱신합니다.
 */
watch(
  () => props.modelValue,
  (value) => {
    if (value === undefined || value === null) {
      displayValue.value = "";
      return;
    }

    displayValue.value = formatNumber(value);
  },
  {
    immediate: true,
  }
);

/**
 * props 중 포맷에 영향을 주는 값이 바뀌면 다시 포맷합니다.
 */
watch(
  [
    () => props.decimalScale,
    () => props.thousandSeparator,
    () => props.prefix,
    () => props.suffix,
  ],
  () => {
    if (props.modelValue === undefined || props.modelValue === null) {
      displayValue.value = "";
      return;
    }

    displayValue.value = formatNumber(props.modelValue);
  }
);

/**
 * input 입력 이벤트입니다.
 */
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  const rawValue = parseNumberText(target.value);

  /**
   * 빈 값이면 undefined로 전달합니다.
   */
  if (rawValue === "" || rawValue === "-" || rawValue === ".") {
    displayValue.value = rawValue;
    emit("update:modelValue", undefined);
    emit("change", undefined);
    return;
  }

  let number = Number(rawValue);

  /**
   * 숫자로 변환할 수 없으면 무시합니다.
   */
  if (Number.isNaN(number)) {
    return;
  }

  /**
   * min, max 적용
   */
  number = clampNumber(number);

  /**
   * 소수점 자리수 적용
   */
  if (props.decimalScale !== undefined) {
    number = Number(number.toFixed(props.decimalScale));
  }

  displayValue.value = formatNumber(number);

  emit("update:modelValue", number);
  emit("change", number);
};

/**
 * clear 버튼 클릭 이벤트입니다.
 */
const handleClear = () => {
  if (props.disabled || props.readonly) return;

  displayValue.value = "";

  emit("update:modelValue", undefined);
  emit("change", undefined);
  emit("clear");
};

/**
 * NumberInput field class 목록입니다.
 */
const fieldClassName = computed(() => {
  return [
    "number-input-field",
    props.fullWidth && "number-input-field--full",
    props.class,
  ].filter(Boolean);
});

/**
 * wrapper class 목록입니다.
 */
const wrapperClassName = computed(() => {
  return [
    "number-input-wrapper",
    hasError.value && "number-input-wrapper--error",
    props.disabled && "number-input-wrapper--disabled",
    props.readonly && "number-input-wrapper--readonly",
  ].filter(Boolean);
});
</script>

<template>
  <div :class="fieldClassName">
    <label
      v-if="label"
      class="number-input-label"
      :for="inputId"
    >
      {{ label }}
    </label>

    <div :class="wrapperClassName">
      <input
        :id="inputId"
        type="text"
        inputmode="decimal"
        class="number-input"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :aria-invalid="hasError || undefined"
        :aria-describedby="messageId"
        @input="handleInput"
      />

      <button
        v-if="clearable && hasValue"
        type="button"
        class="number-input-clear"
        aria-label="입력값 삭제"
        :disabled="disabled || readonly"
        @click="handleClear"
      >
        ×
      </button>
    </div>

    <p
      v-if="errorMessage"
      :id="messageId"
      class="number-input-error"
      role="alert"
    >
      {{ errorMessage }}
    </p>

    <p
      v-else-if="helperText"
      :id="messageId"
      class="number-input-helper"
    >
      {{ helperText }}
    </p>
  </div>
</template>