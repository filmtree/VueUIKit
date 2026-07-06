<script setup lang="ts">
import { computed, ref } from "vue";
import "./Switch.css";

/**
 * Switch props 타입입니다.
 */
type SwitchProps = {
  /**
   * v-model로 전달되는 on/off 상태입니다.
   */
  modelValue?: boolean;

  /**
   * 초기 체크 상태입니다.
   */
  defaultChecked?: boolean;

  /**
   * switch id입니다.
   */
  id?: string;

  /**
   * switch name입니다.
   */
  name?: string;

  /**
   * switch value입니다.
   */
  value?: string;

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  id: undefined,
  name: undefined,
  value: undefined,
  disabled: false,
  class: "",
});

const emit = defineEmits<{
  /**
   * v-model 업데이트 이벤트입니다.
   */
  "update:modelValue": [value: boolean];

  /**
   * switch 변경 이벤트입니다.
   */
  change: [value: boolean, event: Event];
}>();

/**
 * 내부 checked 상태입니다.
 */
const innerChecked = ref(props.defaultChecked);

/**
 * 제어 컴포넌트 여부입니다.
 */
const isControlled = computed(() => {
  return props.modelValue !== undefined;
});

/**
 * 실제 checked 상태입니다.
 */
const checked = computed(() => {
  return isControlled.value ? props.modelValue : innerChecked.value;
});

/**
 * Switch class 목록입니다.
 */
const switchClassName = computed(() => {
  return [
    "switch",
    props.disabled && "switch--disabled",
    props.class,
  ].filter(Boolean);
});

/**
 * switch 변경 이벤트입니다.
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
  <label :class="switchClassName">
    <input
      :id="id"
      :name="name"
      :value="value"
      type="checkbox"
      role="switch"
      :checked="checked"
      :disabled="disabled"
      @change="handleChange"
    />

    <span class="switch__track">
      <span class="switch__thumb" />
    </span>

    <span
      v-if="$slots.default"
      class="switch__label"
    >
      <slot />
    </span>
  </label>
</template>