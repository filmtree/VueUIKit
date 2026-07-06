<script setup lang="ts">
import { computed } from "vue";
import "./Dropdown.css";

type DropdownLabelProps = {
  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<DropdownLabelProps>(), {
  class: "",
});

const labelClassName = computed(() => {
  return ["dropdown__label", props.class].filter(Boolean);
});
</script>

<template>
  <div :class="labelClassName">
    <slot />
  </div>
</template>