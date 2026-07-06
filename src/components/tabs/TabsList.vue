<script setup lang="ts">
import { computed } from 'vue'

/**
 * TabsList Props입니다.
 */
interface TabsListProps {
  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<TabsListProps>(), {
  class: '',
})

/**
 * TabsList className입니다.
 */
const listClassName = computed(() => {
  return [
    'tabs__list',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <div
    :class="listClassName"
    role="tablist"
  >
    <slot />
  </div>
</template>