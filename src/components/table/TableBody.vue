<script setup lang="ts">
/**
 * TableBody Props입니다.
 */
interface TableBodyProps {
  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<TableBodyProps>(), {
  class: '',
})
</script>

<template>
  <tbody
    :class="['table__body', props.class].filter(Boolean).join(' ')"
  >
    <slot />
  </tbody>
</template>