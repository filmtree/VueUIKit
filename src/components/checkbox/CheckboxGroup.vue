<script setup lang="ts">
import { computed } from "vue";
import Checkbox from "./Checkbox.vue";
import "./CheckboxGroup.css";

/**
 * CheckboxGroup option 타입입니다.
 */
export type CheckboxOption = {
  /**
   * 화면에 표시할 텍스트입니다.
   */
  label: string;

  /**
   * 선택 값입니다.
   */
  value: string;

  /**
   * 개별 항목 비활성화 여부입니다.
   */
  disabled?: boolean;
};

/**
 * CheckboxGroup props 타입입니다.
 */
type CheckboxGroupProps = {
  /**
   * v-model로 전달되는 선택된 값 목록입니다.
   */
  modelValue: string[];

  /**
   * 체크박스 옵션 목록입니다.
   */
  options: CheckboxOption[];

  /**
   * 전체 선택 라벨입니다.
   */
  allLabel?: string;

  /**
   * 전체 그룹 비활성화 여부입니다.
   */
  disabled?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  allLabel: "전체 선택",
  disabled: false,
  class: "",
});

const emit = defineEmits<{
  /**
   * v-model 업데이트 이벤트입니다.
   */
  "update:modelValue": [value: string[]];

  /**
   * 선택 값 변경 이벤트입니다.
   */
  change: [value: string[]];
}>();

/**
 * 선택 가능한 항목만 추출합니다.
 */
const enabledOptions = computed(() => {
  return props.options.filter((option) => !option.disabled);
});

/**
 * 선택 가능한 value 목록입니다.
 */
const enabledValues = computed(() => {
  return enabledOptions.value.map((option) => option.value);
});

/**
 * 전체 선택 여부입니다.
 */
const isAllChecked = computed(() => {
  return (
    enabledValues.value.length > 0 &&
    enabledValues.value.every((optionValue) =>
      props.modelValue.includes(optionValue)
    )
  );
});

/**
 * 일부만 선택된 상태입니다.
 */
const isIndeterminate = computed(() => {
  const selectedEnabledValues = props.modelValue.filter((value) =>
    enabledValues.value.includes(value)
  );

  return selectedEnabledValues.length > 0 && !isAllChecked.value;
});

/**
 * CheckboxGroup class 목록입니다.
 */
const groupClassName = computed(() => {
  return ["checkbox-group", props.class].filter(Boolean);
});

/**
 * 다음 값을 부모로 전달합니다.
 */
const updateValue = (nextValue: string[]) => {
  emit("update:modelValue", nextValue);
  emit("change", nextValue);
};

/**
 * 전체 선택 / 전체 해제 처리입니다.
 */
const handleAllChange = () => {
  if (isAllChecked.value) {
    updateValue([]);
    return;
  }

  updateValue(enabledValues.value);
};

/**
 * 개별 체크박스 변경 처리입니다.
 */
const handleItemChange = (checked: boolean, optionValue: string) => {
  if (checked) {
    updateValue([...props.modelValue, optionValue]);
    return;
  }

  updateValue(props.modelValue.filter((value) => value !== optionValue));
};
</script>

<template>
  <div :class="groupClassName">
    <Checkbox
      :model-value="isAllChecked"
      :indeterminate="isIndeterminate"
      :disabled="disabled || enabledValues.length === 0"
      @change="handleAllChange"
    >
      {{ allLabel }}
    </Checkbox>

    <div class="checkbox-group__list">
      <Checkbox
        v-for="option in options"
        :key="option.value"
        :model-value="modelValue.includes(option.value)"
        :disabled="disabled || option.disabled"
        @change="(checked) => handleItemChange(checked, option.value)"
      >
        {{ option.label }}
      </Checkbox>
    </div>
  </div>
</template>