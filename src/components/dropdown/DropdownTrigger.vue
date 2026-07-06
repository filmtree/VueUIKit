<script setup lang="ts">
import { computed, inject } from "vue";
import { DropdownContextKey } from "./dropdownContext";
import "./Dropdown.css";

type DropdownTriggerProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  class?: string;
  ariaLabel?: string;
};

const props = withDefaults(defineProps<DropdownTriggerProps>(), {
  type: "button",
  disabled: false,
  class: "",
  ariaLabel: undefined,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const dropdown = inject(DropdownContextKey);

if (!dropdown) {
  throw new Error(
    "DropdownTrigger는 <Dropdown> 내부에서만 사용할 수 있습니다."
  );
}

const triggerClassName = computed(() => {
  return ["dropdown__trigger", props.class].filter(Boolean);
});

/**
 * Trigger DOM을 context에 저장합니다.
 */
const setTriggerRef = (element: HTMLButtonElement | null) => {
  dropdown.triggerRef.value = element;
};

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  dropdown.toggleOpen();
  emit("click", event);
};
</script>

<template>
  <button
    :id="dropdown.triggerId"
    :ref="setTriggerRef"
    :type="type"
    :class="triggerClassName"
    :disabled="disabled"
    :aria-label="ariaLabel"
    aria-haspopup="menu"
    :aria-expanded="dropdown.open.value"
    :aria-controls="dropdown.menuId"
    @click="handleClick"
  >
    <slot />
  </button>
</template>