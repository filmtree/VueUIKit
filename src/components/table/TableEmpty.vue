<script setup lang="ts">
/**
 * TableEmpty Props입니다.
 */
interface TableEmptyProps {
  /**
   * 병합할 컬럼 수입니다.
   */
  colSpan: number

  /**
   * 데이터가 없을 때 보여줄 메시지입니다.
   */
  message?: string
}

withDefaults(defineProps<TableEmptyProps>(), {
  message: '데이터가 없습니다.',
})
</script>

<template>
  <tr>
    <td
      class="table__empty"
      :colspan="colSpan"
    >
      {{ message }}
    </td>
  </tr>
</template>