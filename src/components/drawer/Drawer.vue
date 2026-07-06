<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  useId,
  watch,
} from "vue";

import "./Drawer.css";

/**
 * Drawer가 열리는 위치 타입입니다.
 *
 * left   : 왼쪽에서 열림
 * right  : 오른쪽에서 열림
 * top    : 위쪽에서 열림
 * bottom : 아래쪽에서 열림
 */
export type DrawerPlacement =
  | "left"
  | "right"
  | "top"
  | "bottom";

/**
 * Drawer 크기 타입입니다.
 */
export type DrawerSize =
  | "sm"
  | "md"
  | "lg"
  | "full";

/**
 * Drawer props 타입입니다.
 */
type DrawerProps = {
  /**
   * Drawer 열림 여부입니다.
   * v-model:open으로도 사용할 수 있습니다.
   */
  open: boolean;

  /**
   * Drawer 제목입니다.
   *
   * 단순 문자열 제목에 사용합니다.
   * 복잡한 제목 UI가 필요하면 title slot을 사용합니다.
   */
  title?: string;

  /**
   * Drawer가 열리는 위치입니다.
   */
  placement?: DrawerPlacement;

  /**
   * Drawer 크기입니다.
   */
  size?: DrawerSize;

  /**
   * dim 클릭 시 닫을지 여부입니다.
   */
  closeOnDim?: boolean;

  /**
   * ESC 키로 닫을지 여부입니다.
   */
  closeOnEsc?: boolean;

  /**
   * 닫기 버튼 노출 여부입니다.
   */
  showCloseButton?: boolean;

  /**
   * body 스크롤 잠금 여부입니다.
   */
  lockScroll?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<DrawerProps>(), {
  title: "",
  placement: "right",
  size: "md",
  closeOnDim: true,
  closeOnEsc: true,
  showCloseButton: true,
  lockScroll: true,
  class: "",
});

const emit = defineEmits<{
  /**
   * v-model:open 업데이트 이벤트입니다.
   */
  "update:open": [value: boolean];

  /**
   * 닫기 요청 이벤트입니다.
   */
  close: [];
}>();

/**
 * 접근성 연결용 id입니다.
 */
const titleId = useId();

/**
 * 실제 DOM에 렌더링할지 여부입니다.
 *
 * open이 false가 되어도 바로 DOM을 제거하지 않고,
 * 닫힘 애니메이션이 끝난 뒤 제거하기 위해 별도 상태로 관리합니다.
 */
const mounted = ref(props.open);

/**
 * 애니메이션 상태입니다.
 *
 * true이면 열림 스타일,
 * false이면 닫힘 스타일이 적용됩니다.
 */
const visible = ref(false);

/**
 * Drawer 패널 DOM입니다.
 * Drawer가 열렸을 때 포커스를 이동하기 위해 사용합니다.
 */
const drawerRef = ref<HTMLDivElement | null>(null);

/**
 * body scroll lock을 원복하기 위해 기존 overflow 값을 저장합니다.
 */
let originalBodyOverflow = "";

/**
 * body 스크롤을 잠급니다.
 */
const lockBodyScroll = () => {
  if (!props.lockScroll) return;

  originalBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
};

/**
 * body 스크롤 잠금을 해제합니다.
 */
const unlockBodyScroll = () => {
  if (!props.lockScroll) return;

  document.body.style.overflow = originalBodyOverflow;
};

/**
 * Drawer 닫기 요청 함수입니다.
 */
const requestClose = () => {
  emit("update:open", false);
  emit("close");
};

/**
 * ESC 키로 Drawer를 닫습니다.
 */
const handleKeyDown = (event: KeyboardEvent) => {
  if (!props.closeOnEsc) return;
  if (event.key !== "Escape") return;

  requestClose();
};

/**
 * ESC 이벤트를 등록합니다.
 */
const addEscEvent = () => {
  window.addEventListener("keydown", handleKeyDown);
};

/**
 * ESC 이벤트를 제거합니다.
 */
const removeEscEvent = () => {
  window.removeEventListener("keydown", handleKeyDown);
};

/**
 * open 값이 변경될 때 열림/닫힘 상태를 처리합니다.
 */
watch(
  () => props.open,
  async (open) => {
    if (open) {
      /**
       * 먼저 DOM에 마운트합니다.
       */
      mounted.value = true;

      /**
       * DOM 렌더링이 끝난 뒤 다음 프레임에서 visible을 true로 바꿔야
       * transition이 자연스럽게 실행됩니다.
       */
      await nextTick();

      requestAnimationFrame(() => {
        visible.value = true;
        drawerRef.value?.focus();
      });

      lockBodyScroll();
      addEscEvent();

      return;
    }

    /**
     * 닫힘 애니메이션을 시작합니다.
     */
    visible.value = false;

    unlockBodyScroll();
    removeEscEvent();
  },
  {
    immediate: true,
  }
);

/**
 * 닫힘 애니메이션이 끝나면 DOM에서 제거합니다.
 */
const handleTransitionEnd = (event: TransitionEvent) => {
  /**
   * 패널 자신의 transform transition이 끝났을 때만 mounted를 false로 변경합니다.
   * 자식 요소의 transitionend 이벤트가 올라오는 상황을 방지합니다.
   */
  if (event.target !== event.currentTarget) return;

  if (!visible.value) {
    mounted.value = false;
  }
};

/**
 * dim 클릭 시 닫기 처리입니다.
 */
const handleDimClick = () => {
  if (!props.closeOnDim) return;

  requestClose();
};

/**
 * Drawer 내부 클릭이 dim 클릭으로 전달되지 않게 막습니다.
 */
const handlePanelClick = (event: MouseEvent) => {
  event.stopPropagation();
};

/**
 * 컴포넌트가 제거될 때 이벤트와 body 스타일을 정리합니다.
 */
onBeforeUnmount(() => {
  unlockBodyScroll();
  removeEscEvent();
});

/**
 * Drawer에 적용할 최종 class 목록입니다.
 */
const drawerClassName = computed(() => {
  return [
    "drawer",
    visible.value ? "drawer--open" : "drawer--close",
    `drawer--${props.placement}`,
    `drawer--${props.size}`,
    props.class,
  ].filter(Boolean);
});

/**
 * title props 또는 title slot이 있는지 확인합니다.
 */
const hasTitle = computed(() => {
  return Boolean(props.title);
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="mounted"
      :class="drawerClassName"
      role="presentation"
      @click="handleDimClick"
    >
      <div class="drawer__dim" />

      <div
        ref="drawerRef"
        class="drawer__panel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="hasTitle || $slots.title ? titleId : undefined"
        tabindex="-1"
        @click="handlePanelClick"
        @transitionend="handleTransitionEnd"
      >
        <!-- 헤더 영역 -->
        <div
          v-if="hasTitle || $slots.title || showCloseButton"
          class="drawer__header"
        >
          <h2
            v-if="hasTitle || $slots.title"
            :id="titleId"
            class="drawer__title"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </h2>

          <button
            v-if="showCloseButton"
            type="button"
            class="drawer__close"
            aria-label="Drawer 닫기"
            @click="requestClose"
          >
            ×
          </button>
        </div>

        <!-- 본문 영역 -->
        <div class="drawer__body">
          <slot />
        </div>

        <!-- 하단 고정 영역 -->
        <div
          v-if="$slots.footer"
          class="drawer__footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>