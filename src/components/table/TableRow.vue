<script setup lang="ts">
import { computed } from 'vue'

/**
 * TableRow Props입니다.
 */
interface TableRowProps {
  /**
   * 클릭 가능한 행인지 여부입니다.
   */
  clickable?: boolean

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<TableRowProps>(), {
  clickable: false,
  class: '',
})

/**
 * row className입니다.
 */
const rowClassName = computed(() => {
  return [
    'table__row',
    props.clickable && 'table__row--clickable',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <tr :class="rowClassName">
    <slot />
  </tr>
</template>