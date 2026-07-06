import { inject } from "vue";
import type { ConfirmVariant } from "./ConfirmModal.vue";

/**
 * confirm 함수 호출 시 받을 옵션 타입입니다.
 */
export type ConfirmOptions = {
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
   * 버튼 스타일입니다.
   */
  variant?: ConfirmVariant;

  /**
   * dim 클릭 시 취소 처리할지 여부입니다.
   */
  closeOnDim?: boolean;
};

/**
 * Confirm Context에서 제공할 값의 타입입니다.
 */
export type ConfirmContextValue = {
  /**
   * Confirm 모달을 열고 사용자의 선택 결과를 Promise<boolean>으로 반환합니다.
   */
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

/**
 * Confirm inject key입니다.
 */
export const ConfirmContextKey = Symbol("ConfirmContext");

/**
 * Confirm 기능을 사용하는 composable입니다.
 */
export function useConfirm() {
  const context = inject<ConfirmContextValue | null>(
    ConfirmContextKey,
    null
  );

  if (!context) {
    throw new Error("useConfirm은 ConfirmProvider 내부에서 사용해야 합니다.");
  }

  return context.confirm;
}