<script setup lang="ts">
import { computed } from "vue";
import "./Badge.css";

/**
 * Badge의 시각적 상태 타입입니다.
 *
 * default : 기본
 * primary : 주요 강조
 * success : 성공, 완료
 * warning : 경고, 대기
 * danger  : 오류, 실패, 삭제
 * info    : 정보, 진행
 * gray    : 보조 정보
 */
export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "gray";

/**
 * Badge 크기 타입입니다.
 */
export type BadgeSize = "xs" | "sm" | "md" | "lg";

/**
 * Badge 모양 타입입니다.
 *
 * rounded : 일반적인 둥근 사각형
 * pill    : 알약 형태
 * square  : 덜 둥근 사각형
 */
export type BadgeShape = "rounded" | "pill" | "square";

/**
 * Badge 컴포넌트 props 타입입니다.
 */
type BadgeProps = {
  /**
   * Badge 스타일 종류입니다.
   */
  variant?: BadgeVariant;

  /**
   * Badge 크기입니다.
   */
  size?: BadgeSize;

  /**
   * Badge 모양입니다.
   */
  shape?: BadgeShape;

  /**
   * 왼쪽 점 표시 여부입니다.
   * 온라인 상태, 읽지 않음 상태 등에 자주 사용합니다.
   */
  dot?: boolean;

  /**
   * 삭제 가능한 Badge인지 여부입니다.
   */
  removable?: boolean;

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean;

  /**
   * 클릭 가능한 Badge인지 여부입니다.
   * Vue에서는 부모에서 @click을 넘겼는지 직접 감지하기보다 명시적으로 처리하는 편이 안정적입니다.
   */
  clickable?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: "default",
  size: "md",
  shape: "rounded",
  dot: false,
  removable: false,
  disabled: false,
  clickable: false,
  class: "",
});

const emit = defineEmits<{
  /**
   * Badge 클릭 시 실행되는 이벤트입니다.
   */
  click: [event: MouseEvent];

  /**
   * 삭제 버튼 클릭 시 실행되는 이벤트입니다.
   */
  remove: [event: MouseEvent];
}>();

/**
 * Badge의 class를 조건별로 조합합니다.
 */
const badgeClassName = computed(() => {
  return [
    "badge",
    `badge--${props.variant}`,
    `badge--${props.size}`,
    `badge--${props.shape}`,
    props.dot && "badge--dot",
    props.removable && "badge--removable",
    props.disabled && "badge--disabled",
    props.clickable && "badge--clickable",
    props.class,
  ].filter(Boolean);
});

/**
 * Badge 클릭 이벤트입니다.
 * disabled 상태에서는 클릭 이벤트를 실행하지 않습니다.
 */
const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit("click", event);
};

/**
 * 삭제 버튼 클릭 이벤트입니다.
 * Badge 자체 click 이벤트가 같이 실행되지 않도록 stopPropagation을 사용합니다.
 */
const handleRemove = (event: MouseEvent) => {
  event.stopPropagation();

  if (props.disabled) return;

  emit("remove", event);
};
</script>

<template>
  <span
    :class="badgeClassName"
    :aria-disabled="disabled || undefined"
    @click="handleClick"
  >
    <!-- 왼쪽 점 표시 -->
    <span
      v-if="dot"
      class="badge__dot"
      aria-hidden="true"
    />

    <!-- 왼쪽 아이콘 또는 요소 -->
    <span
      v-if="$slots.prefix"
      class="badge__prefix"
      aria-hidden="true"
    >
      <slot name="prefix" />
    </span>

    <!-- Badge 텍스트 -->
    <span
      v-if="$slots.default"
      class="badge__text"
    >
      <slot />
    </span>

    <!-- 오른쪽 아이콘 또는 요소 -->
    <span
      v-if="$slots.suffix"
      class="badge__suffix"
      aria-hidden="true"
    >
      <slot name="suffix" />
    </span>

    <!-- 삭제 버튼 -->
    <button
      v-if="removable"
      type="button"
      class="badge__remove"
      aria-label="배지 삭제"
      :disabled="disabled"
      @click="handleRemove"
    >
      ×
    </button>
  </span>
</template>