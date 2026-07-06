<script setup lang="ts">
import { computed } from "vue";
import "./Card.css";

/**
 * CardTitle에서 사용할 수 있는 제목 태그입니다.
 */
export type CardTitleAs =
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

type CardTitleProps = {
  /**
   * 제목 태그 레벨입니다.
   * 기본값은 h3입니다.
   */
  as?: CardTitleAs;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<CardTitleProps>(), {
  as: "h3",
  class: "",
});

/**
 * CardTitle class 목록입니다.
 */
const titleClassName = computed(() => {
  return ["card__title", props.class].filter(Boolean);
});
</script>

<template>
  <component
    :is="as"
    :class="titleClassName"
  >
    <slot />
  </component>
</template>