<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { Pagination } from "/src/components/pagination";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type UserResponse = {
  items: User[];
  totalCount: number;
};

/**
 * 예제에서 공통으로 사용할 전체 회원 데이터입니다.
 * 실제 프로젝트에서는 이 데이터가 API 응답으로 들어옵니다.
 */
const allUsers: User[] = Array.from({ length: 125 }).map((_, index) => ({
  id: index + 1,
  name: `회원 ${index + 1}`,
  email: `user${index + 1}@test.com`,
  role: index % 3 === 0 ? "관리자" : index % 3 === 1 ? "매니저" : "회원",
}));

/* =====================================================
 * 1. 기본 Pagination 예제
===================================================== */

/**
 * 가장 기본적인 Pagination 상태입니다.
 */
const basicPage = ref(1);

/* =====================================================
 * 2. 테이블 데이터와 함께 사용하는 예제
===================================================== */

/**
 * 테이블에서 사용할 현재 페이지입니다.
 */
const tablePage = ref(1);

/**
 * 테이블에서 한 페이지에 보여줄 개수입니다.
 */
const tablePageSize = ref(10);

/**
 * 현재 페이지에 해당하는 데이터만 잘라서 보여줍니다.
 * 프론트에서 이미 전체 데이터를 가지고 있을 때 사용할 수 있는 방식입니다.
 */
const currentTableUsers = computed(() => {
  const startIndex = (tablePage.value - 1) * tablePageSize.value;
  const endIndex = startIndex + tablePageSize.value;

  return allUsers.slice(startIndex, endIndex);
});

/**
 * 테이블에서 현재 보여지는 데이터 범위입니다.
 */
const tableRangeText = computed(() => {
  const start = (tablePage.value - 1) * tablePageSize.value + 1;
  const end = Math.min(tablePage.value * tablePageSize.value, allUsers.length);

  return `${start} - ${end}`;
});

/* =====================================================
 * 3. API 목록 조회 형태 예제
===================================================== */

/**
 * API 예제에서 사용할 현재 페이지입니다.
 */
const apiPage = ref(1);

/**
 * API 예제에서 사용할 페이지 크기입니다.
 */
const apiPageSize = ref(10);

/**
 * API 응답으로 받은 목록 데이터입니다.
 */
const apiUsers = ref<User[]>([]);

/**
 * API 응답으로 받은 전체 데이터 개수입니다.
 */
const apiTotalCount = ref(0);

/**
 * API 요청 중인지 표시하는 상태입니다.
 */
const apiLoading = ref(false);

/**
 * API 호출을 흉내 내는 함수입니다.
 * 실제 프로젝트에서는 fetch 또는 axios로 서버에 요청합니다.
 */
const fetchUsers = async (
  page: number,
  pageSize: number
): Promise<UserResponse> => {
  /**
   * 로딩 상태를 보여주기 위한 지연 처리입니다.
   */
  await new Promise((resolve) => setTimeout(resolve, 500));

  /**
   * 서버에서 page, pageSize 기준으로 데이터를 잘라서 내려준다고 가정합니다.
   */
  const startIndex = (page - 1) * pageSize;
  const items = allUsers.slice(startIndex, startIndex + pageSize);

  return {
    items,
    totalCount: allUsers.length,
  };
};

/**
 * 회원 목록을 불러옵니다.
 */
const loadApiUsers = async () => {
  try {
    apiLoading.value = true;

    const result = await fetchUsers(apiPage.value, apiPageSize.value);

    apiUsers.value = result.items;
    apiTotalCount.value = result.totalCount;
  } finally {
    apiLoading.value = false;
  }
};

/**
 * 최초 화면 진입 시 데이터를 불러옵니다.
 */
onMounted(() => {
  loadApiUsers();
});

/**
 * page 또는 pageSize가 바뀌면 데이터를 다시 불러옵니다.
 */
watch([apiPage, apiPageSize], () => {
  loadApiUsers();
});

/* =====================================================
 * 4. pageSize 선택 예제
===================================================== */

/**
 * 페이지 크기 선택 예제에서 사용할 현재 페이지입니다.
 */
const pageSizePage = ref(1);

/**
 * 사용자가 선택할 수 있는 페이지 크기입니다.
 */
const selectablePageSize = ref(10);

/**
 * 전체 데이터 개수입니다.
 */
const selectableTotalCount = ref(125);

/**
 * pageSize가 변경되면 기존 page가 범위를 벗어날 수 있으므로
 * 1페이지로 초기화합니다.
 */
const handlePageSizeChange = () => {
  pageSizePage.value = 1;
};

/* =====================================================
 * 5. 버튼 옵션 예제
===================================================== */

/**
 * 처음 / 마지막 버튼을 숨긴 예제입니다.
 */
const simplePage = ref(1);

/**
 * 작은 사이즈 예제입니다.
 */
const smallPage = ref(1);

/**
 * 큰 사이즈 예제입니다.
 */
const largePage = ref(1);
</script>

<template>
  <main class="app">
    <section class="page-hero">
      <p class="page-hero__eyebrow">
        UI Component Example
      </p>

      <h1 class="page-hero__title">
        Pagination 예제 모음
      </h1>

      <p class="page-hero__description">
        기본 사용, 테이블 연동, API 조회 형태, 페이지 크기 변경, 옵션별 표시 방식을
        한 화면에서 확인할 수 있습니다.
      </p>
    </section>

    <!-- 기본 사용 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            기본 사용
          </h2>

          <p class="example-section__description">
            현재 페이지 상태만 만들고 Pagination에 연결하는 가장 기본적인 형태입니다.
          </p>
        </div>

        <span class="example-section__badge">
          현재 페이지 {{ basicPage }}
        </span>
      </div>

      <div class="example-card">
        <Pagination
          v-model:page="basicPage"
          :page-size="10"
          :total-count="125"
        />
      </div>
    </section>

    <!-- 테이블과 함께 사용하는 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            테이블 데이터와 함께 사용
          </h2>

          <p class="example-section__description">
            전체 데이터를 가지고 있을 때 현재 페이지에 해당하는 데이터만 잘라서 보여주는 방식입니다.
          </p>
        </div>

        <span class="example-section__badge">
          {{ tableRangeText }} / {{ allUsers.length }}
        </span>
      </div>

      <div class="example-card">
        <div class="table-wrap">
          <table class="user-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>이메일</th>
                <th>권한</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="user in currentTableUsers"
                :key="user.id"
              >
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="role-badge">
                    {{ user.role }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination-area">
          <Pagination
            v-model:page="tablePage"
            :page-size="tablePageSize"
            :total-count="allUsers.length"
          />
        </div>
      </div>
    </section>

    <!-- API 조회 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            API 목록 조회 형태
          </h2>

          <p class="example-section__description">
            page와 pageSize가 바뀔 때마다 데이터를 다시 조회하는 형태입니다.
          </p>
        </div>

        <span class="example-section__badge">
          현재 페이지 {{ apiPage }}
        </span>
      </div>

      <div class="example-card">
        <div
          v-if="apiLoading"
          class="loading-box"
        >
          데이터를 불러오는 중입니다...
        </div>

        <div class="table-wrap">
          <table class="user-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>이메일</th>
                <th>권한</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="user in apiUsers"
                :key="user.id"
              >
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="role-badge">
                    {{ user.role }}
                  </span>
                </td>
              </tr>

              <tr v-if="!apiLoading && apiUsers.length === 0">
                <td colspan="4">
                  데이터가 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination-area">
          <Pagination
            v-model:page="apiPage"
            :page-size="apiPageSize"
            :total-count="apiTotalCount"
          />
        </div>
      </div>
    </section>

    <!-- pageSize 선택 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            페이지 크기 선택
          </h2>

          <p class="example-section__description">
            10개씩 보기, 20개씩 보기, 50개씩 보기처럼 페이지 크기를 바꾸는 형태입니다.
          </p>
        </div>

        <span class="example-section__badge">
          {{ selectablePageSize }}개씩 보기
        </span>
      </div>

      <div class="example-card">
        <div class="pagination-toolbar">
          <div class="pagination-toolbar__info">
            총 {{ selectableTotalCount }}개
          </div>

          <Pagination
            v-model:page="pageSizePage"
            :page-size="selectablePageSize"
            :total-count="selectableTotalCount"
          />

          <label class="page-size-select">
            <span>보기 개수</span>

            <select
              v-model.number="selectablePageSize"
              @change="handlePageSizeChange"
            >
              <option :value="10">
                10개씩 보기
              </option>

              <option :value="20">
                20개씩 보기
              </option>

              <option :value="50">
                50개씩 보기
              </option>
            </select>
          </label>
        </div>
      </div>
    </section>

    <!-- 옵션별 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            옵션별 표시 방식
          </h2>

          <p class="example-section__description">
            처음/마지막 버튼 숨김, 작은 크기, 큰 크기 옵션을 확인할 수 있습니다.
          </p>
        </div>
      </div>

      <div class="option-grid">
        <div class="option-card">
          <h3 class="option-card__title">
            처음 / 마지막 버튼 숨김
          </h3>

          <Pagination
            v-model:page="simplePage"
            :page-size="10"
            :total-count="125"
            :show-first-last="false"
          />
        </div>

        <div class="option-card">
          <h3 class="option-card__title">
            작은 크기
          </h3>

          <Pagination
            v-model:page="smallPage"
            :page-size="10"
            :total-count="125"
            size="sm"
          />
        </div>

        <div class="option-card">
          <h3 class="option-card__title">
            큰 크기
          </h3>

          <Pagination
            v-model:page="largePage"
            :page-size="10"
            :total-count="125"
            size="lg"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.app {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0 80px;

  color: #111827;
}

.page-hero {
  margin-bottom: 40px;
  padding: 32px;

  border: 1px solid #e5e7eb;
  border-radius: 24px;

  background:
    linear-gradient(135deg, #eff6ff 0%, #ffffff 46%, #f9fafb 100%);
}

.page-hero__eyebrow {
  margin: 0 0 8px;

  color: #2563eb;

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-hero__title {
  margin: 0;

  font-size: 34px;
  line-height: 1.25;
  font-weight: 800;
}

.page-hero__description {
  max-width: 720px;
  margin: 14px 0 0;

  color: #6b7280;

  font-size: 15px;
  line-height: 1.7;
}

.example-section {
  margin-top: 32px;
}

.example-section__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;

  margin-bottom: 14px;
}

.example-section__title {
  margin: 0;

  font-size: 22px;
  line-height: 1.35;
  font-weight: 800;
}

.example-section__description {
  margin: 6px 0 0;

  color: #6b7280;

  font-size: 14px;
  line-height: 1.6;
}

.example-section__badge {
  flex-shrink: 0;

  display: inline-flex;
  align-items: center;

  min-height: 32px;
  padding: 0 12px;

  border-radius: 999px;

  background-color: #eff6ff;
  color: #2563eb;

  font-size: 13px;
  font-weight: 700;
}

.example-card {
  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 18px;

  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.table-wrap {
  overflow-x: auto;

  border: 1px solid #e5e7eb;
  border-radius: 14px;
}

.user-table {
  width: 100%;
  min-width: 720px;

  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 14px 16px;

  border-bottom: 1px solid #e5e7eb;

  text-align: left;
  white-space: nowrap;

  font-size: 14px;
}

.user-table th {
  background-color: #f9fafb;
  color: #374151;

  font-weight: 800;
}

.user-table td {
  color: #4b5563;
}

.user-table tbody tr:last-child td {
  border-bottom: 0;
}

.role-badge {
  display: inline-flex;
  align-items: center;

  min-height: 26px;
  padding: 0 10px;

  border-radius: 999px;

  background-color: #f3f4f6;
  color: #374151;

  font-size: 12px;
  font-weight: 700;
}

.pagination-area {
  display: flex;
  justify-content: center;

  margin-top: 20px;
}

.loading-box {
  margin-bottom: 12px;
  padding: 12px 14px;

  border-radius: 12px;

  background-color: #eff6ff;
  color: #1d4ed8;

  font-size: 14px;
  font-weight: 700;
}

.pagination-toolbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
}

.pagination-toolbar__info {
  color: #6b7280;

  font-size: 14px;
  font-weight: 700;
}

.page-size-select {
  justify-self: end;

  display: inline-flex;
  align-items: center;
  gap: 8px;

  color: #6b7280;

  font-size: 14px;
  font-weight: 700;
}

.page-size-select select {
  height: 38px;
  padding: 0 34px 0 12px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  background-color: #fff;
  color: #111827;

  font-size: 14px;
}

.option-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.option-card {
  display: flex;
  flex-direction: column;
  gap: 18px;

  min-width: 0;
  padding: 22px;

  border: 1px solid #e5e7eb;
  border-radius: 18px;

  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.option-card__title {
  margin: 0;

  font-size: 16px;
  line-height: 1.4;
  font-weight: 800;
}

@media (max-width: 900px) {
  .example-section__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .pagination-toolbar {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .pagination-toolbar__info {
    text-align: center;
  }

  .page-size-select {
    justify-self: center;
  }

  .option-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .app {
    width: min(100% - 24px, 1120px);
    padding-top: 28px;
  }

  .page-hero {
    padding: 24px;
    border-radius: 20px;
  }

  .page-hero__title {
    font-size: 28px;
  }

  .example-card,
  .option-card {
    padding: 18px;
  }
}
</style>