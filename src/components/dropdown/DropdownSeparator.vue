<script setup lang="ts">
import { computed } from "vue";
import "./Dropdown.css";

type DropdownSeparatorProps = {
  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<DropdownSeparatorProps>(), {
  class: "",
});

const separatorClassName = computed(() => {
  return ["dropdown__separator", props.class].filter(Boolean);
});
</script>

<template>
  <div
    :class="separatorClassName"
    role="separator"
  />
</template>