<script setup lang="ts">
import { ref } from "vue";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "/src/components/breadcrumb";

/**
 * Breadcrumb 배열 데이터 타입입니다.
 * 별도 index.ts에서 타입을 export하지 않는 경우
 * App.vue 안에서 직접 선언해서 사용할 수 있습니다.
 */
type BreadcrumbItemData = {
  /**
   * 화면에 표시할 텍스트입니다.
   */
  label: string;

  /**
   * 이동할 주소입니다.
   */
  href?: string;

  /**
   * 현재 페이지 여부입니다.
   */
  current?: boolean;

  /**
   * 비활성 여부입니다.
   */
  disabled?: boolean;
};

/**
 * 기본 배열 데이터 방식 예제입니다.
 */
const basicItems: BreadcrumbItemData[] = [
  {
    label: "홈",
    href: "/",
  },
  {
    label: "게시판",
    href: "/board",
  },
  {
    label: "공지사항",
    href: "/board/notice",
  },
  {
    label: "공지사항 상세",
  },
];

/**
 * 쇼핑몰 상품 상세 페이지 예제입니다.
 */
const productItems: BreadcrumbItemData[] = [
  {
    label: "홈",
    href: "/",
  },
  {
    label: "상품",
    href: "/products",
  },
  {
    label: "디지털",
    href: "/products/digital",
  },
  {
    label: "노트북",
    href: "/products/digital/laptop",
  },
  {
    label: "프리미엄 고성능 노트북 상세",
  },
];

/**
 * 관리자 페이지 Breadcrumb 예제입니다.
 */
const adminItems: BreadcrumbItemData[] = [
  {
    label: "관리자",
    href: "/admin",
  },
  {
    label: "회원 관리",
    href: "/admin/users",
  },
  {
    label: "회원 상세",
  },
];

/**
 * 마이페이지 Breadcrumb 예제입니다.
 */
const mypageItems: BreadcrumbItemData[] = [
  {
    label: "홈",
    href: "/",
  },
  {
    label: "마이페이지",
    href: "/mypage",
  },
  {
    label: "주문 내역",
    href: "/mypage/orders",
  },
  {
    label: "주문 상세",
  },
];

/**
 * 일부 항목이 비활성인 Breadcrumb 예제입니다.
 */
const disabledItems: BreadcrumbItemData[] = [
  {
    label: "홈",
    href: "/",
  },
  {
    label: "설정",
    href: "/settings",
  },
  {
    label: "접근 제한 메뉴",
    disabled: true,
  },
  {
    label: "현재 페이지",
  },
];

/**
 * 긴 텍스트 말줄임 예제입니다.
 */
const longTextItems: BreadcrumbItemData[] = [
  {
    label: "홈",
    href: "/",
  },
  {
    label: "상품",
    href: "/products",
  },
  {
    label: "2026년 신상품 프리미엄 고성능 노트북 상세 페이지",
  },
];

/**
 * 현재 선택된 예제 타입입니다.
 */
const selectedExample = ref("상품 상세");

/**
 * 예제 선택 목록입니다.
 */
const exampleTabs = [
  "상품 상세",
  "관리자",
  "마이페이지",
  "비활성",
];

/**
 * 선택된 예제에 따라 Breadcrumb items를 변경합니다.
 */
const getSelectedItems = () => {
  if (selectedExample.value === "관리자") {
    return adminItems;
  }

  if (selectedExample.value === "마이페이지") {
    return mypageItems;
  }

  if (selectedExample.value === "비활성") {
    return disabledItems;
  }

  return productItems;
};
</script>

<template>
  <main class="page">
    <header class="page__header">
      <span class="page__eyebrow">
        Vue UI Component
      </span>

      <h1 class="page__title">
        Breadcrumb 컴포넌트 예제
      </h1>

      <p class="page__description">
        Breadcrumb의 배열 데이터 방식, 직접 조합 방식, 구분자 변경, 긴 텍스트 말줄임, 관리자 페이지, 쇼핑몰, 마이페이지, 비활성 항목 예제를 한 페이지에서 확인할 수 있습니다.
      </p>
    </header>

    <!-- 배열 데이터 기반 기본 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          배열 데이터 기반 Breadcrumb
        </h2>

        <p class="section__description">
          서버 데이터, 메뉴 데이터, 라우터 정보 등을 배열로 가공해서 렌더링하는 방식입니다.
        </p>
      </div>

      <div class="preview-box">
        <Breadcrumb :items="basicItems" />
      </div>

      <div class="code-note">
        마지막 항목은 current를 직접 넣지 않아도 현재 페이지로 처리됩니다.
      </div>
    </section>

    <!-- 직접 조합 방식 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          직접 조합 방식
        </h2>

        <p class="section__description">
          각 항목을 직접 작성해야 하거나, 항목마다 복잡한 구조가 필요한 경우 사용할 수 있습니다.
        </p>
      </div>

      <div class="preview-box">
        <Breadcrumb>
          <BreadcrumbItem href="/">
            홈
          </BreadcrumbItem>

          <BreadcrumbItem href="/products">
            상품
          </BreadcrumbItem>

          <BreadcrumbItem href="/products/laptop">
            노트북
          </BreadcrumbItem>

          <BreadcrumbItem current>
            맥북 프로
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </section>

    <!-- 구분자 변경 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          구분자 변경
        </h2>

        <p class="section__description">
          기본 구분자 / 대신 ›, &gt;, · 같은 문자를 사용할 수 있습니다.
        </p>
      </div>

      <div class="example-stack">
        <div class="preview-box">
          <p class="preview-label">
            separator="/"
          </p>

          <Breadcrumb
            :items="productItems"
            separator="/"
          />
        </div>

        <div class="preview-box">
          <p class="preview-label">
            separator="›"
          </p>

          <Breadcrumb
            :items="productItems"
            separator="›"
          />
        </div>

        <div class="preview-box">
          <p class="preview-label">
            separator=">"
          </p>

          <Breadcrumb
            :items="productItems"
            separator=">"
          />
        </div>

        <div class="preview-box">
          <p class="preview-label">
            separator="·"
          </p>

          <Breadcrumb
            :items="productItems"
            separator="·"
          />
        </div>
      </div>
    </section>

    <!-- 긴 텍스트 말줄임 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          긴 텍스트 말줄임
        </h2>

        <p class="section__description">
          상품명, 게시글 제목, 상세 페이지 제목이 길어질 때 Breadcrumb가 화면을 넘치지 않도록 처리합니다.
        </p>
      </div>

      <div class="preview-box preview-box--narrow">
        <Breadcrumb
          class="breadcrumb--ellipsis"
          :items="longTextItems"
          separator="›"
        />
      </div>
    </section>

    <!-- 관리자 페이지 헤더 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          관리자 페이지 헤더
        </h2>

        <p class="section__description">
          페이지 제목 위에 Breadcrumb를 배치하는 관리자 화면 예제입니다.
        </p>
      </div>

      <div class="admin-header">
        <Breadcrumb
          :items="adminItems"
          separator="›"
        />

        <div class="admin-header__main">
          <div>
            <h3 class="admin-header__title">
              회원 상세
            </h3>

            <p class="admin-header__description">
              회원의 기본 정보, 주문 내역, 문의 내역을 확인할 수 있습니다.
            </p>
          </div>

          <div class="admin-header__actions">
            <button
              type="button"
              class="button button--secondary"
            >
              목록
            </button>

            <button
              type="button"
              class="button button--primary"
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 쇼핑몰 상품 상세 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          쇼핑몰 상품 상세
        </h2>

        <p class="section__description">
          카테고리 깊이가 있는 상품 상세 페이지에서 사용하는 Breadcrumb 예제입니다.
        </p>
      </div>

      <div class="product-card">
        <Breadcrumb
          class="breadcrumb--ellipsis"
          :items="productItems"
          separator="›"
        />

        <div class="product-card__body">
          <div class="product-card__image">
            이미지
          </div>

          <div class="product-card__content">
            <span class="product-card__category">
              디지털 / 노트북
            </span>

            <h3 class="product-card__title">
              프리미엄 고성능 노트북
            </h3>

            <p class="product-card__description">
              작업, 디자인, 개발 환경에 적합한 고성능 노트북 상품 상세 화면 예제입니다.
            </p>

            <strong class="product-card__price">
              1,890,000원
            </strong>
          </div>
        </div>
      </div>
    </section>

    <!-- 선택형 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          데이터 변경 예제
        </h2>

        <p class="section__description">
          선택한 메뉴에 따라 Breadcrumb 데이터가 변경되는 예제입니다.
        </p>
      </div>

      <div class="example-stack">
        <div class="tab-list">
          <button
            v-for="tab in exampleTabs"
            :key="tab"
            type="button"
            class="tab-button"
            :class="{
              'tab-button--active': selectedExample === tab,
            }"
            @click="selectedExample = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div class="preview-box">
          <Breadcrumb
            :items="getSelectedItems()"
            separator="›"
          />
        </div>
      </div>
    </section>

    <!-- 비활성 항목 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          비활성 항목
        </h2>

        <p class="section__description">
          접근할 수 없는 중간 경로나 링크가 없는 경로는 disabled 상태로 표시할 수 있습니다.
        </p>
      </div>

      <div class="preview-box">
        <Breadcrumb
          :items="disabledItems"
          separator="›"
        />
      </div>
    </section>

    <!-- 외부 링크 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          외부 링크 포함
        </h2>

        <p class="section__description">
          target="_blank"를 사용할 때 rel이 없으면 컴포넌트에서 보안 속성을 보완하도록 구성할 수 있습니다.
        </p>
      </div>

      <div class="preview-box">
        <Breadcrumb separator="›">
          <BreadcrumbItem href="/">
            홈
          </BreadcrumbItem>

          <BreadcrumbItem
            href="https://example.com"
            target="_blank"
          >
            외부 문서
          </BreadcrumbItem>

          <BreadcrumbItem current>
            현재 페이지
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </section>

    <!-- 사이즈 클래스 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          크기 클래스 예제
        </h2>

        <p class="section__description">
          컴포넌트 props를 늘리지 않고 class로 sm, lg 크기를 적용하는 예제입니다.
        </p>
      </div>

      <div class="example-stack">
        <div class="preview-box">
          <p class="preview-label">
            small
          </p>

          <Breadcrumb
            class="breadcrumb--sm"
            :items="basicItems"
            separator="›"
          />
        </div>

        <div class="preview-box">
          <p class="preview-label">
            default
          </p>

          <Breadcrumb
            :items="basicItems"
            separator="›"
          />
        </div>

        <div class="preview-box">
          <p class="preview-label">
            large
          </p>

          <Breadcrumb
            class="breadcrumb--lg"
            :items="basicItems"
            separator="›"
          />
        </div>
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
  display: grid;
  gap: 14px;
}

.preview-box {
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #f9fafb;
  box-sizing: border-box;
}

.preview-box--narrow {
  max-width: 460px;
}

.preview-label {
  margin: 0 0 10px;
  color: #6b7280;
  font-size: 13px;
  font-weight: 700;
}

.code-note {
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 14px;
  line-height: 1.6;
}

.admin-header {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #f9fafb;
}

.admin-header__main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.admin-header__title {
  margin: 0;
  font-size: 26px;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.admin-header__description {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.admin-header__actions {
  display: flex;
  gap: 8px;
  flex: 0 0 auto;
}

.product-card {
  display: grid;
  gap: 16px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #ffffff;
}

.product-card__body {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 20px;
  align-items: center;
}

.product-card__image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  border-radius: 14px;
  background: #e5e7eb;
  color: #6b7280;
  font-size: 14px;
  font-weight: 700;
}

.product-card__content {
  min-width: 0;
}

.product-card__category {
  display: inline-flex;
  margin-bottom: 8px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
}

.product-card__title {
  margin: 0;
  font-size: 24px;
  line-height: 1.35;
}

.product-card__description {
  margin: 8px 0 14px;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.product-card__price {
  display: block;
  color: #111827;
  font-size: 22px;
  line-height: 1.3;
}

.tab-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tab-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 36px;
  padding: 0 14px;

  border: 1px solid #d1d5db;
  border-radius: 999px;
  background: #ffffff;
  color: #374151;

  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.tab-button:hover {
  background: #f9fafb;
}

.tab-button--active {
  border-color: #2563eb;
  background: #eff6ff;
  color: #1d4ed8;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 38px;
  padding: 0 14px;

  border: 1px solid transparent;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;
  line-height: 1;

  cursor: pointer;
  box-sizing: border-box;
}

.button--primary {
  color: #ffffff;
  background: #2563eb;
  border-color: #2563eb;
}

.button--primary:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

.button--secondary {
  color: #374151;
  background: #ffffff;
  border-color: #d1d5db;
}

.button--secondary:hover {
  background: #f9fafb;
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

  .admin-header__main {
    flex-direction: column;
  }

  .admin-header__actions {
    width: 100%;
    flex-direction: column;
  }

  .product-card__body {
    grid-template-columns: 1fr;
  }

  .button {
    width: 100%;
  }

  .tab-button {
    flex: 1 1 auto;
  }
}
</style>