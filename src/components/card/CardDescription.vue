<script setup lang="ts">
import { computed } from "vue";
import "./Card.css";

type CardDescriptionProps = {
  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<CardDescriptionProps>(), {
  class: "",
});

/**
 * CardDescription class 목록입니다.
 */
const descriptionClassName = computed(() => {
  return ["card__description", props.class].filter(Boolean);
});
</script>

<template>
  <p :class="descriptionClassName">
    <slot />
  </p>
</template>