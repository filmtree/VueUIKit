<script setup lang="ts">
import { computed, inject } from "vue";
import { DropdownContextKey } from "./dropdownContext";
import "./Dropdown.css";

type DropdownItemProps = {
  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<DropdownItemProps>(), {
  disabled: false,
  class: "",
});

const emit = defineEmits<{
  /**
   * 메뉴 아이템 클릭 이벤트입니다.
   */
  click: [event: MouseEvent];

  /**
   * 메뉴 아이템 선택 이벤트입니다.
   */
  select: [];
}>();

const dropdown = inject(DropdownContextKey);

if (!dropdown) {
  throw new Error(
    "DropdownItem은 <Dropdown> 내부에서만 사용할 수 있습니다."
  );
}

/**
 * Item class 목록입니다.
 */
const itemClassName = computed(() => {
  return ["dropdown__item", props.class].filter(Boolean);
});

/**
 * 메뉴 아이템 클릭 이벤트입니다.
 */
const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit("click", event);
  emit("select");

  /**
   * 메뉴 선택 후 자동으로 닫습니다.
   */
  if (dropdown.closeOnSelect.value) {
    dropdown.setOpen(false);
  }
};
</script>

<template>
  <button
    type="button"
    :class="itemClassName"
    role="menuitem"
    :disabled="disabled"
    @click="handleClick"
  >
    <span
      v-if="$slots.icon"
      class="dropdown__item-icon"
      aria-hidden="true"
    >
      <slot name="icon" />
    </span>

    <span class="dropdown__item-label">
      <slot />
    </span>

    <span
      v-if="$slots.suffix"
      class="dropdown__item-suffix"
    >
      <slot name="suffix" />
    </span>
  </button>
</template>