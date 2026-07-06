<script setup lang="ts">
import { computed, ref } from "vue";
import { Drawer } from "/src/components/drawer";

/**
 * Drawer 예제별 열림 상태입니다.
 */
const basicOpen = ref(false);
const menuOpen = ref(false);
const filterOpen = ref(false);
const cartOpen = ref(false);
const noticeOpen = ref(false);
const closeOptionOpen = ref(false);
const escOptionOpen = ref(false);
const noCloseButtonOpen = ref(false);
const noLockScrollOpen = ref(false);

/**
 * 필터 Drawer에서 사용할 상태입니다.
 */
const category = ref("all");
const sort = ref("latest");

/**
 * 필터 초기화 함수입니다.
 */
const handleResetFilter = () => {
  category.value = "all";
  sort.value = "latest";
};

/**
 * 필터 적용 함수입니다.
 */
const handleApplyFilter = () => {
  console.log({
    category: category.value,
    sort: sort.value,
  });

  filterOpen.value = false;
};

/**
 * 왼쪽 메뉴 Drawer에서 메뉴 클릭 후 닫는 함수입니다.
 */
const handleMenuClick = () => {
  menuOpen.value = false;
};

/**
 * 장바구니 아이템 타입입니다.
 */
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

/**
 * 장바구니 예제 데이터입니다.
 */
const cartItems: CartItem[] = [
  {
    id: 1,
    name: "코튼 셔츠",
    price: 39000,
    quantity: 1,
  },
  {
    id: 2,
    name: "와이드 팬츠",
    price: 59000,
    quantity: 2,
  },
  {
    id: 3,
    name: "스니커즈",
    price: 79000,
    quantity: 1,
  },
];

/**
 * 장바구니 총 금액입니다.
 */
const totalPrice = computed(() => {
  return cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

/**
 * 사용자 상세 정보 타입입니다.
 */
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

/**
 * 사용자 상세 Drawer 예제 데이터입니다.
 */
const users: User[] = [
  {
    id: 1,
    name: "홍길동",
    email: "hong@example.com",
    role: "관리자",
  },
  {
    id: 2,
    name: "김철수",
    email: "kim@example.com",
    role: "사용자",
  },
  {
    id: 3,
    name: "이영희",
    email: "lee@example.com",
    role: "운영자",
  },
];

/**
 * 현재 선택된 사용자입니다.
 * 값이 있으면 상세 Drawer가 열립니다.
 */
const selectedUser = ref<User | null>(null);

/**
 * 사용자 상세 Drawer 닫기 함수입니다.
 */
const closeUserDrawer = () => {
  selectedUser.value = null;
};
</script>

<template>
  <main class="drawer-page">
    <header class="drawer-page__header">
      <p class="drawer-page__eyebrow">Vue 3 Drawer</p>

      <h1>Drawer 통합 예제</h1>

      <p>
        기본 Drawer, 왼쪽 메뉴, 필터, 장바구니, 상세 정보, title slot,
        옵션별 사용 예시를 한 화면에서 확인할 수 있습니다.
      </p>
    </header>

    <section class="example-section">
      <h2>기본 사용</h2>

      <div class="example-card">
        <div>
          <h3>오른쪽 Drawer</h3>
          <p>
            가장 기본적인 형태입니다. 오른쪽에서 열리고, 제목과 본문만 사용합니다.
          </p>
        </div>

        <button
          type="button"
          class="example-button"
          @click="basicOpen = true"
        >
          기본 Drawer 열기
        </button>
      </div>

      <Drawer
        v-model:open="basicOpen"
        title="메뉴"
        placement="right"
        size="md"
      >
        <nav class="drawer-menu">
          <a href="/">홈</a>
          <a href="/products">상품</a>
          <a href="/notice">공지사항</a>
          <a href="/mypage">마이페이지</a>
        </nav>
      </Drawer>
    </section>

    <section class="example-section">
      <h2>왼쪽 메뉴 Drawer</h2>

      <div class="example-card">
        <div>
          <h3>모바일 햄버거 메뉴</h3>
          <p>
            왼쪽에서 열리는 메뉴형 Drawer입니다. 메뉴를 클릭하면 Drawer가 닫힙니다.
          </p>
        </div>

        <button
          type="button"
          class="example-button"
          @click="menuOpen = true"
        >
          메뉴 열기
        </button>
      </div>

      <Drawer
        v-model:open="menuOpen"
        title="전체 메뉴"
        placement="left"
        size="sm"
      >
        <nav class="drawer-menu">
          <a
            href="/"
            @click="handleMenuClick"
          >
            홈
          </a>

          <a
            href="/products"
            @click="handleMenuClick"
          >
            상품
          </a>

          <a
            href="/event"
            @click="handleMenuClick"
          >
            이벤트
          </a>

          <a
            href="/customer"
            @click="handleMenuClick"
          >
            고객센터
          </a>
        </nav>
      </Drawer>
    </section>

    <section class="example-section">
      <h2>필터 Drawer</h2>

      <div class="example-card">
        <div>
          <h3>상품 필터</h3>
          <p>
            상품 목록이나 게시판에서 필터 옵션을 선택할 때 사용할 수 있는 구조입니다.
          </p>
        </div>

        <button
          type="button"
          class="example-button"
          @click="filterOpen = true"
        >
          필터 열기
        </button>
      </div>

      <Drawer
        v-model:open="filterOpen"
        title="필터"
        placement="right"
        size="md"
      >
        <div class="filter-form">
          <section class="filter-group">
            <h3>카테고리</h3>

            <label class="radio-item">
              <input
                v-model="category"
                type="radio"
                name="category"
                value="all"
              />
              전체
            </label>

            <label class="radio-item">
              <input
                v-model="category"
                type="radio"
                name="category"
                value="clothes"
              />
              의류
            </label>

            <label class="radio-item">
              <input
                v-model="category"
                type="radio"
                name="category"
                value="shoes"
              />
              신발
            </label>
          </section>

          <section class="filter-group">
            <h3>정렬</h3>

            <label class="radio-item">
              <input
                v-model="sort"
                type="radio"
                name="sort"
                value="latest"
              />
              최신순
            </label>

            <label class="radio-item">
              <input
                v-model="sort"
                type="radio"
                name="sort"
                value="popular"
              />
              인기순
            </label>

            <label class="radio-item">
              <input
                v-model="sort"
                type="radio"
                name="sort"
                value="price-low"
              />
              낮은 가격순
            </label>
          </section>
        </div>

        <template #footer>
          <button
            type="button"
            class="drawer-footer-button drawer-footer-button--secondary"
            @click="handleResetFilter"
          >
            초기화
          </button>

          <button
            type="button"
            class="drawer-footer-button drawer-footer-button--primary"
            @click="handleApplyFilter"
          >
            적용하기
          </button>
        </template>
      </Drawer>
    </section>

    <section class="example-section">
      <h2>장바구니 Drawer</h2>

      <div class="example-card">
        <div>
          <h3>쇼핑몰 장바구니</h3>
          <p>
            장바구니 목록을 보여주고, 하단 고정 영역에서 결제 버튼을 제공합니다.
          </p>
        </div>

        <button
          type="button"
          class="example-button"
          @click="cartOpen = true"
        >
          장바구니 열기
        </button>
      </div>

      <Drawer
        v-model:open="cartOpen"
        title="장바구니"
        placement="right"
        size="md"
      >
        <div class="cart-list">
          <article
            v-for="item in cartItems"
            :key="item.id"
            class="cart-item"
          >
            <strong>{{ item.name }}</strong>

            <p>
              {{ item.price.toLocaleString() }}원 / 수량 {{ item.quantity }}
            </p>
          </article>
        </div>

        <template #footer>
          <button
            type="button"
            class="drawer-footer-button drawer-footer-button--primary"
          >
            {{ totalPrice.toLocaleString() }}원 결제하기
          </button>
        </template>
      </Drawer>
    </section>

    <section class="example-section">
      <h2>상세 정보 Drawer</h2>

      <div class="example-card example-card--column">
        <div>
          <h3>리스트 상세 보기</h3>
          <p>
            목록에서 항목을 선택하면 선택된 데이터 기준으로 Drawer가 열립니다.
          </p>
        </div>

        <ul class="user-list">
          <li
            v-for="user in users"
            :key="user.id"
          >
            <span>
              {{ user.name }}
              <small>{{ user.email }}</small>
            </span>

            <button
              type="button"
              class="example-button example-button--small"
              @click="selectedUser = user"
            >
              상세 보기
            </button>
          </li>
        </ul>
      </div>

      <Drawer
        :open="Boolean(selectedUser)"
        title="사용자 상세"
        placement="right"
        size="md"
        @update:open="(value) => !value && closeUserDrawer()"
        @close="closeUserDrawer"
      >
        <dl
          v-if="selectedUser"
          class="detail-list"
        >
          <div>
            <dt>이름</dt>
            <dd>{{ selectedUser.name }}</dd>
          </div>

          <div>
            <dt>이메일</dt>
            <dd>{{ selectedUser.email }}</dd>
          </div>

          <div>
            <dt>권한</dt>
            <dd>{{ selectedUser.role }}</dd>
          </div>
        </dl>

        <template #footer>
          <button
            type="button"
            class="drawer-footer-button drawer-footer-button--secondary"
            @click="closeUserDrawer"
          >
            닫기
          </button>

          <button
            type="button"
            class="drawer-footer-button drawer-footer-button--primary"
          >
            수정하기
          </button>
        </template>
      </Drawer>
    </section>

    <section class="example-section">
      <h2>title slot 사용</h2>

      <div class="example-card">
        <div>
          <h3>제목 안에 배지 넣기</h3>
          <p>
            단순 문자열 제목이 아니라 배지, 아이콘 같은 UI가 필요할 때 title slot을 사용합니다.
          </p>
        </div>

        <button
          type="button"
          class="example-button"
          @click="noticeOpen = true"
        >
          알림 열기
        </button>
      </div>

      <Drawer
        v-model:open="noticeOpen"
        placement="right"
        size="sm"
      >
        <template #title>
          알림
          <span class="title-badge">3</span>
        </template>

        <div class="notice-list">
          <article>
            <strong>주문이 완료되었습니다.</strong>
            <p>주문 내역에서 배송 상태를 확인할 수 있습니다.</p>
          </article>

          <article>
            <strong>쿠폰이 발급되었습니다.</strong>
            <p>마이페이지에서 사용 가능한 쿠폰을 확인하세요.</p>
          </article>

          <article>
            <strong>문의 답변이 등록되었습니다.</strong>
            <p>고객센터에서 답변 내용을 확인할 수 있습니다.</p>
          </article>
        </div>
      </Drawer>
    </section>

    <section class="example-section">
      <h2>옵션별 사용</h2>

      <div class="option-grid">
        <article class="option-card">
          <h3>Dim 클릭 닫기 비활성화</h3>
          <p>
            배경을 클릭해도 Drawer가 닫히지 않습니다.
          </p>

          <button
            type="button"
            class="example-button"
            @click="closeOptionOpen = true"
          >
            열기
          </button>
        </article>

        <article class="option-card">
          <h3>ESC 닫기 비활성화</h3>
          <p>
            ESC 키를 눌러도 Drawer가 닫히지 않습니다.
          </p>

          <button
            type="button"
            class="example-button"
            @click="escOptionOpen = true"
          >
            열기
          </button>
        </article>

        <article class="option-card">
          <h3>닫기 버튼 숨김</h3>
          <p>
            헤더의 닫기 버튼을 표시하지 않습니다.
          </p>

          <button
            type="button"
            class="example-button"
            @click="noCloseButtonOpen = true"
          >
            열기
          </button>
        </article>

        <article class="option-card">
          <h3>스크롤 잠금 해제</h3>
          <p>
            Drawer가 열려도 body 스크롤을 잠그지 않습니다.
          </p>

          <button
            type="button"
            class="example-button"
            @click="noLockScrollOpen = true"
          >
            열기
          </button>
        </article>
      </div>

      <Drawer
        v-model:open="closeOptionOpen"
        title="Dim 클릭 닫기 비활성화"
        placement="right"
        size="sm"
        :close-on-dim="false"
      >
        <p>
          이 Drawer는 배경 영역을 클릭해도 닫히지 않습니다.
        </p>

        <p>
          닫기 버튼이나 ESC 키를 사용해서 닫을 수 있습니다.
        </p>
      </Drawer>

      <Drawer
        v-model:open="escOptionOpen"
        title="ESC 닫기 비활성화"
        placement="right"
        size="sm"
        :close-on-esc="false"
      >
        <p>
          이 Drawer는 ESC 키를 눌러도 닫히지 않습니다.
        </p>

        <p>
          닫기 버튼이나 배경 클릭으로 닫을 수 있습니다.
        </p>
      </Drawer>

      <Drawer
        v-model:open="noCloseButtonOpen"
        title="닫기 버튼 숨김"
        placement="right"
        size="sm"
        :show-close-button="false"
      >
        <p>
          이 Drawer는 헤더에 닫기 버튼이 없습니다.
        </p>

        <button
          type="button"
          class="example-button"
          @click="noCloseButtonOpen = false"
        >
          직접 닫기
        </button>
      </Drawer>

      <Drawer
        v-model:open="noLockScrollOpen"
        title="스크롤 잠금 해제"
        placement="right"
        size="sm"
        :lock-scroll="false"
      >
        <p>
          이 Drawer는 열려도 배경 페이지의 스크롤을 막지 않습니다.
        </p>

        <p>
          긴 페이지에서 Drawer와 배경 스크롤 동작을 비교할 때 확인할 수 있습니다.
        </p>
      </Drawer>
    </section>
  </main>
</template>

<style scoped>
.drawer-page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 24px 80px;

  color: #111827;
}

.drawer-page__header {
  margin-bottom: 40px;
}

.drawer-page__eyebrow {
  margin: 0 0 8px;

  color: #2563eb;

  font-size: 14px;
  font-weight: 700;
}

.drawer-page__header h1 {
  margin: 0;

  font-size: 36px;
  line-height: 1.25;
}

.drawer-page__header p {
  max-width: 720px;
  margin: 16px 0 0;

  color: #6b7280;

  font-size: 16px;
  line-height: 1.7;
}

.example-section {
  margin-top: 32px;
}

.example-section h2 {
  margin: 0 0 16px;

  font-size: 24px;
  line-height: 1.35;
}

.example-card,
.option-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 16px;

  background: #ffffff;

  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.example-card--column {
  align-items: stretch;
  flex-direction: column;
}

.example-card h3,
.option-card h3 {
  margin: 0;

  font-size: 18px;
  line-height: 1.4;
}

.example-card p,
.option-card p {
  margin: 8px 0 0;

  color: #6b7280;

  font-size: 14px;
  line-height: 1.6;
}

.option-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.option-card {
  align-items: flex-start;
  flex-direction: column;
}

.example-button,
.drawer-footer-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 40px;
  padding: 0 16px;

  border: 0;
  border-radius: 10px;

  background: #111827;
  color: #ffffff;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;
  white-space: nowrap;
}

.example-button:hover,
.drawer-footer-button--primary:hover {
  background: #374151;
}

.example-button:focus-visible,
.drawer-footer-button:focus-visible {
  outline: 2px solid #111827;
  outline-offset: 2px;
}

.example-button--small {
  min-height: 34px;
  padding: 0 12px;

  font-size: 13px;
}

.drawer-footer-button {
  width: 100%;
}

.drawer-footer-button--secondary {
  border: 1px solid #d1d5db;

  background: #ffffff;
  color: #111827;
}

.drawer-footer-button--secondary:hover {
  background: #f3f4f6;
}

.drawer-footer-button--primary {
  background: #111827;
  color: #ffffff;
}

.drawer-menu {
  display: grid;
  gap: 4px;
}

.drawer-menu a {
  display: flex;
  align-items: center;

  min-height: 44px;
  padding: 0 12px;

  border-radius: 8px;

  color: #111827;
  text-decoration: none;
}

.drawer-menu a:hover {
  background: #f3f4f6;
}

.filter-form {
  display: grid;
  gap: 24px;
}

.filter-group h3 {
  margin: 0 0 12px;

  font-size: 16px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;

  min-height: 36px;

  color: #374151;

  font-size: 14px;
}

.cart-list {
  display: grid;
  gap: 16px;
}

.cart-item {
  padding: 16px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.cart-item strong {
  display: block;

  font-size: 15px;
}

.cart-item p {
  margin: 8px 0 0;

  color: #6b7280;

  font-size: 14px;
}

.user-list {
  display: grid;
  gap: 8px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.user-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 14px 16px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background: #f9fafb;
}

.user-list span {
  display: grid;
  gap: 4px;

  font-weight: 700;
}

.user-list small {
  color: #6b7280;

  font-size: 13px;
  font-weight: 400;
}

.detail-list {
  display: grid;
  gap: 16px;

  margin: 0;
}

.detail-list div {
  display: grid;
  gap: 6px;

  padding-bottom: 16px;

  border-bottom: 1px solid #e5e7eb;
}

.detail-list dt {
  color: #6b7280;

  font-size: 13px;
  font-weight: 700;
}

.detail-list dd {
  margin: 0;

  color: #111827;

  font-size: 15px;
}

.title-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 22px;
  height: 22px;
  margin-left: 8px;
  padding: 0 7px;

  border-radius: 999px;

  background: #2563eb;
  color: #ffffff;

  font-size: 12px;
  font-weight: 700;
}

.notice-list {
  display: grid;
  gap: 12px;
}

.notice-list article {
  padding: 16px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background: #f9fafb;
}

.notice-list strong {
  display: block;

  font-size: 14px;
}

.notice-list p {
  margin: 8px 0 0;

  color: #6b7280;

  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .drawer-page {
    padding: 28px 16px 64px;
  }

  .drawer-page__header h1 {
    font-size: 28px;
  }

  .example-card {
    align-items: stretch;
    flex-direction: column;
  }

  .option-grid {
    grid-template-columns: 1fr;
  }

  .example-button {
    width: 100%;
  }

  .user-list li {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>