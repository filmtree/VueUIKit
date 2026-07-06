<script setup lang="ts">
import { computed, ref } from 'vue'

import RangeSlider from '/src/components/rangeSlider/RangeSlider.vue'
import MultiRangeSlider from '/src/components/rangeSlider/MultiRangeSlider.vue'

import type { MultiRangeValue } from '/src/components/rangeSlider/MultiRangeSlider.vue'

/**
 * 단일 RangeSlider 예제 값입니다.
 */
const discount = ref(30)
const progress = ref(0)
const volume = ref(40)
const brightness = ref(65)

/**
 * MultiRangeSlider 예제 값입니다.
 */
const priceRange = ref<MultiRangeValue>({
  min: 10000,
  max: 80000,
})

const scoreRange = ref<MultiRangeValue>({
  min: 20,
  max: 80,
})

const ageRange = ref<MultiRangeValue>({
  min: 20,
  max: 45,
})

/**
 * 상품 필터 예제에서 사용할 상품 데이터입니다.
 */
type Product = {
  id: number
  name: string
  category: string
  price: number
}

const products: Product[] = [
  {
    id: 1,
    name: '코튼 셔츠',
    category: '상의',
    price: 39000,
  },
  {
    id: 2,
    name: '와이드 팬츠',
    category: '하의',
    price: 59000,
  },
  {
    id: 3,
    name: '린넨 자켓',
    category: '아우터',
    price: 89000,
  },
  {
    id: 4,
    name: '양말',
    category: '잡화',
    price: 5000,
  },
  {
    id: 5,
    name: '니트 가디건',
    category: '아우터',
    price: 76000,
  },
]

/**
 * 가격 범위에 맞는 상품만 필터링합니다.
 */
const filteredProducts = computed(() => {
  return products.filter((product) => {
    return (
      product.price >= priceRange.value.min &&
      product.price <= priceRange.value.max
    )
  })
})

/**
 * 숫자를 가격 형식으로 표시합니다.
 */
const formatPrice = (price: number) => {
  return `${price.toLocaleString()}원`
}
</script>

<template>
  <main class="app">
    <section class="app__hero">
      <p class="app__eyebrow">
        Vue 3 UI Components
      </p>

      <h1 class="app__title">
        RangeSlider 통합 예제
      </h1>

      <p class="app__description">
        단일 값 선택, 범위 선택, 가격 필터, 에러 상태, 비활성화 상태를
        한 페이지에서 확인할 수 있는 예제입니다.
      </p>
    </section>

    <section class="app__grid">
      <!-- 기본 단일 값 RangeSlider -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            기본 할인율
          </h2>

          <p class="example-card__text">
            하나의 값을 선택할 때 사용하는 기본 RangeSlider입니다.
          </p>
        </div>

        <RangeSlider
          id="discount"
          v-model="discount"
          label="할인율"
          description="상품에 적용할 할인율을 선택하세요."
          :min="0"
          :max="100"
          :step="5"
          unit="%"
        />
      </article>

      <!-- 화면 밝기 설정 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            설정값 조절
          </h2>

          <p class="example-card__text">
            음량, 밝기, 진행률처럼 하나의 설정값을 조절할 때 사용할 수 있습니다.
          </p>
        </div>

        <RangeSlider
          id="brightness"
          v-model="brightness"
          label="화면 밝기"
          description="사용자 화면 밝기 값을 조절합니다."
          :min="0"
          :max="100"
          :step="1"
          unit="%"
        />
      </article>

      <!-- 가격 범위 선택 예제 -->
      <article class="example-card example-card--wide">
        <div class="example-card__header">
          <h2 class="example-card__title">
            가격대 선택
          </h2>

          <p class="example-card__text">
            최소값과 최대값을 함께 선택해야 하는 경우 MultiRangeSlider를 사용합니다.
          </p>
        </div>

        <MultiRangeSlider
          v-model="priceRange"
          label="가격대"
          description="검색할 상품의 가격 범위를 선택하세요."
          :min="0"
          :max="100000"
          :step="1000"
          :min-gap="5000"
          unit="원"
          comma
        />
      </article>

      <!-- 가격 필터와 상품 리스트 예제 -->
      <article class="example-card example-card--wide">
        <div class="example-card__header">
          <h2 class="example-card__title">
            상품 필터 적용
          </h2>

          <p class="example-card__text">
            선택된 가격 범위에 맞는 상품만 화면에 표시합니다.
          </p>
        </div>

        <MultiRangeSlider
          v-model="priceRange"
          label="가격 필터"
          :min="0"
          :max="100000"
          :step="1000"
          :min-gap="1000"
          unit="원"
          comma
        />

        <div class="product-list">
          <div class="product-list__top">
            <strong class="product-list__title">
              검색 결과
            </strong>

            <span class="product-list__count">
              {{ filteredProducts.length }}개
            </span>
          </div>

          <ul
            v-if="filteredProducts.length > 0"
            class="product-list__items"
          >
            <li
              v-for="product in filteredProducts"
              :key="product.id"
              class="product-item"
            >
              <div>
                <strong class="product-item__name">
                  {{ product.name }}
                </strong>

                <p class="product-item__category">
                  {{ product.category }}
                </p>
              </div>

              <span class="product-item__price">
                {{ formatPrice(product.price) }}
              </span>
            </li>
          </ul>

          <p
            v-else
            class="product-list__empty"
          >
            선택한 가격대에 해당하는 상품이 없습니다.
          </p>
        </div>
      </article>

      <!-- 점수 범위 선택 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            점수 범위
          </h2>

          <p class="example-card__text">
            조회할 점수 구간을 선택하는 예제입니다.
          </p>
        </div>

        <MultiRangeSlider
          v-model="scoreRange"
          label="점수 범위"
          description="조회할 점수 구간을 선택하세요."
          :min="0"
          :max="100"
          :step="1"
          :min-gap="1"
          unit="점"
        />
      </article>

      <!-- 연령대 선택 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            연령대 선택
          </h2>

          <p class="example-card__text">
            연령, 기간, 구간 필터에도 같은 방식으로 사용할 수 있습니다.
          </p>
        </div>

        <MultiRangeSlider
          v-model="ageRange"
          label="연령대"
          description="대상 연령 범위를 선택하세요."
          :min="10"
          :max="80"
          :step="1"
          :min-gap="1"
          unit="세"
        />
      </article>

      <!-- 에러 상태 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            에러 상태
          </h2>

          <p class="example-card__text">
            조건을 만족하지 못했을 때 에러 메시지를 표시합니다.
          </p>
        </div>

        <RangeSlider
          id="progress"
          v-model="progress"
          label="진행률"
          description="진행률은 10% 이상으로 설정해야 합니다."
          :min="0"
          :max="100"
          :step="1"
          unit="%"
          :error="progress < 10 ? '진행률을 10% 이상으로 설정해주세요.' : ''"
        />
      </article>

      <!-- 비활성화 상태 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            비활성화 상태
          </h2>

          <p class="example-card__text">
            사용자가 값을 변경할 수 없는 상태입니다.
          </p>
        </div>

        <RangeSlider
          id="volume"
          v-model="volume"
          label="음량"
          description="현재 설정에서는 값을 변경할 수 없습니다."
          :min="0"
          :max="100"
          :step="1"
          unit="%"
          disabled
        />
      </article>
    </section>

    <section class="summary-card">
      <h2 class="summary-card__title">
        현재 선택 값
      </h2>

      <dl class="summary-list">
        <div class="summary-list__item">
          <dt>할인율</dt>
          <dd>{{ discount }}%</dd>
        </div>

        <div class="summary-list__item">
          <dt>밝기</dt>
          <dd>{{ brightness }}%</dd>
        </div>

        <div class="summary-list__item">
          <dt>가격대</dt>
          <dd>
            {{ priceRange.min.toLocaleString() }}원 ~
            {{ priceRange.max.toLocaleString() }}원
          </dd>
        </div>

        <div class="summary-list__item">
          <dt>점수 범위</dt>
          <dd>{{ scoreRange.min }}점 ~ {{ scoreRange.max }}점</dd>
        </div>

        <div class="summary-list__item">
          <dt>연령대</dt>
          <dd>{{ ageRange.min }}세 ~ {{ ageRange.max }}세</dd>
        </div>
      </dl>
    </section>
  </main>
</template>

<style scoped>
.app {
  min-height: 100vh;
  padding: 48px 24px;

  background: #f3f4f6;
  color: #111827;
  box-sizing: border-box;
}

.app__hero {
  max-width: 960px;
  margin: 0 auto 32px;
}

.app__eyebrow {
  margin: 0 0 8px;

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
}

.app__title {
  margin: 0;

  font-size: 36px;
  line-height: 1.2;
  letter-spacing: -0.04em;
  color: #111827;
}

.app__description {
  max-width: 720px;
  margin: 16px 0 0;

  font-size: 16px;
  line-height: 1.7;
  color: #4b5563;
}

.app__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  max-width: 960px;
  margin: 0 auto;
}

.example-card {
  min-width: 0;
  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 20px;

  background: #ffffff;

  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
}

.example-card--wide {
  grid-column: 1 / -1;
}

.example-card__header {
  margin-bottom: 20px;
}

.example-card__title {
  margin: 0;

  font-size: 18px;
  line-height: 1.4;
  color: #111827;
}

.example-card__text {
  margin: 8px 0 0;

  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
}

.product-list {
  margin-top: 24px;
  padding: 16px;

  border: 1px solid #e5e7eb;
  border-radius: 16px;

  background: #f9fafb;
}

.product-list__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  margin-bottom: 12px;
}

.product-list__title {
  font-size: 14px;
  color: #111827;
}

.product-list__count {
  font-size: 13px;
  font-weight: 700;
  color: #2563eb;
}

.product-list__items {
  display: grid;
  gap: 8px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.product-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 12px;

  border-radius: 12px;
  background: #ffffff;
}

.product-item__name {
  display: block;

  font-size: 14px;
  color: #111827;
}

.product-item__category {
  margin: 4px 0 0;

  font-size: 12px;
  color: #6b7280;
}

.product-item__price {
  flex: 0 0 auto;

  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.product-list__empty {
  margin: 0;
  padding: 16px;

  border-radius: 12px;
  background: #ffffff;

  font-size: 14px;
  color: #6b7280;
  text-align: center;
}

.summary-card {
  max-width: 960px;
  margin: 20px auto 0;
  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 20px;

  background: #ffffff;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
}

.summary-card__title {
  margin: 0 0 16px;

  font-size: 18px;
  color: #111827;
}

.summary-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  margin: 0;
}

.summary-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 12px 14px;

  border-radius: 12px;
  background: #f9fafb;
}

.summary-list__item dt {
  font-size: 13px;
  font-weight: 700;
  color: #4b5563;
}

.summary-list__item dd {
  margin: 0;

  font-size: 13px;
  font-weight: 700;
  color: #111827;
}

@media (max-width: 768px) {
  .app {
    padding: 32px 16px;
  }

  .app__title {
    font-size: 28px;
  }

  .app__grid {
    grid-template-columns: 1fr;
  }

  .example-card {
    padding: 20px;
  }

  .summary-list {
    grid-template-columns: 1fr;
  }

  .product-item {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>