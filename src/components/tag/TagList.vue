<script setup lang="ts">
import { computed } from 'vue'
import './TagList.css'

/**
 * TagList 간격 타입입니다.
 */
type TagListGap =
  | 'sm'
  | 'md'
  | 'lg'

/**
 * TagList Props입니다.
 */
interface TagListProps {
  /**
   * 태그 사이 간격입니다.
   */
  gap?: TagListGap

  /**
   * 줄바꿈 여부입니다.
   */
  wrap?: boolean

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<TagListProps>(), {
  gap: 'md',
  wrap: true,
  class: '',
})

/**
 * 조건에 따라 className을 조합합니다.
 */
const tagListClassName = computed(() => {
  return [
    'tag-list',
    `tag-list--gap-${props.gap}`,
    props.wrap ? 'tag-list--wrap' : 'tag-list--nowrap',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<template>
  <div :class="tagListClassName">
    <slot />
  </div>
</template>