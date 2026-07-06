<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  provide,
  ref,
  toRef,
  useId,
} from "vue";

import {
  DropdownContextKey,
  type DropdownContextValue,
} from "./dropdownContext";

import "./Dropdown.css";

type DropdownProps = {
  defaultOpen?: boolean;
  open?: boolean;
  closeOnSelect?: boolean;
  class?: string;
};

const props = withDefaults(defineProps<DropdownProps>(), {
  defaultOpen: false,
  open: undefined,
  closeOnSelect: true,
  class: "",
});

const emit = defineEmits<{
  "update:open": [value: boolean];
  change: [value: boolean];
}>();

/**
 * Dropdown 전체 영역입니다.
 * 바깥 클릭 감지에 사용합니다.
 */
const rootRef = ref<HTMLElement | null>(null);

/**
 * Trigger 버튼 DOM입니다.
 * 메뉴 위치 계산에 사용합니다.
 */
const triggerRef = ref<HTMLButtonElement | null>(null);

/**
 * 내부 열림 상태입니다.
 */
const innerOpen = ref(props.defaultOpen);

/**
 * 제어 컴포넌트 여부입니다.
 */
const isControlled = computed(() => {
  return props.open !== undefined;
});

/**
 * 실제 열림 상태입니다.
 */
const actualOpen = computed({
  get() {
    return isControlled.value ? Boolean(props.open) : innerOpen.value;
  },
  set(value: boolean) {
    if (!isControlled.value) {
      innerOpen.value = value;
    }

    emit("update:open", value);
    emit("change", value);
  },
});

/**
 * 접근성 연결용 id입니다.
 */
const id = useId();
const triggerId = `${id}-dropdown-trigger`;
const menuId = `${id}-dropdown-menu`;

/**
 * Dropdown 열림 상태를 변경합니다.
 */
const setOpen = (open: boolean) => {
  actualOpen.value = open;
};

/**
 * Dropdown 열림 상태를 토글합니다.
 */
const toggleOpen = () => {
  setOpen(!actualOpen.value);
};

/**
 * Dropdown 바깥 영역을 클릭하면 메뉴를 닫습니다.
 */
const handlePointerDown = (event: PointerEvent) => {
  const target = event.target as Node;

  if (!rootRef.value) return;

  if (!rootRef.value.contains(target)) {
    setOpen(false);
  }
};

/**
 * ESC 키를 누르면 메뉴를 닫습니다.
 */
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key !== "Escape") return;

  setOpen(false);
};

document.addEventListener("pointerdown", handlePointerDown);
document.addEventListener("keydown", handleKeyDown);

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handlePointerDown);
  document.removeEventListener("keydown", handleKeyDown);
});

/**
 * 하위 컴포넌트에 Dropdown 상태를 제공합니다.
 */
provide<DropdownContextValue>(DropdownContextKey, {
  open: actualOpen,
  setOpen,
  toggleOpen,
  menuId,
  triggerId,
  triggerRef,
  closeOnSelect: toRef(props, "closeOnSelect"),
});

/**
 * Dropdown root class 목록입니다.
 */
const dropdownClassName = computed(() => {
  return ["dropdown", props.class].filter(Boolean);
});
</script>

<template>
  <div
    ref="rootRef"
    :class="dropdownClassName"
  >
    <slot />
  </div>
</template>