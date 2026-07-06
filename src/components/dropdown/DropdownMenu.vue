<script setup lang="ts">
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  ref,
  watch,
} from "vue";

import {
  DropdownContextKey,
  type DropdownPlacement,
} from "./dropdownContext";

import "./Dropdown.css";

type DropdownMenuProps = {
  /**
   * 기본 메뉴 위치입니다.
   */
  placement?: DropdownPlacement;

  /**
   * 화면 끝에 닿으면 반대 방향으로 자동 변경할지 여부입니다.
   */
  autoFlip?: boolean;

  /**
   * 화면 가장자리와 메뉴 사이 최소 여백입니다.
   */
  collisionPadding?: number;

  /**
   * 닫힌 메뉴를 DOM에서 제거할지 여부입니다.
   */
  unmountOnExit?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<DropdownMenuProps>(), {
  placement: "bottom-left",
  autoFlip: true,
  collisionPadding: 8,
  unmountOnExit: true,
  class: "",
});

const dropdown = inject(DropdownContextKey);

if (!dropdown) {
  throw new Error(
    "DropdownMenu는 <Dropdown> 내부에서만 사용할 수 있습니다."
  );
}

/**
 * 메뉴 DOM입니다.
 * 메뉴 크기 측정에 사용합니다.
 */
const menuRef = ref<HTMLElement | null>(null);

/**
 * 실제 적용될 placement입니다.
 *
 * autoFlip이 켜져 있으면 화면 공간에 따라 값이 바뀝니다.
 */
const resolvedPlacement = ref<DropdownPlacement>(props.placement);

/**
 * 메뉴를 렌더링할지 여부입니다.
 */
const shouldRender = computed(() => {
  if (dropdown.open.value) return true;
  return !props.unmountOnExit;
});

/**
 * placement를 세로 방향과 가로 방향으로 분리합니다.
 */
const parsePlacement = (placement: DropdownPlacement) => {
  const [vertical, horizontal] = placement.split("-") as [
    "top" | "bottom",
    "left" | "right",
  ];

  return {
    vertical,
    horizontal,
  };
};

/**
 * 세로 방향을 반대로 바꿉니다.
 */
const flipVertical = (vertical: "top" | "bottom") => {
  return vertical === "bottom" ? "top" : "bottom";
};

/**
 * 가로 방향을 반대로 바꿉니다.
 */
const flipHorizontal = (horizontal: "left" | "right") => {
  return horizontal === "left" ? "right" : "left";
};

/**
 * 메뉴 위치가 화면 밖으로 벗어나는지 계산하고,
 * 필요하면 반대 방향으로 변경합니다.
 */
const updatePlacement = async () => {
  if (!dropdown.open.value) return;

  /**
   * autoFlip을 끄면 사용자가 지정한 placement를 그대로 사용합니다.
   */
  if (!props.autoFlip) {
    resolvedPlacement.value = props.placement;
    return;
  }

  await nextTick();

  const triggerElement = dropdown.triggerRef.value;
  const menuElement = menuRef.value;

  if (!triggerElement || !menuElement) {
    resolvedPlacement.value = props.placement;
    return;
  }

  const triggerRect = triggerElement.getBoundingClientRect();
  const menuRect = menuElement.getBoundingClientRect();

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const padding = props.collisionPadding;

  let { vertical, horizontal } = parsePlacement(props.placement);

  const menuWidth = menuRect.width;
  const menuHeight = menuRect.height;

  const spaceTop = triggerRect.top - padding;
  const spaceBottom = viewportHeight - triggerRect.bottom - padding;
  const spaceLeft = triggerRect.right - padding;
  const spaceRight = viewportWidth - triggerRect.left - padding;

  /**
   * 아래로 열기로 했는데 아래 공간이 부족하고,
   * 위쪽 공간이 더 충분하면 위로 엽니다.
   */
  if (
    vertical === "bottom" &&
    spaceBottom < menuHeight &&
    spaceTop > spaceBottom
  ) {
    vertical = flipVertical(vertical);
  }

  /**
   * 위로 열기로 했는데 위 공간이 부족하고,
   * 아래쪽 공간이 더 충분하면 아래로 엽니다.
   */
  if (
    vertical === "top" &&
    spaceTop < menuHeight &&
    spaceBottom > spaceTop
  ) {
    vertical = flipVertical(vertical);
  }

  /**
   * left 정렬은 메뉴의 왼쪽이 trigger의 왼쪽에 맞습니다.
   * 이때 오른쪽 공간이 부족하면 right 정렬로 바꿉니다.
   */
  if (
    horizontal === "left" &&
    viewportWidth - triggerRect.left - padding < menuWidth &&
    spaceLeft >= menuWidth
  ) {
    horizontal = flipHorizontal(horizontal);
  }

  /**
   * right 정렬은 메뉴의 오른쪽이 trigger의 오른쪽에 맞습니다.
   * 이때 왼쪽 공간이 부족하면 left 정렬로 바꿉니다.
   */
  if (
    horizontal === "right" &&
    triggerRect.right - padding < menuWidth &&
    spaceRight >= menuWidth
  ) {
    horizontal = flipHorizontal(horizontal);
  }

  resolvedPlacement.value = `${vertical}-${horizontal}` as DropdownPlacement;
};

/**
 * 메뉴가 열릴 때 placement를 계산합니다.
 */
watch(
  () => dropdown.open.value,
  async (open) => {
    if (!open) return;

    resolvedPlacement.value = props.placement;

    await updatePlacement();
  }
);

/**
 * placement prop이 바뀌면 다시 계산합니다.
 */
watch(
  () => props.placement,
  async () => {
    resolvedPlacement.value = props.placement;

    await updatePlacement();
  }
);

/**
 * 브라우저 크기가 바뀌면 다시 계산합니다.
 */
const handleResize = () => {
  updatePlacement();
};

/**
 * 스크롤로 위치가 바뀌는 경우도 다시 계산합니다.
 */
const handleScroll = () => {
  updatePlacement();
};

window.addEventListener("resize", handleResize);
window.addEventListener("scroll", handleScroll, true);

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleScroll, true);
});

/**
 * Menu class 목록입니다.
 */
const menuClassName = computed(() => {
  return [
    "dropdown__menu",
    `dropdown__menu--${resolvedPlacement.value}`,
    dropdown.open.value && "dropdown__menu--open",
    props.class,
  ].filter(Boolean);
});
</script>

<template>
  <div
    v-if="shouldRender"
    :id="dropdown.menuId"
    ref="menuRef"
    :class="menuClassName"
    role="menu"
    :aria-labelledby="dropdown.triggerId"
    :hidden="!dropdown.open.value"
  >
    <slot />
  </div>
</template>