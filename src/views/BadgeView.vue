<script setup lang="ts">
import { computed, ref } from "vue";
import { Badge } from "/src/components/badge";
import type { BadgeVariant } from "/src/components/badge";

/**
 * 주문 상태 타입입니다.
 * 화면에서 상태값 Badge 예제를 보여주기 위해 사용합니다.
 */
type OrderStatus = "paid" | "ready" | "shipping" | "done" | "cancel";

/**
 * 주문 상태별 Badge 표시 정보입니다.
 */
const orderStatusMap: Record<
  OrderStatus,
  {
    label: string;
    variant: BadgeVariant;
  }
> = {
  paid: {
    label: "결제완료",
    variant: "success",
  },
  ready: {
    label: "상품준비중",
    variant: "warning",
  },
  shipping: {
    label: "배송중",
    variant: "info",
  },
  done: {
    label: "배송완료",
    variant: "gray",
  },
  cancel: {
    label: "주문취소",
    variant: "danger",
  },
};

/**
 * 주문 상태 목록입니다.
 */
const orderStatuses: OrderStatus[] = [
  "paid",
  "ready",
  "shipping",
  "done",
  "cancel",
];

/**
 * 알림 개수입니다.
 */
const notificationCount = ref(12);

/**
 * 알림 개수가 99개를 초과하면 99+로 표시합니다.
 */
const displayNotificationCount = computed(() => {
  return notificationCount.value > 99
    ? "99+"
    : String(notificationCount.value);
});

/**
 * 선택된 태그 목록입니다.
 * removable Badge 예제에서 사용합니다.
 */
const selectedTags = ref([
  "Vue",
  "TypeScript",
  "UI Component",
  "Design System",
]);

/**
 * 삭제된 태그 목록을 다시 초기화할 때 사용할 기본값입니다.
 */
const defaultTags = [
  "Vue",
  "TypeScript",
  "UI Component",
  "Design System",
];

/**
 * 카테고리 필터 목록입니다.
 */
const categories = [
  "전체",
  "공지",
  "이벤트",
  "업데이트",
  "문의",
];

/**
 * 현재 선택된 카테고리입니다.
 */
const selectedCategory = ref("전체");

/**
 * 최근 클릭한 Badge 정보를 표시하기 위한 상태입니다.
 */
const clickedBadgeMessage = ref("");

/**
 * 태그 삭제 함수입니다.
 */
const handleRemoveTag = (targetTag: string) => {
  selectedTags.value = selectedTags.value.filter((tag) => {
    return tag !== targetTag;
  });
};

/**
 * 삭제 가능한 태그 목록을 다시 채웁니다.
 */
const resetTags = () => {
  selectedTags.value = [...defaultTags];
};

/**
 * 카테고리 선택 함수입니다.
 */
const selectCategory = (category: string) => {
  selectedCategory.value = category;
  clickedBadgeMessage.value = `${category} 카테고리를 선택했습니다.`;
};

/**
 * 알림 개수를 증가시킵니다.
 */
const increaseNotification = () => {
  notificationCount.value += 1;
};

/**
 * 알림 개수를 120개로 변경합니다.
 * 99+ 표시 예제를 확인하기 위한 버튼입니다.
 */
const setOverNotification = () => {
  notificationCount.value = 120;
};

/**
 * 알림 개수를 초기화합니다.
 */
const resetNotification = () => {
  notificationCount.value = 12;
};
</script>

<template>
  <main class="page">
    <header class="page__header">
      <span class="page__eyebrow">
        Vue UI Component
      </span>

      <h1 class="page__title">
        Badge 컴포넌트 예제
      </h1>

      <p class="page__description">
        Badge의 색상, 크기, 모양, 상태값, 알림 개수, dot, 삭제, 클릭, 슬롯, 비활성 상태를 한 페이지에서 확인할 수 있습니다.
      </p>
    </header>

    <!-- variant 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Variant
        </h2>

        <p class="section__description">
          Badge의 기본 색상 상태를 확인하는 예제입니다.
        </p>
      </div>

      <div class="badge-row">
        <Badge>
          기본
        </Badge>

        <Badge variant="primary">
          Primary
        </Badge>

        <Badge variant="success">
          완료
        </Badge>

        <Badge variant="warning">
          대기
        </Badge>

        <Badge variant="danger">
          실패
        </Badge>

        <Badge variant="info">
          진행중
        </Badge>

        <Badge variant="gray">
          보조
        </Badge>
      </div>
    </section>

    <!-- size 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Size
        </h2>

        <p class="section__description">
          xs, sm, md, lg 크기를 비교하는 예제입니다.
        </p>
      </div>

      <div class="badge-row badge-row--center">
        <Badge size="xs" variant="primary">
          XS
        </Badge>

        <Badge size="sm" variant="primary">
          SM
        </Badge>

        <Badge size="md" variant="primary">
          MD
        </Badge>

        <Badge size="lg" variant="primary">
          LG
        </Badge>
      </div>
    </section>

    <!-- shape 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Shape
        </h2>

        <p class="section__description">
          rounded, pill, square 모양을 비교하는 예제입니다.
        </p>
      </div>

      <div class="badge-row">
        <Badge
          variant="info"
          shape="rounded"
        >
          Rounded
        </Badge>

        <Badge
          variant="info"
          shape="pill"
        >
          Pill
        </Badge>

        <Badge
          variant="info"
          shape="square"
        >
          Square
        </Badge>
      </div>
    </section>

    <!-- 상태값 Badge 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          상태값 Badge
        </h2>

        <p class="section__description">
          주문, 게시글, 승인 상태처럼 고정된 상태값을 Badge로 표현하는 예제입니다.
        </p>
      </div>

      <div class="table-card">
        <table class="status-table">
          <thead>
            <tr>
              <th>주문번호</th>
              <th>고객명</th>
              <th>상태</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(status, index) in orderStatuses"
              :key="status"
            >
              <td>
                ORD-2026-00{{ index + 1 }}
              </td>

              <td>
                고객 {{ index + 1 }}
              </td>

              <td>
                <Badge
                  :variant="orderStatusMap[status].variant"
                  shape="pill"
                >
                  {{ orderStatusMap[status].label }}
                </Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 알림 수 Badge 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          알림 수 Badge
        </h2>

        <p class="section__description">
          알림, 장바구니, 메시지 개수를 표시하는 형태입니다.
        </p>
      </div>

      <div class="notification-example">
        <button
          type="button"
          class="notification-button"
          aria-label="알림"
        >
          🔔

          <span class="notification-button__badge">
            <Badge
              variant="danger"
              size="xs"
              shape="pill"
            >
              {{ displayNotificationCount }}
            </Badge>
          </span>
        </button>

        <div class="button-group">
          <button
            type="button"
            class="button button--secondary"
            @click="increaseNotification"
          >
            알림 +1
          </button>

          <button
            type="button"
            class="button button--secondary"
            @click="setOverNotification"
          >
            99+ 보기
          </button>

          <button
            type="button"
            class="button button--secondary"
            @click="resetNotification"
          >
            초기화
          </button>
        </div>
      </div>
    </section>

    <!-- dot Badge 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Dot Badge
        </h2>

        <p class="section__description">
          온라인 상태, 읽지 않음 상태, 신규 데이터 표시 등에 사용할 수 있습니다.
        </p>
      </div>

      <div class="badge-row">
        <Badge
          dot
          variant="success"
          shape="pill"
        >
          온라인
        </Badge>

        <Badge
          dot
          variant="warning"
          shape="pill"
        >
          자리비움
        </Badge>

        <Badge
          dot
          variant="danger"
          shape="pill"
        >
          오프라인
        </Badge>

        <Badge
          dot
          variant="info"
          shape="pill"
        >
          새 글
        </Badge>

        <Badge
          dot
          variant="success"
          aria-label="온라인"
        />
      </div>
    </section>

    <!-- 삭제 가능한 Badge 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          삭제 가능한 태그 Badge
        </h2>

        <p class="section__description">
          검색 필터, 선택된 태그, 키워드 목록에서 많이 사용하는 형태입니다.
        </p>
      </div>

      <div class="example-stack">
        <div
          v-if="selectedTags.length > 0"
          class="badge-row"
        >
          <Badge
            v-for="tag in selectedTags"
            :key="tag"
            variant="primary"
            shape="pill"
            removable
            @remove="handleRemoveTag(tag)"
          >
            {{ tag }}
          </Badge>
        </div>

        <p
          v-else
          class="empty-message"
        >
          선택된 태그가 없습니다.
        </p>

        <button
          type="button"
          class="button button--secondary"
          @click="resetTags"
        >
          태그 다시 채우기
        </button>
      </div>
    </section>

    <!-- 클릭 가능한 Badge 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          클릭 가능한 Badge
        </h2>

        <p class="section__description">
          카테고리 필터나 태그 필터처럼 Badge를 선택 요소로 사용할 수 있습니다.
        </p>
      </div>

      <div class="example-stack">
        <div class="badge-row">
          <Badge
            v-for="category in categories"
            :key="category"
            :variant="selectedCategory === category ? 'primary' : 'gray'"
            shape="pill"
            clickable
            @click="selectCategory(category)"
          >
            {{ category }}
          </Badge>
        </div>

        <p class="selected-message">
          현재 선택:
          <strong>{{ selectedCategory }}</strong>
        </p>

        <p
          v-if="clickedBadgeMessage"
          class="selected-message selected-message--sub"
        >
          {{ clickedBadgeMessage }}
        </p>
      </div>
    </section>

    <!-- prefix / suffix 슬롯 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Prefix / Suffix Slot
        </h2>

        <p class="section__description">
          왼쪽 또는 오른쪽에 아이콘, 문자, SVG 컴포넌트를 넣을 수 있습니다.
        </p>
      </div>

      <div class="badge-row">
        <Badge
          variant="success"
          shape="pill"
        >
          <template #prefix>
            ✓
          </template>

          승인 완료
        </Badge>

        <Badge
          variant="info"
          shape="pill"
        >
          진행중

          <template #suffix>
            →
          </template>
        </Badge>

        <Badge
          variant="warning"
          shape="pill"
        >
          <template #prefix>
            ⚠
          </template>

          확인 필요
        </Badge>

        <Badge
          variant="danger"
          shape="pill"
        >
          삭제 예정

          <template #suffix>
            !
          </template>
        </Badge>
      </div>
    </section>

    <!-- disabled 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Disabled
        </h2>

        <p class="section__description">
          클릭, 삭제가 불가능한 비활성 Badge 상태입니다.
        </p>
      </div>

      <div class="badge-row">
        <Badge
          variant="gray"
          disabled
        >
          비활성
        </Badge>

        <Badge
          variant="primary"
          shape="pill"
          removable
          disabled
        >
          삭제 불가
        </Badge>

        <Badge
          variant="info"
          shape="pill"
          clickable
          disabled
          @click="selectCategory('실행되지 않음')"
        >
          클릭 불가
        </Badge>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 48px 24px;
  background: #f8fafc;
  color: #111827;
  box-sizing: border-box;
}

.page__header {
  max-width: 920px;
  margin: 0 auto 32px;
}

.page__eyebrow {
  display: inline-flex;
  margin-bottom: 10px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.page__title {
  margin: 0;
  font-size: 36px;
  line-height: 1.25;
  letter-spacing: -0.03em;
}

.page__description {
  max-width: 720px;
  margin: 12px 0 0;
  color: #4b5563;
  font-size: 16px;
  line-height: 1.7;
}

.section {
  max-width: 920px;
  margin: 0 auto 24px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
}

.section__header {
  margin-bottom: 18px;
}

.section__title {
  margin: 0;
  font-size: 20px;
  line-height: 1.4;
}

.section__description {
  margin: 6px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.example-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.badge-row--center {
  align-items: center;
}

.table-card {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
}

.status-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.status-table th,
.status-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  white-space: nowrap;
}

.status-table th {
  background: #f9fafb;
  color: #374151;
  font-weight: 700;
}

.status-table tr:last-child td {
  border-bottom: 0;
}

.notification-example {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.notification-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 52px;
  height: 52px;

  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #ffffff;

  font-size: 24px;
  cursor: pointer;
}

.notification-button:hover {
  background: #f9fafb;
}

.notification-button__badge {
  position: absolute;
  top: -7px;
  right: -8px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  min-height: 38px;
  padding: 0 14px;

  border: 1px solid transparent;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;
  line-height: 1;

  cursor: pointer;
}

.button--secondary {
  color: #374151;
  background: #ffffff;
  border-color: #d1d5db;
}

.button--secondary:hover {
  background: #f9fafb;
}

.empty-message {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.selected-message {
  margin: 0;
  color: #374151;
  font-size: 14px;
}

.selected-message--sub {
  color: #6b7280;
}

@media (max-width: 640px) {
  .page {
    padding: 32px 16px;
  }

  .page__title {
    font-size: 28px;
  }

  .section {
    padding: 18px;
    border-radius: 14px;
  }

  .notification-example {
    align-items: flex-start;
    flex-direction: column;
  }

  .button-group {
    width: 100%;
  }

  .button {
    width: 100%;
  }
}
</style>