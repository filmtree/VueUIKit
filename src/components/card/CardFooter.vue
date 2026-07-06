<script setup lang="ts">
import { computed } from "vue";
import "./Card.css";

/**
 * Footer 내부 정렬 타입입니다.
 *
 * left    : 왼쪽 정렬
 * center  : 가운데 정렬
 * right   : 오른쪽 정렬
 * between : 양끝 정렬
 */
export type CardFooterAlign =
  | "left"
  | "center"
  | "right"
  | "between";

type CardFooterProps = {
  /**
   * footer 내부 정렬 방식입니다.
   */
  align?: CardFooterAlign;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<CardFooterProps>(), {
  align: "right",
  class: "",
});

/**
 * CardFooter class 목록입니다.
 */
const footerClassName = computed(() => {
  return [
    "card__footer",
    `card__footer--${props.align}`,
    props.class,
  ].filter(Boolean);
});
</script>

<template>
  <div :class="footerClassName">
    <slot />
  </div>
</template>