<script setup lang="ts">
import { computed } from "vue";
import "./Button.css";

/**
 * Button 스타일 타입입니다.
 *
 * primary   : 주요 버튼
 * secondary : 보조 버튼
 * outline   : 외곽선 버튼
 * danger    : 삭제, 위험 동작 버튼
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger";

/**
 * Button 크기 타입입니다.
 */
export type ButtonSize =
  | "sm"
  | "md"
  | "lg";

/**
 * Button type 타입입니다.
 *
 * button : 일반 버튼
 * submit : 폼 제출 버튼
 * reset  : 폼 초기화 버튼
 */
export type ButtonType =
  | "button"
  | "submit"
  | "reset";

/**
 * Button props 타입입니다.
 */
type ButtonProps = {
  /**
   * 버튼의 HTML type입니다.
   * 실무에서는 의도치 않은 form submit을 막기 위해 기본값을 button으로 둡니다.
   */
  type?: ButtonType;

  /**
   * 버튼 스타일 종류입니다.
   */
  variant?: ButtonVariant;

  /**
   * 버튼 크기입니다.
   */
  size?: ButtonSize;

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean;

  /**
   * 로딩 상태 여부입니다.
   * loading 상태에서는 클릭을 막고 Loading 문구를 보여줍니다.
   */
  loading?: boolean;

  /**
   * 버튼을 부모 너비만큼 100%로 확장합니다.
   */
  fullWidth?: boolean;

  /**
   * 아이콘만 있는 버튼인지 여부입니다.
   * iconOnly일 때는 반드시 aria-label을 같이 전달하는 것이 좋습니다.
   */
  iconOnly?: boolean;

  /**
   * iconOnly 버튼에서 접근성을 위한 라벨입니다.
   */
  ariaLabel?: string;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "button",
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  fullWidth: false,
  iconOnly: false,
  ariaLabel: undefined,
  class: "",
});

const emit = defineEmits<{
  /**
   * 버튼 클릭 이벤트입니다.
   */
  click: [event: MouseEvent];
}>();

/**
 * 실제 disabled 상태입니다.
 * loading 중에도 버튼 클릭을 막습니다.
 */
const isDisabled = computed(() => {
  return props.disabled || props.loading;
});

/**
 * Button에 적용할 class 목록입니다.
 */
const buttonClassName = computed(() => {
  return [
    "btn",
    `btn--${props.variant}`,
    `btn--${props.size}`,
    props.fullWidth && "btn--full",
    props.loading && "btn--loading",
    props.iconOnly && "btn--icon-only",
    props.class,
  ].filter(Boolean);
});

/**
 * 버튼 클릭 이벤트입니다.
 * disabled 또는 loading 상태에서는 click 이벤트를 실행하지 않습니다.
 */
const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    return;
  }

  emit("click", event);
};
</script>

<template>
  <button
    :type="type"
    :class="buttonClassName"
    :disabled="isDisabled"
    :aria-label="ariaLabel"
    :aria-busy="loading || undefined"
    @click="handleClick"
  >
    <!-- 왼쪽 아이콘 영역 -->
    <span
      v-if="$slots.leftIcon && !iconOnly"
      class="btn__icon"
      aria-hidden="true"
    >
      <slot name="leftIcon" />
    </span>

    <!-- iconOnly 버튼일 때는 기본 slot 자체를 아이콘으로 사용합니다. -->
    <span
      v-if="iconOnly"
      class="btn__icon"
      aria-hidden="true"
    >
      <slot />
    </span>

    <!-- 일반 버튼 라벨 -->
    <span
      v-else
      class="btn__label"
    >
      {{ loading ? "Loading..." : "" }}

      <template v-if="!loading">
        <slot />
      </template>
    </span>

    <!-- 오른쪽 아이콘 영역 -->
    <span
      v-if="$slots.rightIcon && !iconOnly"
      class="btn__icon"
      aria-hidden="true"
    >
      <slot name="rightIcon" />
    </span>
  </button>
</template>