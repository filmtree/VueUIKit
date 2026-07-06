<script setup lang="ts">
/**
 * TableHead Props입니다.
 */
interface TableHeadProps {
  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<TableHeadProps>(), {
  class: '',
})
</script>

<template>
  <thead
    :class="['table__head', props.class].filter(Boolean).join(' ')"
  >
    <slot />
  </thead>
</template>