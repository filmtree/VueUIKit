<script setup lang="ts">
import { computed } from "vue";
import "./Card.css";

type CardBodyProps = {
  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<CardBodyProps>(), {
  class: "",
});

/**
 * CardBody class 목록입니다.
 */
const bodyClassName = computed(() => {
  return ["card__body", props.class].filter(Boolean);
});
</script>

<template>
  <div :class="bodyClassName">
    <slot />
  </div>
</template>