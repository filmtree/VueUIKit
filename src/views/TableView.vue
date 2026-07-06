<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import TableRoot from '/src/components/table/TableRoot.vue'
import TableHead from '/src/components/table/TableHead.vue'
import TableBody from '/src/components/table/TableBody.vue'
import TableRow from '/src/components/table/TableRow.vue'
import TableTh from '/src/components/table/TableTh.vue'
import TableTd from '/src/components/table/TableTd.vue'
import TableEmpty from '/src/components/table/TableEmpty.vue'
import DataTable, {  type DataTableColumn,} from '/src/components/table/DataTable.vue'
import Pagination from '/src/components/pagination/Pagination.vue'

type UserStatus = 'active' | 'waiting' | 'blocked'

type User = {
  id: number
  name: string
  email: string
  status: UserStatus
  createdAt: string
}

type Order = {
  id: number
  orderNumber: string
  customer: string
  price: number
  status: 'paid' | 'ready' | 'cancel'
  createdAt: string
}

/**
 * 기본 Table 예제에서 사용할 회원 데이터입니다.
 */
const basicUsers: User[] = [
  {
    id: 1,
    name: '홍길동',
    email: 'hong@test.com',
    status: 'active',
    createdAt: '2026.06.15',
  },
  {
    id: 2,
    name: '김철수',
    email: 'kim@test.com',
    status: 'waiting',
    createdAt: '2026.06.14',
  },
  {
    id: 3,
    name: '이영희',
    email: 'lee@test.com',
    status: 'blocked',
    createdAt: '2026.06.13',
  },
]

/**
 * DataTable 예제에서 사용할 컬럼 정의입니다.
 */
const userColumns: DataTableColumn<User>[] = [
  {
    key: 'id',
    header: '번호',
    accessor: 'id',
    width: 80,
    align: 'center',
  },
  {
    key: 'name',
    header: '이름',
    accessor: 'name',
  },
  {
    key: 'email',
    header: '이메일',
    accessor: 'email',
  },
  {
    key: 'status',
    header: '상태',
    accessor: 'status',
    align: 'center',
  },
  {
    key: 'createdAt',
    header: '가입일',
    accessor: 'createdAt',
    align: 'right',
  },
]

/**
 * 액션 컬럼 예제에서 사용할 주문 데이터입니다.
 */
const orders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-20260702-001',
    customer: '홍길동',
    price: 48000,
    status: 'paid',
    createdAt: '2026.07.02',
  },
  {
    id: 2,
    orderNumber: 'ORD-20260702-002',
    customer: '김철수',
    price: 72000,
    status: 'ready',
    createdAt: '2026.07.02',
  },
  {
    id: 3,
    orderNumber: 'ORD-20260701-003',
    customer: '이영희',
    price: 31000,
    status: 'cancel',
    createdAt: '2026.07.01',
  },
]

/**
 * 주문 테이블 컬럼 정의입니다.
 */
const orderColumns: DataTableColumn<Order>[] = [
  {
    key: 'orderNumber',
    header: '주문번호',
    accessor: 'orderNumber',
  },
  {
    key: 'customer',
    header: '고객명',
    accessor: 'customer',
  },
  {
    key: 'price',
    header: '결제금액',
    accessor: 'price',
    align: 'right',
  },
  {
    key: 'status',
    header: '상태',
    accessor: 'status',
    align: 'center',
  },
  {
    key: 'createdAt',
    header: '주문일',
    accessor: 'createdAt',
    align: 'right',
  },
  {
    key: 'actions',
    header: '관리',
    align: 'right',
    width: 160,
  },
]

/**
 * 체크박스 선택 Table 예제에서 사용할 데이터입니다.
 */
const selectableUsers: User[] = [
  {
    id: 1,
    name: '홍길동',
    email: 'hong@test.com',
    status: 'active',
    createdAt: '2026.06.15',
  },
  {
    id: 2,
    name: '김철수',
    email: 'kim@test.com',
    status: 'waiting',
    createdAt: '2026.06.14',
  },
  {
    id: 3,
    name: '이영희',
    email: 'lee@test.com',
    status: 'blocked',
    createdAt: '2026.06.13',
  },
]

/**
 * 선택된 회원 id 목록입니다.
 */
const selectedIds = ref<number[]>([])

/**
 * 전체 선택 checkbox DOM에 접근하기 위한 ref입니다.
 */
const checkAllRef = ref<HTMLInputElement | null>(null)

/**
 * 전체 선택 여부입니다.
 */
const checkedAll = computed(() => {
  return (
    selectableUsers.length > 0 &&
    selectedIds.value.length === selectableUsers.length
  )
})

/**
 * 일부만 선택되었는지 여부입니다.
 */
const indeterminate = computed(() => {
  return (
    selectedIds.value.length > 0 &&
    selectedIds.value.length < selectableUsers.length
  )
})

/**
 * 선택 여부를 빠르게 확인하기 위한 Set입니다.
 */
const selectedIdSet = computed(() => {
  return new Set(selectedIds.value)
})

/**
 * 전체 선택 토글입니다.
 */
const handleToggleAll = () => {
  if (checkedAll.value) {
    selectedIds.value = []
    return
  }

  selectedIds.value = selectableUsers.map((user) => user.id)
}

/**
 * 개별 행 선택 토글입니다.
 */
const handleToggleRow = (id: number) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((selectedId) => {
      return selectedId !== id
    })

    return
  }

  selectedIds.value = [...selectedIds.value, id]
}

/**
 * indeterminate는 HTML attribute가 아니라 DOM property이므로
 * ref를 통해 직접 설정합니다.
 */
watch(
  indeterminate,
  (value) => {
    if (!checkAllRef.value) return

    checkAllRef.value.indeterminate = value
  },
  {
    immediate: true,
  },
)

/**
 * 페이지네이션 예제에서 사용할 전체 회원 데이터입니다.
 */
const allUsers: User[] = Array.from({
  length: 35,
}).map((_, index) => {
  const statusList: UserStatus[] = ['active', 'waiting', 'blocked']

  return {
    id: index + 1,
    name: `회원 ${index + 1}`,
    email: `user${index + 1}@test.com`,
    status: statusList[index % statusList.length],
    createdAt: `2026.06.${String((index % 28) + 1).padStart(2, '0')}`,
  }
})

/**
 * 현재 페이지입니다.
 */
const page = ref(1)

/**
 * 페이지당 표시할 개수입니다.
 */
const pageSize = 10

/**
 * 현재 페이지에 보여줄 사용자 목록입니다.
 */
const currentUsers = computed(() => {
  const startIndex = (page.value - 1) * pageSize

  return allUsers.slice(startIndex, startIndex + pageSize)
})

/**
 * 상태별 배지 className을 반환합니다.
 */
const getUserStatusClassName = (status: UserStatus) => {
  const statusClassMap = {
    active: 'table-badge table-badge--success',
    waiting: 'table-badge table-badge--warning',
    blocked: 'table-badge table-badge--danger',
  }

  return statusClassMap[status]
}

/**
 * 상태별 한글 라벨을 반환합니다.
 */
const getUserStatusLabel = (status: UserStatus) => {
  const statusLabelMap = {
    active: '활성',
    waiting: '대기',
    blocked: '차단',
  }

  return statusLabelMap[status]
}

/**
 * 주문 상태별 배지 className을 반환합니다.
 */
const getOrderStatusClassName = (status: Order['status']) => {
  const statusClassMap = {
    paid: 'table-badge table-badge--success',
    ready: 'table-badge table-badge--warning',
    cancel: 'table-badge table-badge--danger',
  }

  return statusClassMap[status]
}

/**
 * 주문 상태별 한글 라벨을 반환합니다.
 */
const getOrderStatusLabel = (status: Order['status']) => {
  const statusLabelMap = {
    paid: '결제완료',
    ready: '준비중',
    cancel: '취소',
  }

  return statusLabelMap[status]
}

/**
 * 금액 표시 포맷입니다.
 */
const formatPrice = (price: number) => {
  return `${price.toLocaleString()}원`
}

/**
 * 행 클릭 예제입니다.
 */
const handleRowClick = (row: User) => {
  console.log('클릭한 회원:', row)
}

/**
 * 상세 버튼 클릭 예제입니다.
 */
const handleDetail = (row: Order) => {
  console.log('상세:', row)
}

/**
 * 수정 버튼 클릭 예제입니다.
 */
const handleEdit = (row: Order) => {
  console.log('수정:', row)
}

/**
 * 삭제 버튼 클릭 예제입니다.
 */
const handleDelete = (row: Order) => {
  console.log('삭제:', row)
}

/**
 * 선택 삭제 버튼 예제입니다.
 */
const handleDeleteSelected = () => {
  console.log('선택 삭제:', selectedIds.value)
}
</script>

<template>
  <main class="app">
    <section class="app__hero">
      <p class="app__eyebrow">
        UI Component Example
      </p>

      <h1 class="app__title">
        Table 예제 모음
      </h1>

      <p class="app__description">
        기본 Table, DataTable, 액션 컬럼, 체크박스 선택, 빈 상태, 로딩 상태,
        페이지네이션 예제를 한 페이지에서 확인할 수 있는 구성입니다.
      </p>
    </section>

    <!-- 기본 Table 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          기본 Table
        </h2>

        <p class="section__description">
          TableRoot, TableHead, TableBody, TableRow, TableTh, TableTd를 직접 조합하는 방식입니다.
        </p>
      </div>

      <TableRoot>
        <TableHead>
          <TableRow>
            <TableTh
              :width="80"
              align="center"
            >
              번호
            </TableTh>

            <TableTh>이름</TableTh>
            <TableTh>이메일</TableTh>

            <TableTh align="center">
              상태
            </TableTh>

            <TableTh align="right">
              가입일
            </TableTh>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow
            v-for="user in basicUsers"
            :key="user.id"
          >
            <TableTd align="center">
              {{ user.id }}
            </TableTd>

            <TableTd>
              {{ user.name }}
            </TableTd>

            <TableTd>
              {{ user.email }}
            </TableTd>

            <TableTd align="center">
              <span :class="getUserStatusClassName(user.status)">
                {{ getUserStatusLabel(user.status) }}
              </span>
            </TableTd>

            <TableTd align="right">
              {{ user.createdAt }}
            </TableTd>
          </TableRow>
        </TableBody>
      </TableRoot>
    </section>

    <!-- DataTable 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          DataTable
        </h2>

        <p class="section__description">
          columns와 data를 전달해서 목록 화면을 반복 렌더링하는 방식입니다.
        </p>
      </div>

      <DataTable
        :columns="userColumns"
        :data="basicUsers"
        row-key="id"
        @row-click="handleRowClick"
      >
        <template #cell-status="{ row }">
          <span :class="getUserStatusClassName(row.status)">
            {{ getUserStatusLabel(row.status) }}
          </span>
        </template>
      </DataTable>
    </section>

    <!-- 액션 컬럼 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          액션 컬럼
        </h2>

        <p class="section__description">
          상세, 수정, 삭제처럼 행마다 버튼이 필요한 경우 slot으로 액션 영역을 구성합니다.
        </p>
      </div>

      <DataTable
        :columns="orderColumns"
        :data="orders"
        row-key="id"
      >
        <template #cell-price="{ row }">
          {{ formatPrice(row.price) }}
        </template>

        <template #cell-status="{ row }">
          <span :class="getOrderStatusClassName(row.status)">
            {{ getOrderStatusLabel(row.status) }}
          </span>
        </template>

        <template #cell-actions="{ row }">
          <div class="action-buttons">
            <button
              type="button"
              class="action-button"
              @click.stop="handleDetail(row)"
            >
              상세
            </button>

            <button
              type="button"
              class="action-button"
              @click.stop="handleEdit(row)"
            >
              수정
            </button>

            <button
              type="button"
              class="action-button action-button--danger"
              @click.stop="handleDelete(row)"
            >
              삭제
            </button>
          </div>
        </template>
      </DataTable>
    </section>

    <!-- 체크박스 선택 Table 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          체크박스 선택 Table
        </h2>

        <p class="section__description">
          여러 행을 선택한 뒤 선택 삭제, 상태 변경 같은 일괄 작업을 처리하는 예제입니다.
        </p>
      </div>

      <div class="table-toolbar">
        <strong>선택된 항목: {{ selectedIds.length }}개</strong>

        <button
          type="button"
          :disabled="selectedIds.length === 0"
          @click="handleDeleteSelected"
        >
          선택 삭제
        </button>
      </div>

      <TableRoot>
        <TableHead>
          <TableRow>
            <TableTh
              :width="56"
              align="center"
            >
              <input
                ref="checkAllRef"
                type="checkbox"
                :checked="checkedAll"
                aria-label="전체 선택"
                @change="handleToggleAll"
              />
            </TableTh>

            <TableTh>이름</TableTh>
            <TableTh>이메일</TableTh>

            <TableTh align="center">
              상태
            </TableTh>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow
            v-for="user in selectableUsers"
            :key="user.id"
          >
            <TableTd align="center">
              <input
                type="checkbox"
                :checked="selectedIdSet.has(user.id)"
                :aria-label="`${user.name} 선택`"
                @change="handleToggleRow(user.id)"
              />
            </TableTd>

            <TableTd>
              {{ user.name }}
            </TableTd>

            <TableTd>
              {{ user.email }}
            </TableTd>

            <TableTd align="center">
              <span :class="getUserStatusClassName(user.status)">
                {{ getUserStatusLabel(user.status) }}
              </span>
            </TableTd>
          </TableRow>
        </TableBody>
      </TableRoot>
    </section>

    <!-- 빈 상태 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Empty 상태
        </h2>

        <p class="section__description">
          데이터가 없을 때 TableEmpty 또는 DataTable emptyMessage로 안내 문구를 표시합니다.
        </p>
      </div>

      <TableRoot>
        <TableHead>
          <TableRow>
            <TableTh>이름</TableTh>
            <TableTh>이메일</TableTh>
            <TableTh align="center">상태</TableTh>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableEmpty
            :col-span="3"
            message="등록된 회원이 없습니다."
          />
        </TableBody>
      </TableRoot>
    </section>

    <!-- 로딩 상태 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Loading 상태
        </h2>

        <p class="section__description">
          DataTable의 loading 값을 true로 전달하면 로딩 문구를 표시할 수 있습니다.
        </p>
      </div>

      <DataTable
        :columns="userColumns"
        :data="[]"
        row-key="id"
        loading
      />
    </section>

    <!-- 페이지네이션 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Pagination
        </h2>

        <p class="section__description">
          테이블 내부에 페이지네이션을 넣기보다 외부에서 DataTable과 조합해서 사용합니다.
        </p>
      </div>

      <DataTable
        :columns="userColumns"
        :data="currentUsers"
        row-key="id"
      >
        <template #cell-status="{ row }">
          <span :class="getUserStatusClassName(row.status)">
            {{ getUserStatusLabel(row.status) }}
          </span>
        </template>
      </DataTable>

      <Pagination
        :page="page"
        :page-size="pageSize"
        :total-count="allUsers.length"
        @page-change="page = $event"
      />
    </section>
  </main>
</template>

<style scoped>
.app {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0 72px;
  color: #111827;
}

.app__hero {
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  background:
    linear-gradient(135deg, #f8fafc 0%, #ffffff 64%),
    #ffffff;
}

.app__eyebrow {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.app__title {
  margin: 0;
  font-size: 36px;
  line-height: 1.2;
  letter-spacing: -0.04em;
}

.app__description {
  max-width: 760px;
  margin: 16px 0 0;
  color: #4b5563;
  font-size: 16px;
  line-height: 1.7;
}

.section {
  padding: 28px;
  margin-top: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background-color: #ffffff;
}

.section__header {
  margin-bottom: 18px;
}

.section__title {
  margin: 0;
  font-size: 22px;
  line-height: 1.35;
  letter-spacing: -0.02em;
}

.section__description {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.action-buttons {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
}

.action-button {
  min-height: 30px;
  padding: 0 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  color: #111827;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.action-button:hover {
  background-color: #f9fafb;
}

.action-button--danger {
  border-color: #fecaca;
  color: #b91c1c;
}

.action-button--danger:hover {
  background-color: #fef2f2;
}

@media (max-width: 768px) {
  .app {
    width: min(100% - 24px, 1120px);
    padding: 24px 0 48px;
  }

  .app__hero,
  .section {
    padding: 20px;
    border-radius: 18px;
  }

  .app__title {
    font-size: 28px;
  }
}
</style>