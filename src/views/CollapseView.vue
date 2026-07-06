<script setup lang="ts">
import { computed, ref } from "vue";

import { Collapse, CollapseBox } from "/src/components/collapse";


/**
 * 기본 Collapse 열림 상태입니다.
 */
const basicOpen = ref(false);

/**
 * unmountOnExit Collapse 열림 상태입니다.
 */
const unmountOpen = ref(false);

/**
 * 외부 제어 CollapseBox 열림 상태입니다.
 */
const controlledBoxOpen = ref(true);

/**
 * 필터 영역 열림 상태입니다.
 */
const filterOpen = ref(false);

/**
 * 선택된 배송 옵션입니다.
 */
const selectedDelivery = ref("standard");

/**
 * 선택된 결제 옵션입니다.
 */
const selectedPayment = ref("card");

/**
 * 기본 Collapse 토글 함수입니다.
 */
const toggleBasicCollapse = () => {
  basicOpen.value = !basicOpen.value;
};

/**
 * unmountOnExit Collapse 토글 함수입니다.
 */
const toggleUnmountCollapse = () => {
  unmountOpen.value = !unmountOpen.value;
};

/**
 * 외부 제어 CollapseBox 토글 함수입니다.
 */
const toggleControlledBox = () => {
  controlledBoxOpen.value = !controlledBoxOpen.value;
};

/**
 * 필터 영역 토글 함수입니다.
 */
const toggleFilter = () => {
  filterOpen.value = !filterOpen.value;
};

/**
 * 현재 설정 상태를 화면에 표시하기 위한 텍스트입니다.
 */
const currentSettingText = computed(() => {
  return [
    `배송: ${selectedDelivery.value}`,
    `결제: ${selectedPayment.value}`,
    `필터: ${filterOpen.value ? "열림" : "닫힘"}`,
  ].join(" / ");
});

/**
 * 전체 예제 상태를 초기화합니다.
 */
const resetAll = () => {
  basicOpen.value = false;
  unmountOpen.value = false;
  controlledBoxOpen.value = true;
  filterOpen.value = false;
  selectedDelivery.value = "standard";
  selectedPayment.value = "card";
};
</script>

<template>
  <main class="app">
    <section class="app__header">
      <p class="app__eyebrow">
        Vue 3 UI Component
      </p>

      <div class="app__header-row">
        <div>
          <h1 class="app__title">
            Collapse / CollapseBox 예제
          </h1>

          <p class="app__description">
            단순 열림/닫힘 영역, DOM 제거 옵션, 버튼이 포함된 박스 UI,
            외부 제어 방식, 슬롯 커스터마이징, 필터 영역 예제를 하나의 페이지에서 확인할 수 있습니다.
          </p>
        </div>

        <button
          type="button"
          class="app__reset-button"
          @click="resetAll"
        >
          초기화
        </button>
      </div>
    </section>

    <section class="example-grid">
      <!-- 기본 Collapse 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            기본 Collapse
          </h2>

          <p class="example-card__description">
            버튼은 부모에서 만들고, Collapse는 열림/닫힘 영역만 담당합니다.
          </p>
        </div>

        <div class="example-card__body">
          <button
            type="button"
            class="demo-button"
            :aria-expanded="basicOpen"
            aria-controls="basic-collapse"
            @click="toggleBasicCollapse"
          >
            {{ basicOpen ? "안내 닫기" : "안내 열기" }}
          </button>

          <Collapse
            id="basic-collapse"
            :open="basicOpen"
          >
            <div class="notice-box">
              <h3 class="notice-box__title">
                안내 사항
              </h3>

              <p class="notice-box__text">
                이 영역은 버튼을 클릭하면 열리고 닫히는 기본 Collapse 영역입니다.
                내용 높이가 달라도 자연스럽게 애니메이션됩니다.
              </p>
            </div>
          </Collapse>

          <div class="state-box">
            현재 상태:
            <strong>
              {{ basicOpen ? "열림" : "닫힘" }}
            </strong>
          </div>
        </div>
      </article>

      <!-- unmountOnExit 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            unmountOnExit Collapse
          </h2>

          <p class="example-card__description">
            닫힘 애니메이션이 끝난 뒤 DOM에서 콘텐츠를 제거합니다.
          </p>
        </div>

        <div class="example-card__body">
          <button
            type="button"
            class="demo-button"
            :aria-expanded="unmountOpen"
            aria-controls="unmount-collapse"
            @click="toggleUnmountCollapse"
          >
            {{ unmountOpen ? "콘텐츠 제거하기" : "콘텐츠 렌더링하기" }}
          </button>

          <Collapse
            id="unmount-collapse"
            :open="unmountOpen"
            unmount-on-exit
          >
            <div class="notice-box notice-box--warning">
              <h3 class="notice-box__title">
                DOM 제거 옵션
              </h3>

              <p class="notice-box__text">
                닫힌 상태에서 화면에 필요 없는 콘텐츠를 DOM에서 제거하고 싶을 때 사용할 수 있습니다.
              </p>
            </div>
          </Collapse>

          <div class="state-box">
            현재 상태:
            <strong>
              {{ unmountOpen ? "렌더링됨" : "닫힘 또는 제거됨" }}
            </strong>
          </div>
        </div>
      </article>

      <!-- CollapseBox 기본 예제 -->
      <article class="example-card example-card--wide">
        <div class="example-card__header">
          <h2 class="example-card__title">
            CollapseBox 기본 사용
          </h2>

          <p class="example-card__description">
            버튼과 Collapse 영역이 함께 필요한 경우 CollapseBox를 사용합니다.
          </p>
        </div>

        <div class="example-card__body">
          <div class="collapse-list">
            <CollapseBox title="상세 설명">
              <p>
                이 영역은 사용자가 필요할 때만 펼쳐서 볼 수 있는 상세 설명입니다.
                상품 설명, 안내 문구, 더보기 영역 등에 사용할 수 있습니다.
              </p>
            </CollapseBox>

            <CollapseBox
              title="배송 안내"
              default-open
            >
              <p>
                결제 완료 후 평균 2~3일 이내에 배송됩니다.
                제주 및 도서산간 지역은 배송 기간이 추가될 수 있습니다.
              </p>
            </CollapseBox>

            <CollapseBox title="교환 및 반품 안내">
              <p>
                상품 수령 후 7일 이내에 교환 또는 반품을 신청할 수 있습니다.
                단, 사용 흔적이 있는 상품은 처리가 제한될 수 있습니다.
              </p>
            </CollapseBox>
          </div>
        </div>
      </article>

      <!-- v-model:open 외부 제어 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            v-model:open 외부 제어
          </h2>

          <p class="example-card__description">
            외부 버튼으로 CollapseBox의 열림 상태를 제어합니다.
          </p>
        </div>

        <div class="example-card__body">
          <button
            type="button"
            class="demo-button"
            @click="toggleControlledBox"
          >
            외부 버튼으로 토글
          </button>

          <CollapseBox
            v-model:open="controlledBoxOpen"
            title="외부 제어 CollapseBox"
          >
            <p>
              이 영역은 CollapseBox 내부 버튼뿐 아니라 외부 버튼으로도 열고 닫을 수 있습니다.
            </p>
          </CollapseBox>

          <div class="state-box">
            현재 상태:
            <strong>
              {{ controlledBoxOpen ? "열림" : "닫힘" }}
            </strong>
          </div>
        </div>
      </article>

      <!-- title slot 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            title slot 사용
          </h2>

          <p class="example-card__description">
            제목 안에 배지, 강조 텍스트, 아이콘 등을 함께 넣을 수 있습니다.
          </p>
        </div>

        <div class="example-card__body">
          <CollapseBox>
            <template #title>
              <span class="title-slot">
                배송 안내
                <span class="title-badge">
                  필수 확인
                </span>
              </span>
            </template>

            <p>
              배송지는 주문 완료 후 변경이 어려울 수 있으므로 결제 전에 다시 확인해 주세요.
            </p>
          </CollapseBox>
        </div>
      </article>

      <!-- icon slot 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            icon slot 사용
          </h2>

          <p class="example-card__description">
            기본 아이콘 대신 원하는 아이콘 또는 텍스트를 사용할 수 있습니다.
          </p>
        </div>

        <div class="example-card__body">
          <CollapseBox title="상세 정보">
            <template #icon>
              <span class="custom-icon">
                +
              </span>
            </template>

            <p>
              icon 슬롯을 사용하면 기본 화살표 대신 프로젝트에서 사용하는 아이콘 컴포넌트로 교체할 수 있습니다.
            </p>
          </CollapseBox>
        </div>
      </article>

      <!-- 필터 영역 Collapse 예제 -->
      <article class="example-card example-card--wide">
        <div class="example-card__header">
          <h2 class="example-card__title">
            필터 영역 Collapse
          </h2>

          <p class="example-card__description">
            검색 필터, 상세 조건, 옵션 영역처럼 필요할 때만 펼치는 UI에 사용할 수 있습니다.
          </p>
        </div>

        <div class="example-card__body">
          <button
            type="button"
            class="demo-button"
            :aria-expanded="filterOpen"
            aria-controls="filter-collapse"
            @click="toggleFilter"
          >
            {{ filterOpen ? "필터 닫기" : "필터 열기" }}
          </button>

          <Collapse
            id="filter-collapse"
            :open="filterOpen"
          >
            <form class="filter-form">
              <fieldset class="filter-form__group">
                <legend class="filter-form__legend">
                  배송 방식
                </legend>

                <label class="filter-option">
                  <input
                    v-model="selectedDelivery"
                    type="radio"
                    name="delivery"
                    value="standard"
                  />
                  일반 배송
                </label>

                <label class="filter-option">
                  <input
                    v-model="selectedDelivery"
                    type="radio"
                    name="delivery"
                    value="express"
                  />
                  빠른 배송
                </label>

                <label class="filter-option">
                  <input
                    v-model="selectedDelivery"
                    type="radio"
                    name="delivery"
                    value="pickup"
                  />
                  방문 수령
                </label>
              </fieldset>

              <fieldset class="filter-form__group">
                <legend class="filter-form__legend">
                  결제 방식
                </legend>

                <label class="filter-option">
                  <input
                    v-model="selectedPayment"
                    type="radio"
                    name="payment"
                    value="card"
                  />
                  카드 결제
                </label>

                <label class="filter-option">
                  <input
                    v-model="selectedPayment"
                    type="radio"
                    name="payment"
                    value="bank"
                  />
                  계좌 이체
                </label>

                <label class="filter-option">
                  <input
                    v-model="selectedPayment"
                    type="radio"
                    name="payment"
                    value="simple"
                  />
                  간편 결제
                </label>
              </fieldset>
            </form>
          </Collapse>

          <div class="result-panel">
            <p>
              현재 설정:
              <code>{{ currentSettingText }}</code>
            </p>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;

  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  color: #111827;
  background: #f3f4f6;
}

button,
input {
  font: inherit;
}

.app {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0;
}

.app__header {
  margin-bottom: 32px;
}

.app__eyebrow {
  margin: 0 0 8px;

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  color: #2563eb;
}

.app__header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.app__title {
  margin: 0;

  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.2;
  letter-spacing: -0.03em;

  color: #111827;
}

.app__description {
  max-width: 760px;
  margin: 14px 0 0;

  font-size: 15px;
  line-height: 1.7;

  color: #4b5563;
}

.app__reset-button {
  flex: 0 0 auto;

  min-height: 40px;
  padding: 0 16px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;

  color: #374151;
  background: #fff;

  cursor: pointer;

  transition:
    border-color 0.2s,
    background-color 0.2s,
    box-shadow 0.2s;
}

.app__reset-button:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

.app__reset-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.example-card {
  display: flex;
  flex-direction: column;
  gap: 20px;

  min-width: 0;
  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 18px;

  background: #fff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
}

.example-card--wide {
  grid-column: span 2;
}

.example-card__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.example-card__title {
  margin: 0;

  font-size: 18px;
  line-height: 1.4;

  color: #111827;
}

.example-card__description {
  margin: 0;

  font-size: 14px;
  line-height: 1.6;

  color: #6b7280;
}

.example-card__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  min-height: 40px;
  padding: 0 16px;

  border: 1px solid #2563eb;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;

  color: #fff;
  background: #2563eb;

  cursor: pointer;

  transition:
    background-color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
}

.demo-button:hover {
  border-color: #1d4ed8;
  background: #1d4ed8;
}

.demo-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.24);
}

.notice-box {
  padding: 16px;

  border: 1px solid #dbeafe;
  border-radius: 14px;

  background: #eff6ff;
}

.notice-box--warning {
  border-color: #fde68a;
  background: #fffbeb;
}

.notice-box__title {
  margin: 0 0 8px;

  font-size: 15px;
  line-height: 1.4;

  color: #111827;
}

.notice-box__text {
  margin: 0;

  font-size: 14px;
  line-height: 1.7;

  color: #4b5563;
}

.state-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;

  width: 100%;
  padding: 12px 14px;

  border-radius: 12px;

  font-size: 14px;
  line-height: 1.5;

  color: #374151;
  background: #f9fafb;
}

.state-box strong {
  color: #111827;
}

.collapse-list {
  display: grid;
  gap: 12px;
}

.title-slot {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.title-badge {
  display: inline-flex;
  align-items: center;

  min-height: 22px;
  padding: 0 8px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 700;

  color: #1d4ed8;
  background: #dbeafe;
}

.custom-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;

  border-radius: 999px;

  font-size: 16px;
  font-weight: 700;

  color: #2563eb;
  background: #eff6ff;
}

.filter-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  padding: 16px 0;
}

.filter-form__group {
  display: flex;
  flex-direction: column;
  gap: 10px;

  min-width: 0;
  margin: 0;
  padding: 16px;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  background: #f9fafb;
}

.filter-form__legend {
  padding: 0 4px;

  font-size: 14px;
  font-weight: 700;

  color: #111827;
}

.filter-option {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  font-size: 14px;
  line-height: 1.5;

  color: #374151;

  cursor: pointer;
}

.filter-option input {
  width: 16px;
  height: 16px;

  accent-color: #2563eb;
}

.result-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 16px;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  background: #f9fafb;
}

.result-panel p {
  margin: 0;

  font-size: 14px;
  line-height: 1.6;

  color: #374151;
}

.result-panel code {
  display: inline-flex;
  max-width: 100%;

  padding: 2px 6px;

  border-radius: 6px;

  font-size: 13px;
  line-height: 1.5;

  color: #1d4ed8;
  background: #eff6ff;

  word-break: break-all;
}

@media (max-width: 768px) {
  .app {
    width: min(100% - 24px, 1120px);
    padding: 32px 0;
  }

  .app__header-row {
    flex-direction: column;
  }

  .app__reset-button {
    width: 100%;
  }

  .example-grid {
    grid-template-columns: 1fr;
  }

  .example-card--wide {
    grid-column: auto;
  }

  .filter-form {
    grid-template-columns: 1fr;
  }
}
    </style>