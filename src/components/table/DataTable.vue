<script setup lang="ts" generic="T extends Record<string, unknown>">
import TableRoot from './TableRoot.vue'
import TableHead from './TableHead.vue'
import TableBody from './TableBody.vue'
import TableRow from './TableRow.vue'
import TableTh from './TableTh.vue'
import TableTd from './TableTd.vue'
import TableEmpty from './TableEmpty.vue'
import './Table.css'

/**
 * 컬럼 정렬 타입입니다.
 */
type TableCellAlign = 'left' | 'center' | 'right'

/**
 * DataTable 컬럼 타입입니다.
 */
export type DataTableColumn<T> = {
  /**
   * 컬럼을 구분하는 key입니다.
   */
  key: string

  /**
   * 테이블 헤더에 표시할 값입니다.
   */
  header: string

  /**
   * data 객체에서 바로 꺼내 쓸 필드명입니다.
   */
  accessor?: keyof T

  /**
   * 컬럼 정렬입니다.
   */
  align?: TableCellAlign

  /**
   * 컬럼 너비입니다.
   */
  width?: number | string
}

/**
 * DataTable Props입니다.
 */
interface DataTableProps<T> {
  /**
   * 컬럼 정의 배열입니다.
   */
  columns: DataTableColumn<T>[]

  /**
   * 실제 데이터 배열입니다.
   */
  data: T[]

  /**
   * row key로 사용할 필드명 또는 함수입니다.
   */
  rowKey: keyof T | ((row: T) => string | number)

  /**
   * 로딩 상태입니다.
   */
  loading?: boolean

  /**
   * 데이터가 없을 때 표시할 문구입니다.
   */
  emptyMessage?: string

  /**
   * table className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<DataTableProps<T>>(), {
  loading: false,
  emptyMessage: '데이터가 없습니다.',
  class: '',
})

/**
 * 행 클릭 이벤트입니다.
 */
const emit = defineEmits<{
  rowClick: [row: T, index: number]
}>()

/**
 * rowKey를 구합니다.
 */
const getRowKey = (row: T) => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row)
  }

  return String(row[props.rowKey])
}

/**
 * cell 값을 가져옵니다.
 */
const getCellValue = (
  row: T,
  column: DataTableColumn<T>,
) => {
  if (!column.accessor) return ''

  return String(row[column.accessor] ?? '')
}

/**
 * 행 클릭 처리입니다.
 */
const handleRowClick = (row: T, index: number) => {
  emit('rowClick', row, index)
}
</script>

<template>
  <TableRoot :class="props.class">
    <TableHead>
      <TableRow>
        <TableTh
          v-for="column in columns"
          :key="column.key"
          :align="column.align"
          :width="column.width"
        >
          {{ column.header }}
        </TableTh>
      </TableRow>
    </TableHead>

    <TableBody>
      <tr v-if="loading">
        <td
          class="table__empty"
          :colspan="columns.length"
        >
          불러오는 중입니다.
        </td>
      </tr>

      <TableEmpty
        v-else-if="data.length === 0"
        :col-span="columns.length"
        :message="emptyMessage"
      />

      <TableRow
        v-for="(row, rowIndex) in data"
        v-else
        :key="getRowKey(row)"
        clickable
        @click="handleRowClick(row, rowIndex)"
      >
        <TableTd
          v-for="column in columns"
          :key="column.key"
          :align="column.align"
          :width="column.width"
        >
          <!--
            커스텀 셀이 필요한 경우
            #cell-컬럼키 slot을 사용합니다.

            예:
            <template #cell-status="{ row }">
              ...
            </template>
          -->
          <slot
            :name="`cell-${column.key}`"
            :row="row"
            :value="column.accessor ? row[column.accessor] : undefined"
            :index="rowIndex"
          >
            {{ getCellValue(row, column) }}
          </slot>
        </TableTd>
      </TableRow>
    </TableBody>
  </TableRoot>
</template>