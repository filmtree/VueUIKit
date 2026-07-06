<script setup lang="ts">
import { computed, useId } from "vue";
import "./Confirm.css";

/**
 * Confirm 모달에서 사용할 버튼 타입입니다.
 *
 * default : 일반 확인
 * danger  : 삭제, 탈퇴 같은 위험 액션
 */
export type ConfirmVariant =
  | "default"
  | "danger";

/**
 * ConfirmModal props 타입입니다.
 */
type ConfirmModalProps = {
  /**
   * Confirm 제목입니다.
   */
  title?: string;

  /**
   * Confirm 본문 메시지입니다.
   */
  message?: string;

  /**
   * 확인 버튼 텍스트입니다.
   */
  confirmText?: string;

  /**
   * 취소 버튼 텍스트입니다.
   */
  cancelText?: string;

  /**
   * 확인 버튼의 시각적 스타일입니다.
   */
  variant?: ConfirmVariant;

  /**
   * dim 클릭 시 취소 처리할지 여부입니다.
   */
  closeOnDim?: boolean;
};

const props = withDefaults(defineProps<ConfirmModalProps>(), {
  title: "확인",
  message: "진행하시겠습니까?",
  confirmText: "확인",
  cancelText: "취소",
  variant: "default",
  closeOnDim: true,
});

const emit = defineEmits<{
  /**
   * 확인 버튼 클릭 이벤트입니다.
   */
  confirm: [];

  /**
   * 취소 버튼 또는 dim 클릭 이벤트입니다.
   */
  cancel: [];
}>();

/**
 * 접근성 연결용 id입니다.
 */
const titleId = useId();
const messageId = useId();

/**
 * 확인 버튼 class 목록입니다.
 */
const confirmButtonClassName = computed(() => {
  return [
    "confirm__button",
    "confirm__button--confirm",
    props.variant === "danger" && "confirm__button--danger",
  ].filter(Boolean);
});

/**
 * dim 클릭 이벤트입니다.
 */
const handleDimClick = () => {
  if (!props.closeOnDim) return;

  emit("cancel");
};
</script>

<template>
  <Teleport to="body">
    <div
      class="confirm"
      role="presentation"
    >
      <!-- dim 영역입니다. 사용자가 배경을 클릭하면 취소 처리합니다. -->
      <div
        class="confirm__dim"
        @click="handleDimClick"
      />

      <div
        class="confirm__dialog"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="messageId"
      >
        <div class="confirm__body">
          <h2
            :id="titleId"
            class="confirm__title"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </h2>

          <p
            :id="messageId"
            class="confirm__message"
          >
            <slot name="message">
              {{ message }}
            </slot>
          </p>
        </div>

        <div class="confirm__actions">
          <button
            type="button"
            class="confirm__button confirm__button--cancel"
            @click="$emit('cancel')"
          >
            {{ cancelText }}
          </button>

          <button
            type="button"
            :class="confirmButtonClassName"
            @click="$emit('confirm')"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>