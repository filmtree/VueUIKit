<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

/**
 * 셀 정렬 타입입니다.
 */
type TableCellAlign = 'left' | 'center' | 'right'

/**
 * TableTh Props입니다.
 */
interface TableThProps {
  /**
   * 컬럼 정렬입니다.
   */
  align?: TableCellAlign

  /**
   * 컬럼 너비입니다.
   * 숫자는 px, 문자열은 CSS 값으로 그대로 사용합니다.
   */
  width?: number | string

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<TableThProps>(), {
  align: 'left',
  width: undefined,
  class: '',
})

/**
 * th className입니다.
 */
const thClassName = computed(() => {
  return [
    'table__th',
    `table__cell--${props.align}`,
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

/**
 * th style입니다.
 */
const thStyle = computed<CSSProperties>(() => {
  return {
    width:
      typeof props.width === 'number'
        ? `${props.width}px`
        : props.width,
  }
})
</script>

<template>
  <th
    :class="thClassName"
    :style="thStyle"
  >
    <slot />
  </th>
</template>