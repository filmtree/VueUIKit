<script setup lang="ts">
import { computed } from "vue";
import "./Card.css";

/**
 * Card의 스타일 종류입니다.
 *
 * default  : 일반 카드
 * outlined : 테두리가 강조된 카드
 * elevated : 그림자가 강조된 카드
 */
export type CardVariant =
  | "default"
  | "outlined"
  | "elevated";

/**
 * Card 내부 여백 크기입니다.
 */
export type CardPadding =
  | "none"
  | "sm"
  | "md"
  | "lg";

/**
 * Card 모서리 둥글기 크기입니다.
 */
export type CardRadius =
  | "none"
  | "sm"
  | "md"
  | "lg";

/**
 * Card props 타입입니다.
 */
type CardProps = {
  /**
   * 카드 스타일 종류입니다.
   */
  variant?: CardVariant;

  /**
   * 카드 내부 여백입니다.
   */
  padding?: CardPadding;

  /**
   * 카드 모서리 둥글기입니다.
   */
  radius?: CardRadius;

  /**
   * 클릭 가능한 카드인지 여부입니다.
   * true이면 hover, cursor 스타일이 적용됩니다.
   */
  clickable?: boolean;

  /**
   * 카드가 선택된 상태인지 여부입니다.
   */
  selected?: boolean;

  /**
   * 카드가 비활성화된 상태인지 여부입니다.
   */
  disabled?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<CardProps>(), {
  variant: "default",
  padding: "md",
  radius: "md",
  clickable: false,
  selected: false,
  disabled: false,
  class: "",
});

const emit = defineEmits<{
  /**
   * Card 클릭 이벤트입니다.
   */
  click: [event: MouseEvent];
}>();

/**
 * Card에 적용할 최종 class 목록입니다.
 */
const cardClassName = computed(() => {
  return [
    "card",
    `card--${props.variant}`,
    `card--padding-${props.padding}`,
    `card--radius-${props.radius}`,
    props.clickable && "card--clickable",
    props.selected && "card--selected",
    props.disabled && "card--disabled",
    props.class,
  ].filter(Boolean);
});

/**
 * Card 클릭 이벤트입니다.
 * disabled 상태에서는 click 이벤트를 실행하지 않습니다.
 */
const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit("click", event);
};
</script>

<template>
  <div
    :class="cardClassName"
    :aria-disabled="disabled || undefined"
    @click="handleClick"
  >
    <slot />
  </div>
</template>