<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  watch,
  type CSSProperties,
  type PropType,
} from "vue";

import "./Popover.css";

/**
 * Popover 위치 타입입니다.
 */
export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "right";

/**
 * Popover 크기 타입입니다.
 */
export type PopoverSize = "sm" | "md" | "lg" | "auto";

const props = defineProps({
  /**
   * v-model로 제어할 open 값입니다.
   *
   * Boolean prop은 값이 없으면 false로 캐스팅될 수 있으므로
   * default를 undefined로 둬서 제어형 / 비제어형을 구분합니다.
   */
  modelValue: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },

  /**
   * 비제어 방식에서 처음 열림 여부입니다.
   */
  defaultOpen: {
    type: Boolean,
    default: false,
  },

  /**
   * 사용자가 직접 지정하는 위치입니다.
   *
   * undefined이면 기본 위치 bottom-start를 사용합니다.
   * 이 경우 화면 벽에 막히면 방향만 반대로 전환합니다.
   *
   * 값이 있으면 사용자가 직접 위치를 지정한 것으로 보고
   * 방향을 자동으로 바꾸지 않습니다.
   */
  placement: {
    type: String as PropType<PopoverPlacement | undefined>,
    default: undefined,
  },

  /**
   * Popover 크기입니다.
   */
  size: {
    type: String as PropType<PopoverSize>,
    default: "md",
  },

  /**
   * 트리거와 Popover 사이 간격입니다.
   */
  offset: {
    type: Number,
    default: 8,
  },

  /**
   * 브라우저 끝과 Popover 사이 최소 여백입니다.
   *
   * 방향 전환 여부를 판단할 때만 사용합니다.
   * top 값을 브라우저 하단에 강제로 고정하는 용도로 사용하지 않습니다.
   */
  viewportPadding: {
    type: Number,
    default: 8,
  },

  /**
   * 바깥 클릭 시 닫을지 여부입니다.
   */
  closeOnOutsideClick: {
    type: Boolean,
    default: true,
  },

  /**
   * ESC 키로 닫을지 여부입니다.
   */
  closeOnEsc: {
    type: Boolean,
    default: true,
  },

  /**
   * Popover 내부 클릭 시 닫을지 여부입니다.
   */
  closeOnContentClick: {
    type: Boolean,
    default: false,
  },

  /**
   * 화살표 표시 여부입니다.
   */
  showArrow: {
    type: Boolean,
    default: true,
  },

  /**
   * 비활성화 여부입니다.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 추가 클래스입니다.
   */
  class: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "open-change": [value: boolean];
}>();

/**
 * Vue 버전 호환을 위해 useId 대신 직접 id를 생성합니다.
 */
const popoverId = `popover-${Math.random().toString(36).slice(2, 10)}`;

/**
 * 기본 위치입니다.
 *
 * 사용자가 placement를 직접 넘기지 않았을 때만 사용합니다.
 */
const defaultPlacement: PopoverPlacement = "bottom-start";

/**
 * 사용자가 placement를 직접 지정했는지 확인합니다.
 *
 * true이면 위치 고정 모드입니다.
 * false이면 자동 방향 전환 모드입니다.
 */
const hasCustomPlacement = computed(() => {
  return props.placement !== undefined;
});

/**
 * 실제 계산에 사용할 기준 위치입니다.
 */
const preferredPlacement = computed<PopoverPlacement>(() => {
  return props.placement ?? defaultPlacement;
});

/**
 * 자동 방향 전환 모드 여부입니다.
 *
 * placement를 직접 지정하지 않은 경우에만 true입니다.
 */
const isAutoPlacementMode = computed(() => {
  return !hasCustomPlacement.value;
});

/**
 * 트리거 wrapper DOM입니다.
 */
const triggerRef = ref<HTMLSpanElement | null>(null);

/**
 * Popover 패널 DOM입니다.
 */
const popoverRef = ref<HTMLDivElement | null>(null);

/**
 * 비제어 방식에서 사용하는 내부 open 상태입니다.
 */
const internalOpen = ref(props.defaultOpen);

/**
 * modelValue가 undefined가 아닐 때만 제어형으로 판단합니다.
 */
const isControlled = computed(() => {
  return props.modelValue !== undefined;
});

/**
 * 실제 화면에서 사용할 open 상태입니다.
 */
const isOpen = computed(() => {
  return isControlled.value ? props.modelValue : internalOpen.value;
});

/**
 * Popover 좌표입니다.
 *
 * position: fixed 기준이므로 getBoundingClientRect 값과 바로 맞습니다.
 */
const position = ref({
  top: 0,
  left: 0,
});

/**
 * 실제 화면에 표시되는 placement입니다.
 *
 * 자동 방향 전환 모드에서는 preferredPlacement와 달라질 수 있습니다.
 * 위치 고정 모드에서는 preferredPlacement를 그대로 유지합니다.
 */
const actualPlacement = ref<PopoverPlacement>(preferredPlacement.value);

/**
 * placement의 반대 방향을 반환합니다.
 */
const getOppositePlacement = (
  placement: PopoverPlacement
): PopoverPlacement => {
  const oppositeMap: Record<PopoverPlacement, PopoverPlacement> = {
    top: "bottom",
    "top-start": "bottom-start",
    "top-end": "bottom-end",

    bottom: "top",
    "bottom-start": "top-start",
    "bottom-end": "top-end",

    left: "right",
    right: "left",
  };

  return oppositeMap[placement];
};

/**
 * open 상태를 변경합니다.
 */
const setOpen = (nextOpen: boolean) => {
  if (props.disabled) return;

  if (!isControlled.value) {
    internalOpen.value = nextOpen;
  }

  emit("update:modelValue", nextOpen);
  emit("open-change", nextOpen);
};

/**
 * Popover를 엽니다.
 */
const openPopover = () => {
  setOpen(true);
};

/**
 * Popover를 닫습니다.
 */
const closePopover = () => {
  setOpen(false);
};

/**
 * Popover를 토글합니다.
 */
const togglePopover = () => {
  setOpen(!isOpen.value);
};

/**
 * 특정 placement 기준으로 top, left 좌표를 계산합니다.
 *
 * 여기서 계산된 top, left는 항상 버튼 기준입니다.
 * 브라우저 하단에 맞추기 위한 강제 보정은 하지 않습니다.
 */
const getPositionByPlacement = ({
  placement,
  triggerRect,
  popoverRect,
}: {
  placement: PopoverPlacement;
  triggerRect: DOMRect;
  popoverRect: DOMRect;
}) => {
  let top = 0;
  let left = 0;

  /**
   * 위쪽 배치입니다.
   */
  if (placement.startsWith("top")) {
    top = triggerRect.top - popoverRect.height - props.offset;
  }

  /**
   * 아래쪽 배치입니다.
   */
  if (placement.startsWith("bottom")) {
    top = triggerRect.bottom + props.offset;
  }

  /**
   * top / bottom 가운데 정렬입니다.
   */
  if (placement === "top" || placement === "bottom") {
    left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
  }

  /**
   * start 정렬입니다.
   */
  if (placement.endsWith("start")) {
    left = triggerRect.left;
  }

  /**
   * end 정렬입니다.
   */
  if (placement.endsWith("end")) {
    left = triggerRect.right - popoverRect.width;
  }

  /**
   * 왼쪽 배치입니다.
   */
  if (placement === "left") {
    top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
    left = triggerRect.left - popoverRect.width - props.offset;
  }

  /**
   * 오른쪽 배치입니다.
   */
  if (placement === "right") {
    top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
    left = triggerRect.right + props.offset;
  }

  return {
    top,
    left,
  };
};

/**
 * 현재 placement가 주 축 방향에서 화면 안에 들어오는지 확인합니다.
 *
 * top / bottom 계열은 세로 방향만 판단합니다.
 * left / right 계열은 가로 방향만 판단합니다.
 *
 * 이렇게 해야 bottom이 막혔을 때 top으로만 바뀌고,
 * top 값을 브라우저 하단에 강제로 붙이는 문제가 생기지 않습니다.
 */
const isMainAxisVisible = ({
  placement,
  top,
  left,
  popoverRect,
}: {
  placement: PopoverPlacement;
  top: number;
  left: number;
  popoverRect: DOMRect;
}) => {
  const right = left + popoverRect.width;
  const bottom = top + popoverRect.height;

  if (placement.startsWith("top")) {
    return top >= props.viewportPadding;
  }

  if (placement.startsWith("bottom")) {
    return bottom <= window.innerHeight - props.viewportPadding;
  }

  if (placement === "left") {
    return left >= props.viewportPadding;
  }

  if (placement === "right") {
    return right <= window.innerWidth - props.viewportPadding;
  }

  return true;
};

/**
 * 보조 축 좌표만 화면 안쪽으로 보정합니다.
 *
 * bottom/top 계열에서는 left만 보정합니다.
 * left/right 계열에서는 top만 보정합니다.
 *
 * 중요:
 * bottom/top 계열에서 top을 보정하지 않습니다.
 * left/right 계열에서 left를 보정하지 않습니다.
 *
 * 그래야 Popover가 브라우저 하단/측면에 달라붙지 않고
 * 버튼 기준 위치를 유지합니다.
 */
const getCrossAxisSafePosition = ({
  placement,
  top,
  left,
  popoverRect,
}: {
  placement: PopoverPlacement;
  top: number;
  left: number;
  popoverRect: DOMRect;
}) => {
  let safeTop = top;
  let safeLeft = left;

  /**
   * top / bottom 계열은 세로 위치가 핵심이므로
   * left만 화면 안쪽으로 살짝 보정합니다.
   */
  if (placement.startsWith("top") || placement.startsWith("bottom")) {
    const maxLeft =
      window.innerWidth - popoverRect.width - props.viewportPadding;

    safeLeft = Math.max(
      props.viewportPadding,
      Math.min(left, maxLeft)
    );
  }

  /**
   * left / right 계열은 가로 위치가 핵심이므로
   * top만 화면 안쪽으로 살짝 보정합니다.
   */
  if (placement === "left" || placement === "right") {
    const maxTop =
      window.innerHeight - popoverRect.height - props.viewportPadding;

    safeTop = Math.max(
      props.viewportPadding,
      Math.min(top, maxTop)
    );
  }

  return {
    top: safeTop,
    left: safeLeft,
  };
};

/**
 * 자동 방향 전환 모드 위치 계산입니다.
 *
 * placement를 직접 지정하지 않은 경우:
 * - 기본은 bottom-start
 * - 아래가 막히면 top-start
 * - 위가 막히면 bottom-start
 * - 좌우도 같은 방식으로 반대 방향
 *
 * 단, Popover의 기준은 항상 버튼입니다.
 * 브라우저 하단에 top 값을 강제로 맞추지 않습니다.
 */
const updateAutoPosition = ({
  triggerRect,
  popoverRect,
}: {
  triggerRect: DOMRect;
  popoverRect: DOMRect;
}) => {
  let nextPlacement = preferredPlacement.value;

  let nextPosition = getPositionByPlacement({
    placement: nextPlacement,
    triggerRect,
    popoverRect,
  });

  const preferredVisible = isMainAxisVisible({
    placement: nextPlacement,
    top: nextPosition.top,
    left: nextPosition.left,
    popoverRect,
  });

  /**
   * 주 축 방향으로 공간이 부족하면 반대 방향을 확인합니다.
   */
  if (!preferredVisible) {
    const oppositePlacement = getOppositePlacement(nextPlacement);

    const oppositePosition = getPositionByPlacement({
      placement: oppositePlacement,
      triggerRect,
      popoverRect,
    });

    const oppositeVisible = isMainAxisVisible({
      placement: oppositePlacement,
      top: oppositePosition.top,
      left: oppositePosition.left,
      popoverRect,
    });

    /**
     * 반대 방향이 가능하면 방향만 바꿉니다.
     */
    if (oppositeVisible) {
      nextPlacement = oppositePlacement;
      nextPosition = oppositePosition;
    }
  }

  /**
   * 보조 축만 보정합니다.
   *
   * 예:
   * bottom-start일 때 left가 화면 밖으로 나가면 left만 보정
   * top/bottom의 top 값은 건드리지 않음
   */
  const safePosition = getCrossAxisSafePosition({
    placement: nextPlacement,
    top: nextPosition.top,
    left: nextPosition.left,
    popoverRect,
  });

  actualPlacement.value = nextPlacement;

  position.value = {
    top: safePosition.top,
    left: safePosition.left,
  };
};

/**
 * 고정 모드 위치 계산입니다.
 *
 * placement를 직접 지정한 경우:
 * - 지정한 placement를 그대로 유지합니다.
 * - 방향 반전하지 않습니다.
 * - 화면 안쪽으로 강제 보정하지 않습니다.
 * - 스크롤로 일부가 감춰져도 버튼 기준 지정 위치를 유지합니다.
 */
const updateFixedPosition = ({
  triggerRect,
  popoverRect,
}: {
  triggerRect: DOMRect;
  popoverRect: DOMRect;
}) => {
  const fixedPlacement = preferredPlacement.value;

  const fixedPosition = getPositionByPlacement({
    placement: fixedPlacement,
    triggerRect,
    popoverRect,
  });

  actualPlacement.value = fixedPlacement;

  position.value = {
    top: fixedPosition.top,
    left: fixedPosition.left,
  };
};

/**
 * Popover 위치를 계산합니다.
 */
const updatePosition = () => {
  const triggerEl = triggerRef.value;
  const popoverEl = popoverRef.value;

  if (!triggerEl || !popoverEl) return;

  const triggerRect = triggerEl.getBoundingClientRect();
  const popoverRect = popoverEl.getBoundingClientRect();

  if (isAutoPlacementMode.value) {
    updateAutoPosition({
      triggerRect,
      popoverRect,
    });

    return;
  }

  updateFixedPosition({
    triggerRect,
    popoverRect,
  });
};

/**
 * 스크롤 / 리사이즈 시 위치를 다시 계산합니다.
 *
 * position: fixed를 사용하기 때문에 스크롤 시
 * trigger의 getBoundingClientRect 값이 바뀝니다.
 * 그래서 계속 버튼 기준으로 위치를 다시 계산해야 합니다.
 */
const handleWindowChange = () => {
  updatePosition();
};

/**
 * 바깥 클릭 시 Popover를 닫습니다.
 */
const handleDocumentPointerDown = (event: PointerEvent) => {
  if (!isOpen.value) return;
  if (!props.closeOnOutsideClick) return;

  const target = event.target as Node;

  if (triggerRef.value?.contains(target)) return;
  if (popoverRef.value?.contains(target)) return;

  closePopover();
};

/**
 * ESC 키로 닫습니다.
 */
const handleWindowKeyDown = (event: KeyboardEvent) => {
  if (!isOpen.value) return;
  if (!props.closeOnEsc) return;
  if (event.key !== "Escape") return;

  closePopover();

  triggerRef.value
    ?.querySelector<HTMLElement>(
      "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )
    ?.focus();
};

/**
 * trigger 클릭 처리입니다.
 */
const handleTriggerClick = () => {
  togglePopover();
};

/**
 * trigger 키보드 처리입니다.
 */
const handleTriggerKeyDown = (event: KeyboardEvent) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    openPopover();
  }
};

/**
 * Popover 내부 클릭 처리입니다.
 */
const handleContentClick = () => {
  if (props.closeOnContentClick) {
    closePopover();
  }
};

/**
 * Popover class 목록입니다.
 */
const popoverClassName = computed(() => {
  return [
    "popover",
    `popover--${props.size}`,
    `popover--${actualPlacement.value}`,
    props.class,
  ]
    .filter(Boolean)
    .join(" ");
});

/**
 * Popover 위치 style입니다.
 */
const popoverStyle = computed<CSSProperties>(() => {
  return {
    top: `${position.value.top}px`,
    left: `${position.value.left}px`,
  };
});

/**
 * open 상태가 바뀔 때 전역 이벤트를 등록 / 해제합니다.
 */
watch(
  isOpen,
  async (open) => {
    if (!open) {
      window.removeEventListener("scroll", handleWindowChange, true);
      window.removeEventListener("resize", handleWindowChange);
      document.removeEventListener("pointerdown", handleDocumentPointerDown);
      window.removeEventListener("keydown", handleWindowKeyDown);

      actualPlacement.value = preferredPlacement.value;

      return;
    }

    /**
     * Teleport로 body에 렌더링된 뒤 크기를 측정해야 합니다.
     */
    await nextTick();

    updatePosition();

    window.addEventListener("scroll", handleWindowChange, true);
    window.addEventListener("resize", handleWindowChange);
    document.addEventListener("pointerdown", handleDocumentPointerDown);
    window.addEventListener("keydown", handleWindowKeyDown);
  },
  {
    immediate: true,
  }
);

/**
 * placement, offset, viewportPadding이 바뀌면 위치를 다시 계산합니다.
 */
watch(
  () => [
    props.placement,
    props.offset,
    props.viewportPadding,
  ],
  async () => {
    actualPlacement.value = preferredPlacement.value;

    if (!isOpen.value) return;

    await nextTick();
    updatePosition();
  }
);

/**
 * 컴포넌트 제거 시 전역 이벤트를 정리합니다.
 */
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleWindowChange, true);
  window.removeEventListener("resize", handleWindowChange);
  document.removeEventListener("pointerdown", handleDocumentPointerDown);
  window.removeEventListener("keydown", handleWindowKeyDown);
});
</script>

<template>
  <span
    ref="triggerRef"
    class="popover-trigger"
    :aria-controls="isOpen ? popoverId : undefined"
    :aria-expanded="isOpen ? 'true' : 'false'"
    @click="handleTriggerClick"
    @keydown="handleTriggerKeyDown"
  >
    <slot name="trigger" />
  </span>

  <Teleport to="body">
    <div
      v-if="isOpen"
      :id="popoverId"
      ref="popoverRef"
      role="dialog"
      :class="popoverClassName"
      :style="popoverStyle"
      @click="handleContentClick"
    >
      <slot />

      <span
        v-if="showArrow"
        class="popover__arrow"
        aria-hidden="true"
      />
    </div>
  </Teleport>
</template>