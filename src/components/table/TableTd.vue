<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

/**
 * 셀 정렬 타입입니다.
 */
type TableCellAlign = 'left' | 'center' | 'right'

/**
 * TableTd Props입니다.
 */
interface TableTdProps {
  /**
   * 셀 정렬입니다.
   */
  align?: TableCellAlign

  /**
   * 셀 너비입니다.
   * 숫자는 px, 문자열은 CSS 값으로 그대로 사용합니다.
   */
  width?: number | string

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<TableTdProps>(), {
  align: 'left',
  width: undefined,
  class: '',
})

/**
 * td className입니다.
 */
const tdClassName = computed(() => {
  return [
    'table__td',
    `table__cell--${props.align}`,
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

/**
 * td style입니다.
 */
const tdStyle = computed<CSSProperties>(() => {
  return {
    width:
      typeof props.width === 'number'
        ? `${props.width}px`
        : props.width,
  }
})
</script>

<template>
  <td
    :class="tdClassName"
    :style="tdStyle"
  >
    <slot />
  </td>
</template>