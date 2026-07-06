<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  useId,
  watch,
} from "vue";

import "./Modal.css";

/**
 * Modal 크기 타입입니다.
 */
export type ModalSize =
  | "sm"
  | "md"
  | "lg"
  | "xl";

/**
 * Modal props 타입입니다.
 */
type ModalProps = {
  /**
   * 모달 열림 여부입니다.
   * v-model:open으로 사용할 수 있습니다.
   */
  open: boolean;

  /**
   * 모달 제목입니다.
   * 단순 문자열 제목에 사용합니다.
   * 복잡한 제목 UI는 title slot을 사용합니다.
   */
  title?: string;

  /**
   * 모달 크기입니다.
   */
  size?: ModalSize;

  /**
   * 전체 화면 모달 여부입니다.
   */
  fullScreen?: boolean;

  /**
   * 배경 클릭 시 닫기 여부입니다.
   */
  closeOnOverlayClick?: boolean;

  /**
   * ESC 키로 닫기 여부입니다.
   */
  closeOnEsc?: boolean;

  /**
   * 닫기 버튼 표시 여부입니다.
   */
  showCloseButton?: boolean;

  /**
   * body 스크롤 잠금 여부입니다.
   */
  lockScroll?: boolean;

  /**
   * 모달이 렌더링될 DOM 위치입니다.
   * 기본값은 body입니다.
   */
  container?: string;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<ModalProps>(), {
  title: "",
  size: "md",
  fullScreen: false,
  closeOnOverlayClick: true,
  closeOnEsc: true,
  showCloseButton: true,
  lockScroll: true,
  container: "body",
  class: "",
});

const emit = defineEmits<{
  /**
   * v-model:open 업데이트 이벤트입니다.
   */
  "update:open": [value: boolean];

  /**
   * 모달 닫기 이벤트입니다.
   */
  close: [];
}>();

/**
 * 모달 내부 영역 DOM입니다.
 * 모달이 열렸을 때 포커스를 이동하기 위해 사용합니다.
 */
const modalRef = ref<HTMLDivElement | null>(null);

/**
 * 접근성 연결용 title id입니다.
 */
const titleId = useId();

/**
 * body scroll lock을 원복하기 위한 기존 overflow 값입니다.
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
 * 모달 닫기 요청 함수입니다.
 */
const requestClose = () => {
  emit("update:open", false);
  emit("close");
};

/**
 * ESC 키로 모달을 닫습니다.
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
  document.addEventListener("keydown", handleKeyDown);
};

/**
 * ESC 이벤트를 제거합니다.
 */
const removeEscEvent = () => {
  document.removeEventListener("keydown", handleKeyDown);
};

/**
 * open 상태에 따라 부가 기능을 처리합니다.
 */
watch(
  () => props.open,
  async (open) => {
    if (open) {
      lockBodyScroll();
      addEscEvent();

      /**
       * 모달 DOM이 렌더링된 뒤 포커스를 이동합니다.
       */
      await nextTick();

      modalRef.value?.focus();

      return;
    }

    unlockBodyScroll();
    removeEscEvent();
  },
  {
    immediate: true,
  }
);

/**
 * 배경 클릭 시 닫기 처리입니다.
 */
const handleOverlayClick = () => {
  if (!props.closeOnOverlayClick) return;

  requestClose();
};

/**
 * 모달 내부 클릭은 배경 클릭으로 전파되지 않게 막습니다.
 */
const handleModalClick = (event: MouseEvent) => {
  event.stopPropagation();
};

/**
 * 컴포넌트 제거 시 이벤트와 body 스타일을 정리합니다.
 */
onBeforeUnmount(() => {
  unlockBodyScroll();
  removeEscEvent();
});

/**
 * Modal class 목록입니다.
 */
const modalClassName = computed(() => {
  return [
    "modal",
    `modal--${props.size}`,
    props.fullScreen && "modal--full-screen",
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
  <Teleport :to="container">
    <div
      v-if="open"
      class="modal-overlay"
      @click="handleOverlayClick"
    >
      <div
        ref="modalRef"
        :class="modalClassName"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="hasTitle || $slots.title ? titleId : undefined"
        tabindex="-1"
        @click="handleModalClick"
      >
        <!-- 헤더 영역 -->
        <div
          v-if="hasTitle || $slots.title || showCloseButton"
          class="modal__header"
        >
          <h2
            v-if="hasTitle || $slots.title"
            :id="titleId"
            class="modal__title"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </h2>

          <button
            v-if="showCloseButton"
            type="button"
            class="modal__close"
            aria-label="모달 닫기"
            @click="requestClose"
          >
            ×
          </button>
        </div>

        <!-- 본문 영역 -->
        <div class="modal__body">
          <slot />
        </div>

        <!-- 하단 영역 -->
        <div
          v-if="$slots.footer"
          class="modal__footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>