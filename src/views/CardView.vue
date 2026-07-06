<script setup lang="ts">
import { computed, ref } from "vue";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
  CardMedia,
} from "/src/components/card";

/**
 * 상품 데이터 타입입니다.
 */
type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

/**
 * 결제 수단 타입입니다.
 */
type PaymentMethod = {
  id: string;
  title: string;
  description: string;
};

/**
 * 카드 클릭 결과 메시지입니다.
 */
const clickMessage = ref("");

/**
 * 현재 선택된 결제 수단입니다.
 */
const selectedPaymentId = ref("card");

/**
 * 현재 선택된 상품 id입니다.
 */
const selectedProductId = ref<number | null>(1);

/**
 * 좋아요 상태입니다.
 */
const liked = ref(false);

/**
 * 결제 수단 목록입니다.
 */
const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    title: "신용카드",
    description: "일반 카드 결제",
  },
  {
    id: "bank",
    title: "무통장 입금",
    description: "계좌 입금 방식",
  },
  {
    id: "kakao",
    title: "카카오페이",
    description: "간편 결제",
  },
];

/**
 * 상품 카드 리스트 예제에 사용할 데이터입니다.
 */
const products: Product[] = [
  {
    id: 1,
    name: "코튼 셔츠",
    description: "데일리로 입기 좋은 기본 셔츠입니다.",
    price: "39,000원",
    image: "https://picsum.photos/id/10/600/400",
  },
  {
    id: 2,
    name: "린넨 자켓",
    description: "가볍게 걸치기 좋은 자켓입니다.",
    price: "89,000원",
    image: "https://picsum.photos/id/20/600/400",
  },
  {
    id: 3,
    name: "와이드 팬츠",
    description: "편안한 핏의 데일리 팬츠입니다.",
    price: "59,000원",
    image: "https://picsum.photos/id/30/600/400",
  },
];

/**
 * 대시보드 통계 카드 데이터입니다.
 */
const stats = [
  {
    id: "sales",
    label: "이번 달 매출",
    value: "12,450,000원",
    description: "지난달 대비 12% 증가",
    icon: "₩",
  },
  {
    id: "users",
    label: "신규 회원",
    value: "1,248명",
    description: "이번 주 156명 증가",
    icon: "👤",
  },
  {
    id: "orders",
    label: "주문 수",
    value: "328건",
    description: "처리 대기 24건",
    icon: "🛒",
  },
];

/**
 * 선택된 상품 정보를 계산합니다.
 */
const selectedProduct = computed(() => {
  return products.find((product) => {
    return product.id === selectedProductId.value;
  });
});

/**
 * 카드 클릭 예제 함수입니다.
 */
const handleCardClick = (message: string) => {
  clickMessage.value = message;
};

/**
 * 결제 수단 선택 함수입니다.
 */
const selectPaymentMethod = (id: string) => {
  selectedPaymentId.value = id;
  clickMessage.value = `${id} 결제 수단을 선택했습니다.`;
};

/**
 * 상품 선택 함수입니다.
 */
const selectProduct = (product: Product) => {
  selectedProductId.value = product.id;
  clickMessage.value = `${product.name} 상품을 선택했습니다.`;
};

/**
 * 좋아요 상태를 변경합니다.
 */
const toggleLike = () => {
  liked.value = !liked.value;
};

/**
 * 카드 액션 버튼 클릭 예제입니다.
 */
const handleAction = (action: string) => {
  clickMessage.value = `${action} 버튼을 클릭했습니다.`;
};
</script>

<template>
  <main class="page">
    <header class="page__header">
      <span class="page__eyebrow">
        Vue UI Component
      </span>

      <h1 class="page__title">
        Card 컴포넌트 예제
      </h1>

      <p class="page__description">
        Card의 조합형 구조, variant, padding, radius, media, header extra, footer 정렬,
        상품 카드, 게시글 카드, 통계 카드, 선택 가능한 카드 예제를 한 페이지에서 확인할 수 있습니다.
      </p>
    </header>

    <!-- 기본 카드 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          기본 Card
        </h2>

        <p class="section__description">
          CardHeader, CardBody, CardFooter를 조합하는 기본 예제입니다.
        </p>
      </div>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>
            카드 제목
          </CardTitle>

          <CardDescription>
            카드에 대한 간단한 설명입니다.
          </CardDescription>
        </CardHeader>

        <CardBody>
          <p class="content-text">
            이 영역에는 카드의 주요 콘텐츠가 들어갑니다. 알림, 안내, 설정, 요약 정보 등 다양한 내용을 넣을 수 있습니다.
          </p>
        </CardBody>

        <CardFooter>
          <button
            type="button"
            class="button button--secondary"
            @click="handleAction('취소')"
          >
            취소
          </button>

          <button
            type="button"
            class="button button--primary"
            @click="handleAction('확인')"
          >
            확인
          </button>
        </CardFooter>
      </Card>
    </section>

    <!-- variant 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Variant
        </h2>

        <p class="section__description">
          default, outlined, elevated 스타일을 비교하는 예제입니다.
        </p>
      </div>

      <div class="card-grid card-grid--three">
        <Card variant="default">
          <CardHeader>
            <CardTitle>
              Default
            </CardTitle>

            <CardDescription>
              기본 테두리 카드입니다.
            </CardDescription>
          </CardHeader>

          <CardBody>
            <p class="content-text">
              일반적인 정보 표시에 적합합니다.
            </p>
          </CardBody>
        </Card>

        <Card variant="outlined">
          <CardHeader>
            <CardTitle>
              Outlined
            </CardTitle>

            <CardDescription>
              테두리가 강조된 카드입니다.
            </CardDescription>
          </CardHeader>

          <CardBody>
            <p class="content-text">
              구분이 필요한 영역에 사용할 수 있습니다.
            </p>
          </CardBody>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>
              Elevated
            </CardTitle>

            <CardDescription>
              그림자가 강조된 카드입니다.
            </CardDescription>
          </CardHeader>

          <CardBody>
            <p class="content-text">
              시각적으로 떠 있는 느낌을 줄 수 있습니다.
            </p>
          </CardBody>
        </Card>
      </div>
    </section>

    <!-- padding / radius 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Padding / Radius
        </h2>

        <p class="section__description">
          카드 내부 여백과 모서리 둥글기를 조정하는 예제입니다.
        </p>
      </div>

      <div class="card-grid card-grid--two">
        <Card
          padding="sm"
          radius="sm"
          variant="outlined"
        >
          <CardHeader>
            <CardTitle>
              padding sm / radius sm
            </CardTitle>

            <CardDescription>
              작은 여백과 작은 radius입니다.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          padding="lg"
          radius="lg"
          variant="outlined"
        >
          <CardHeader>
            <CardTitle>
              padding lg / radius lg
            </CardTitle>

            <CardDescription>
              넓은 여백과 큰 radius입니다.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>

    <!-- Header extra 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Header Extra Slot
        </h2>

        <p class="section__description">
          CardHeader의 #extra 슬롯을 사용해 우측에 상태 배지나 더보기 버튼을 배치합니다.
        </p>
      </div>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>
            회원 정보
          </CardTitle>

          <CardDescription>
            최근 로그인: 2026.07.01
          </CardDescription>

          <template #extra>
            <button
              type="button"
              class="icon-button"
              aria-label="더보기"
              @click="handleAction('더보기')"
            >
              ⋯
            </button>
          </template>
        </CardHeader>

        <CardBody>
          <div class="profile-summary">
            <div class="avatar">
              SM
            </div>

            <div>
              <p class="profile-summary__name">
                성민
              </p>

              <p class="profile-summary__text">
                UI 컴포넌트 예제 페이지를 구성하고 있습니다.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>

    <!-- 상품 카드 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          상품 Card
        </h2>

        <p class="section__description">
          CardMedia, CardBody, CardFooter를 조합한 상품 카드 예제입니다.
        </p>
      </div>

      <div class="product-layout">
        <Card
          padding="none"
          variant="outlined"
          clickable
          :selected="selectedProductId === 1"
          @click="selectProduct(products[0])"
        >
          <CardMedia
            :src="products[0].image"
            :alt="products[0].name"
            ratio="wide"
          />

          <CardBody class="product-card__body">
            <CardTitle as="h3">
              {{ products[0].name }}
            </CardTitle>

            <CardDescription>
              {{ products[0].description }}
            </CardDescription>

            <strong class="product-card__price">
              {{ products[0].price }}
            </strong>
          </CardBody>

          <CardFooter
            align="between"
            class="product-card__footer"
          >
            <button
              type="button"
              class="button button--secondary"
              @click.stop="handleAction('장바구니')"
            >
              장바구니
            </button>

            <button
              type="button"
              class="button button--primary"
              @click.stop="handleAction('구매하기')"
            >
              구매하기
            </button>
          </CardFooter>
        </Card>

        <div class="selected-box">
          <p class="selected-box__label">
            선택된 상품
          </p>

          <strong>
            {{ selectedProduct?.name ?? "선택 없음" }}
          </strong>
        </div>
      </div>
    </section>

    <!-- 게시글 카드 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          게시글 Card
        </h2>

        <p class="section__description">
          게시글 목록이나 블로그 카드에서 사용할 수 있는 예제입니다.
        </p>
      </div>

      <Card
        variant="elevated"
        clickable
        @click="handleCardClick('게시글 상세 페이지로 이동합니다.')"
      >
        <CardHeader>
          <CardTitle>
            Vue에서 조합형 Card 컴포넌트 만들기
          </CardTitle>

          <CardDescription>
            2026.07.01 · UI Component
          </CardDescription>

          <template #extra>
            <span class="badge">
              Vue
            </span>
          </template>
        </CardHeader>

        <CardBody>
          <p class="content-text">
            Card 컴포넌트는 상품, 게시글, 프로필, 대시보드 등 다양한 UI에서 반복적으로 사용됩니다.
          </p>
        </CardBody>

        <CardFooter align="left">
          <button
            type="button"
            class="button button--outline"
            @click.stop="handleAction('자세히 보기')"
          >
            자세히 보기
          </button>
        </CardFooter>
      </Card>
    </section>

    <!-- 대시보드 통계 카드 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          대시보드 통계 Card
        </h2>

        <p class="section__description">
          관리자 대시보드에서 자주 사용하는 통계 카드 예제입니다.
        </p>
      </div>

      <div class="card-grid card-grid--three">
        <Card
          v-for="stat in stats"
          :key="stat.id"
          variant="outlined"
        >
          <CardHeader>
            <CardDescription>
              {{ stat.label }}
            </CardDescription>

            <template #extra>
              <div class="stat-icon">
                {{ stat.icon }}
              </div>
            </template>
          </CardHeader>

          <CardBody>
            <CardTitle as="h2">
              {{ stat.value }}
            </CardTitle>

            <p class="stat-increase">
              {{ stat.description }}
            </p>
          </CardBody>
        </Card>
      </div>
    </section>

    <!-- 선택 가능한 카드 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          선택 가능한 Card
        </h2>

        <p class="section__description">
          결제 수단, 배송지, 옵션 선택 UI에서 사용할 수 있는 카드 선택 예제입니다.
        </p>
      </div>

      <div class="payment-list">
        <Card
          v-for="item in paymentMethods"
          :key="item.id"
          clickable
          :selected="selectedPaymentId === item.id"
          @click="selectPaymentMethod(item.id)"
        >
          <CardHeader>
            <CardTitle>
              {{ item.title }}
            </CardTitle>

            <CardDescription>
              {{ item.description }}
            </CardDescription>

            <template #extra>
              <input
                type="radio"
                name="payment"
                :checked="selectedPaymentId === item.id"
                :aria-label="item.title"
                @change="selectPaymentMethod(item.id)"
                @click.stop
              />
            </template>
          </CardHeader>
        </Card>
      </div>
    </section>

    <!-- 카드 리스트 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Card List
        </h2>

        <p class="section__description">
          여러 개의 상품 데이터를 카드 리스트로 렌더링하는 예제입니다.
        </p>
      </div>

      <div class="product-card-list">
        <Card
          v-for="product in products"
          :key="product.id"
          padding="none"
          variant="outlined"
          clickable
          :selected="selectedProductId === product.id"
          @click="selectProduct(product)"
        >
          <CardMedia
            :src="product.image"
            :alt="product.name"
            ratio="wide"
          />

          <CardBody class="product-card__body">
            <CardTitle>
              {{ product.name }}
            </CardTitle>

            <CardDescription>
              {{ product.description }}
            </CardDescription>

            <strong class="product-card__price">
              {{ product.price }}
            </strong>
          </CardBody>
        </Card>
      </div>
    </section>

    <!-- 이미지 fallback 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          이미지 Fallback
        </h2>

        <p class="section__description">
          이미지 주소가 없을 때 fallback 슬롯으로 대체 콘텐츠를 보여주는 예제입니다.
        </p>
      </div>

      <div class="card-grid card-grid--two">
        <Card
          padding="none"
          variant="outlined"
        >
          <CardMedia
            alt="상품 이미지"
            ratio="wide"
          >
            <template #fallback>
              상품 이미지 준비중
            </template>
          </CardMedia>

          <CardBody class="product-card__body">
            <CardTitle>
              이미지 없는 상품
            </CardTitle>

            <CardDescription>
              fallback 슬롯이 표시됩니다.
            </CardDescription>
          </CardBody>
        </Card>

        <Card
          padding="none"
          variant="outlined"
        >
          <CardMedia
            ratio="video"
          >
            <template #fallback>
              영상 썸네일 준비중
            </template>
          </CardMedia>

          <CardBody class="product-card__body">
            <CardTitle>
              영상 카드
            </CardTitle>

            <CardDescription>
              16:9 비율 fallback 예제입니다.
            </CardDescription>
          </CardBody>
        </Card>
      </div>
    </section>

    <!-- disabled 카드 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Disabled Card
        </h2>

        <p class="section__description">
          비활성화된 카드는 클릭 이벤트를 실행하지 않습니다.
        </p>
      </div>

      <Card
        variant="outlined"
        clickable
        disabled
        @click="handleCardClick('이 메시지는 실행되면 안 됩니다.')"
      >
        <CardHeader>
          <CardTitle>
            비활성 카드
          </CardTitle>

          <CardDescription>
            disabled 상태에서는 클릭 동작이 실행되지 않습니다.
          </CardDescription>
        </CardHeader>

        <CardBody>
          <p class="content-text">
            카드가 흐리게 표시되고 클릭할 수 없는 상태로 보입니다.
          </p>
        </CardBody>
      </Card>
    </section>

    <!-- footer align 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Footer Align
        </h2>

        <p class="section__description">
          CardFooter의 align 값에 따라 버튼 배치를 변경하는 예제입니다.
        </p>
      </div>

      <div class="example-stack">
        <Card variant="outlined">
          <CardHeader>
            <CardTitle>
              align="left"
            </CardTitle>
          </CardHeader>

          <CardFooter align="left">
            <button
              type="button"
              class="button button--secondary"
            >
              이전
            </button>

            <button
              type="button"
              class="button button--primary"
            >
              다음
            </button>
          </CardFooter>
        </Card>

        <Card variant="outlined">
          <CardHeader>
            <CardTitle>
              align="center"
            </CardTitle>
          </CardHeader>

          <CardFooter align="center">
            <button
              type="button"
              class="button button--secondary"
            >
              취소
            </button>

            <button
              type="button"
              class="button button--primary"
            >
              확인
            </button>
          </CardFooter>
        </Card>

        <Card variant="outlined">
          <CardHeader>
            <CardTitle>
              align="between"
            </CardTitle>
          </CardHeader>

          <CardFooter align="between">
            <button
              type="button"
              class="button button--secondary"
            >
              이전
            </button>

            <button
              type="button"
              class="button button--primary"
            >
              저장
            </button>
          </CardFooter>
        </Card>
      </div>
    </section>

    <!-- 결과 메시지 -->
    <section
      v-if="clickMessage"
      class="section section--result"
    >
      <div class="section__header">
        <h2 class="section__title">
          동작 결과
        </h2>
      </div>

      <p class="result-message">
        {{ clickMessage }}
      </p>

      <button
        type="button"
        class="button button--secondary"
        @click="clickMessage = ''"
      >
        메시지 지우기
      </button>
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
  max-width: 1080px;
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
  max-width: 760px;
  margin: 12px 0 0;
  color: #4b5563;
  font-size: 16px;
  line-height: 1.7;
}

.section {
  max-width: 1080px;
  margin: 0 auto 24px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
}

.section--result {
  border-color: #bfdbfe;
  background: #eff6ff;
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

.card-grid {
  display: grid;
  gap: 16px;
}

.card-grid--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card-grid--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.example-stack {
  display: grid;
  gap: 14px;
}

.content-text {
  margin: 0;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.7;
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

.button--outline {
  color: #374151;
  background: transparent;
  border-color: #d1d5db;
}

.button--outline:hover {
  background: #f9fafb;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #374151;

  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

.icon-button:hover {
  background: #f9fafb;
}

.profile-summary {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;

  border-radius: 50%;
  background: #2563eb;
  color: #ffffff;

  font-size: 14px;
  font-weight: 800;
}

.profile-summary__name {
  margin: 0;
  color: #111827;
  font-size: 15px;
  font-weight: 800;
}

.profile-summary__text {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
}

.product-layout {
  display: grid;
  grid-template-columns: minmax(0, 360px) 1fr;
  gap: 18px;
  align-items: start;
}

.product-card__body {
  padding: 16px;
}

.product-card__footer {
  padding: 0 16px 16px;
}

.product-card__price {
  display: block;
  margin-top: 12px;
  color: #111827;
  font-size: 18px;
  line-height: 1.3;
}

.selected-box {
  padding: 18px;
  border: 1px solid #bfdbfe;
  border-radius: 14px;
  background: #eff6ff;
  color: #1d4ed8;
}

.selected-box__label {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.badge {
  display: inline-flex;
  align-items: center;

  min-height: 24px;
  padding: 0 10px;

  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;

  font-size: 12px;
  font-weight: 800;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  border-radius: 10px;
  background: #eff6ff;
  color: #2563eb;

  font-weight: 800;
}

.stat-increase {
  margin: 8px 0 0;
  color: #16a34a;
  font-size: 13px;
  line-height: 1.5;
}

.payment-list {
  display: grid;
  gap: 12px;
}

.product-card-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.result-message {
  margin: 0 0 14px;
  color: #1d4ed8;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .card-grid--three,
  .product-card-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .product-layout {
    grid-template-columns: 1fr;
  }
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

  .card-grid--two,
  .card-grid--three,
  .product-card-list {
    grid-template-columns: 1fr;
  }

  .button {
    width: 100%;
  }
}
</style>