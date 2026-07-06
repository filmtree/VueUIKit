<script setup lang="ts">
import { computed } from "vue";
import "./Loading.css";

/**
 * Loading의 시각적 타입입니다.
 *
 * spinner : 원형 회전 로딩
 * dots    : 점 3개가 움직이는 로딩
 */
export type LoadingVariant =
  | "spinner"
  | "dots";

/**
 * Loading 크기입니다.
 */
export type LoadingSize =
  | "sm"
  | "md"
  | "lg";

/**
 * Loading 배치 방식입니다.
 *
 * inline     : 텍스트나 버튼 옆에 붙는 작은 로딩
 * center     : 부모 영역 중앙 정렬
 * overlay    : 부모 영역 위에 덮는 로딩
 * fullscreen : 전체 화면을 덮는 로딩
 */
export type LoadingMode =
  | "inline"
  | "center"
  | "overlay"
  | "fullscreen";

/**
 * Loading props 타입입니다.
 */
type LoadingProps = {
  /**
   * 로딩 UI 형태입니다.
   */
  variant?: LoadingVariant;

  /**
   * 로딩 크기입니다.
   */
  size?: LoadingSize;

  /**
   * 로딩 배치 방식입니다.
   */
  mode?: LoadingMode;

  /**
   * 로딩 아래 또는 옆에 표시할 텍스트입니다.
   */
  label?: string;

  /**
   * 스크린 리더용 텍스트입니다.
   * label이 시각적으로 없더라도 접근성을 위해 필요합니다.
   */
  ariaLabel?: string;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<LoadingProps>(), {
  variant: "spinner",
  size: "md",
  mode: "center",
  label: "",
  ariaLabel: "로딩 중",
  class: "",
});

/**
 * Loading class 목록입니다.
 */
const loadingClassName = computed(() => {
  return [
    "loading",
    `loading--${props.variant}`,
    `loading--${props.size}`,
    `loading--${props.mode}`,
    props.class,
  ].filter(Boolean);
});

/**
 * 실제 aria-label 값입니다.
 *
 * label이 있으면 label을 우선 사용하고,
 * 없으면 ariaLabel을 사용합니다.
 */
const resolvedAriaLabel = computed(() => {
  return props.label || props.ariaLabel;
});
</script>

<template>
  <div
    :class="loadingClassName"
    role="status"
    :aria-label="resolvedAriaLabel"
  >
    <!-- spinner 타입 -->
    <span
      v-if="variant === 'spinner'"
      class="loading__spinner"
      aria-hidden="true"
    />

    <!-- dots 타입 -->
    <span
      v-if="variant === 'dots'"
      class="loading__dots"
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
    </span>

    <!-- 로딩 텍스트 -->
    <span
      v-if="$slots.default || label"
      class="loading__label"
    >
      <slot>
        {{ label }}
      </slot>
    </span>
  </div>
</template>