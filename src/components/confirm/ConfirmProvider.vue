<script setup lang="ts">
import { provide, ref } from "vue";
import ConfirmModal from "./ConfirmModal.vue";
import {
  ConfirmContextKey,
  type ConfirmOptions,
  type ConfirmContextValue,
} from "./useConfirm";

/**
 * 내부적으로 관리할 Confirm 상태 타입입니다.
 */
type ConfirmState = ConfirmOptions & {
  /**
   * 확인 / 취소 결과를 외부 Promise로 전달하기 위한 함수입니다.
   */
  resolve: (value: boolean) => void;
};

/**
 * 현재 열려 있는 Confirm 정보를 저장합니다.
 * null이면 Confirm이 닫힌 상태입니다.
 */
const confirmState = ref<ConfirmState | null>(null);

/**
 * confirm 함수입니다.
 *
 * 이 함수를 호출하면 Confirm 모달이 열리고,
 * 사용자가 확인 또는 취소를 누를 때까지 Promise가 대기합니다.
 */
const confirm = (options: ConfirmOptions) => {
  return new Promise<boolean>((resolve) => {
    confirmState.value = {
      ...options,
      resolve,
    };
  });
};

/**
 * 확인 버튼을 클릭했을 때 실행됩니다.
 */
const handleConfirm = () => {
  if (!confirmState.value) return;

  /**
   * Promise 결과로 true를 반환합니다.
   */
  confirmState.value.resolve(true);

  /**
   * Confirm 모달을 닫습니다.
   */
  confirmState.value = null;
};

/**
 * 취소 버튼 또는 dim을 클릭했을 때 실행됩니다.
 */
const handleCancel = () => {
  if (!confirmState.value) return;

  /**
   * Promise 결과로 false를 반환합니다.
   */
  confirmState.value.resolve(false);

  /**
   * Confirm 모달을 닫습니다.
   */
  confirmState.value = null;
};

/**
 * 하위 컴포넌트에서 useConfirm()으로 confirm 함수를 사용할 수 있도록 제공합니다.
 */
provide<ConfirmContextValue>(ConfirmContextKey, {
  confirm,
});
</script>

<template>
  <slot />

  <ConfirmModal
    v-if="confirmState"
    :title="confirmState.title"
    :message="confirmState.message"
    :confirm-text="confirmState.confirmText"
    :cancel-text="confirmState.cancelText"
    :variant="confirmState.variant"
    :close-on-dim="confirmState.closeOnDim"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>