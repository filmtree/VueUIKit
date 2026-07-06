<script setup lang="ts">
import { computed } from "vue";
import "./Alert.css";

/**
 * Alert의 시각적 상태 타입입니다.
 *
 * success : 성공
 * error   : 오류
 * warning : 경고
 * info    : 정보
 */
export type AlertVariant = "success" | "error" | "warning" | "info";

/**
 * Alert 컴포넌트 props 타입입니다.
 */
type AlertProps = {
  /**
   * Alert의 스타일 종류입니다.
   */
  variant?: AlertVariant;

  /**
   * Alert 제목입니다.
   *
   * 문자열 제목을 간단히 전달할 때 사용합니다.
   * 복잡한 제목 구조가 필요하면 title slot을 사용하면 됩니다.
   */
  title?: string;

  /**
   * 닫기 버튼 노출 여부입니다.
   */
  closable?: boolean;

  /**
   * 아이콘 노출 여부입니다.
   */
  showIcon?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<AlertProps>(), {
  variant: "info",
  closable: false,
  showIcon: true,
  class: "",
});

const emit = defineEmits<{
  /**
   * 닫기 버튼 클릭 시 실행되는 이벤트입니다.
   */
  close: [];
}>();

/**
 * variant별 기본 아이콘입니다.
 *
 * 실무에서는 이 부분을 SVG 아이콘 컴포넌트나 IconBase 컴포넌트로 교체할 수 있습니다.
 */
const ALERT_ICON: Record<AlertVariant, string> = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

/**
 * Alert에 적용할 최종 클래스 목록입니다.
 */
const alertClassName = computed(() => {
  return [
    "alert",
    `alert--${props.variant}`,
    props.class,
  ].filter(Boolean);
});

/**
 * 닫기 버튼 클릭 이벤트입니다.
 */
const handleClose = () => {
  emit("close");
};
</script>

<template>
  <div
    :class="alertClassName"
    role="alert"
  >
    <!-- 아이콘 영역 -->
    <div
      v-if="showIcon"
      class="alert__icon"
      aria-hidden="true"
    >
      <!-- 커스텀 아이콘이 있으면 slot을 우선 사용하고, 없으면 기본 아이콘을 사용합니다. -->
      <slot name="icon">
        {{ ALERT_ICON[variant] }}
      </slot>
    </div>

    <!-- 텍스트 영역 -->
    <div class="alert__content">
      <!-- title slot이 있으면 slot을 사용하고, 없으면 title props를 사용합니다. -->
      <strong
        v-if="$slots.title || title"
        class="alert__title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </strong>

      <!-- 본문 메시지 영역 -->
      <div
        v-if="$slots.default"
        class="alert__message"
      >
        <slot />
      </div>
    </div>

    <!-- 닫기 버튼 -->
    <button
      v-if="closable"
      type="button"
      class="alert__close"
      aria-label="알림 닫기"
      @click="handleClose"
    >
      ×
    </button>
  </div>
</template>