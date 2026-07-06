<script setup lang="ts">
import { computed, ref } from "vue";
import { BottomSheet } from "/src/components/bottom-sheet";

/**
 * 기본 BottomSheet 열림 상태입니다.
 */
const basicOpen = ref(false);

/**
 * 옵션 선택 BottomSheet 열림 상태입니다.
 */
const optionOpen = ref(false);

/**
 * 긴 콘텐츠 BottomSheet 열림 상태입니다.
 */
const longContentOpen = ref(false);

/**
 * 결제 확인 BottomSheet 열림 상태입니다.
 */
const checkoutOpen = ref(false);

/**
 * 삭제 확인 BottomSheet 열림 상태입니다.
 */
const deleteConfirmOpen = ref(false);

/**
 * size 예제용 BottomSheet 열림 상태입니다.
 */
const sizeExampleOpen = ref(false);

/**
 * 현재 선택한 size 값입니다.
 */
const selectedSheetSize = ref<"auto" | "md" | "lg" | "full">("auto");

/**
 * 옵션 선택 예제에서 선택된 옵션 값입니다.
 */
const selectedOption = ref("option-1");

/**
 * 결제 확인 예제에서 선택된 배송 방식입니다.
 */
const selectedDelivery = ref("normal");

/**
 * 약관 동의 여부입니다.
 */
const agreed = ref(false);

/**
 * 삭제 확인 입력값입니다.
 */
const deleteConfirmText = ref("");

/**
 * 삭제 확인 버튼 활성화 여부입니다.
 */
const canDelete = computed(() => {
  return deleteConfirmText.value === "삭제";
});

/**
 * 기본 BottomSheet를 닫습니다.
 */
const closeBasic = () => {
  basicOpen.value = false;
};

/**
 * 옵션 선택 BottomSheet를 닫습니다.
 */
const closeOption = () => {
  optionOpen.value = false;
};

/**
 * 긴 콘텐츠 BottomSheet를 닫습니다.
 */
const closeLongContent = () => {
  longContentOpen.value = false;
};

/**
 * 결제 확인 BottomSheet를 닫습니다.
 */
const closeCheckout = () => {
  checkoutOpen.value = false;
};

/**
 * 삭제 확인 BottomSheet를 닫습니다.
 */
const closeDeleteConfirm = () => {
  deleteConfirmOpen.value = false;
};

/**
 * size 예제 BottomSheet를 닫습니다.
 */
const closeSizeExample = () => {
  sizeExampleOpen.value = false;
};

/**
 * 옵션 선택 후 확인 버튼을 눌렀을 때 실행됩니다.
 */
const confirmOption = () => {
  console.log("선택된 옵션:", selectedOption.value);
  closeOption();
};

/**
 * 결제 확인 버튼을 눌렀을 때 실행됩니다.
 */
const confirmCheckout = () => {
  console.log("배송 방식:", selectedDelivery.value);
  console.log("약관 동의:", agreed.value);
  closeCheckout();
};

/**
 * 삭제 버튼을 눌렀을 때 실행됩니다.
 */
const confirmDelete = () => {
  if (!canDelete.value) return;

  console.log("삭제 실행");
  deleteConfirmText.value = "";
  closeDeleteConfirm();
};

/**
 * size 예제를 열 때 size 값을 설정합니다.
 */
const openSizeExample = (size: "auto" | "md" | "lg" | "full") => {
  selectedSheetSize.value = size;
  sizeExampleOpen.value = true;
};
</script>

<template>
  <main class="page">
    <header class="page__header">
      <span class="page__eyebrow">
        Vue UI Component
      </span>

      <h1 class="page__title">
        BottomSheet 컴포넌트 예제
      </h1>

      <p class="page__description">
        BottomSheet의 기본 사용, 옵션 선택, 긴 콘텐츠, footer 버튼, 확인/취소 액션, size별 동작을 한 페이지에서 확인할 수 있습니다.
      </p>
    </header>

    <!-- 기본 BottomSheet -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          기본 BottomSheet
        </h2>

        <p class="section__description">
          버튼을 클릭하면 하단에서 BottomSheet가 열리는 기본 예제입니다.
        </p>
      </div>

      <button
        type="button"
        class="button button--primary"
        @click="basicOpen = true"
      >
        기본 BottomSheet 열기
      </button>

      <BottomSheet
        v-model:open="basicOpen"
        title="기본 안내"
        size="auto"
      >
        <div class="sheet-content">
          <p class="sheet-text">
            BottomSheet는 모바일 화면에서 메뉴, 옵션 선택, 확인 메시지 등을 보여줄 때 자주 사용하는 UI입니다.
          </p>

          <p class="sheet-text">
            화면 아래에서 올라오기 때문에 현재 페이지 흐름을 크게 벗어나지 않고 추가 정보를 보여줄 수 있습니다.
          </p>
        </div>

        <template #footer>
          <button
            type="button"
            class="button button--secondary"
            @click="closeBasic"
          >
            닫기
          </button>
        </template>
      </BottomSheet>
    </section>

    <!-- 옵션 선택 BottomSheet -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          옵션 선택 BottomSheet
        </h2>

        <p class="section__description">
          라디오 버튼을 사용해 옵션을 선택하고 footer에서 취소/확인을 처리하는 예제입니다.
        </p>
      </div>

      <button
        type="button"
        class="button button--primary"
        @click="optionOpen = true"
      >
        옵션 선택
      </button>

      <p class="result-text">
        현재 선택된 옵션:
        <strong>{{ selectedOption }}</strong>
      </p>

      <BottomSheet
        v-model:open="optionOpen"
        title="옵션 선택"
        size="auto"
      >
        <div class="option-list">
          <label class="option-item">
            <input
              v-model="selectedOption"
              type="radio"
              name="option"
              value="option-1"
            />

            <span>
              옵션 1
            </span>
          </label>

          <label class="option-item">
            <input
              v-model="selectedOption"
              type="radio"
              name="option"
              value="option-2"
            />

            <span>
              옵션 2
            </span>
          </label>

          <label class="option-item">
            <input
              v-model="selectedOption"
              type="radio"
              name="option"
              value="option-3"
            />

            <span>
              옵션 3
            </span>
          </label>
        </div>

        <template #footer>
          <button
            type="button"
            class="button button--secondary"
            @click="closeOption"
          >
            취소
          </button>

          <button
            type="button"
            class="button button--primary"
            @click="confirmOption"
          >
            확인
          </button>
        </template>
      </BottomSheet>
    </section>

    <!-- 긴 콘텐츠 BottomSheet -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          긴 콘텐츠 BottomSheet
        </h2>

        <p class="section__description">
          내용이 길어질 때 내부 스크롤 영역이 필요한 상황을 확인하는 예제입니다.
        </p>
      </div>

      <button
        type="button"
        class="button button--primary"
        @click="longContentOpen = true"
      >
        긴 콘텐츠 보기
      </button>

      <BottomSheet
        v-model:open="longContentOpen"
        title="서비스 이용 안내"
        size="lg"
      >
        <div class="long-content">
          <div
            v-for="item in 12"
            :key="item"
            class="notice-card"
          >
            <h3 class="notice-card__title">
              안내 항목 {{ item }}
            </h3>

            <p class="notice-card__text">
              BottomSheet 안에 긴 콘텐츠가 들어가는 경우입니다. 상품 설명, 약관, 주문 상세, 필터 목록처럼 내용이 많은 화면에서 사용할 수 있습니다.
            </p>
          </div>
        </div>

        <template #footer>
          <button
            type="button"
            class="button button--secondary"
            @click="closeLongContent"
          >
            닫기
          </button>

          <button
            type="button"
            class="button button--primary"
            @click="closeLongContent"
          >
            확인했습니다
          </button>
        </template>
      </BottomSheet>
    </section>

    <!-- 결제 확인 BottomSheet -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          결제 확인 BottomSheet
        </h2>

        <p class="section__description">
          주문 요약, 배송 방식 선택, 약관 동의처럼 여러 UI를 조합하는 예제입니다.
        </p>
      </div>

      <button
        type="button"
        class="button button--primary"
        @click="checkoutOpen = true"
      >
        결제 확인 열기
      </button>

      <BottomSheet
        v-model:open="checkoutOpen"
        title="결제 확인"
        size="md"
      >
        <div class="checkout">
          <div class="summary-card">
            <div class="summary-row">
              <span>상품 금액</span>
              <strong>42,000원</strong>
            </div>

            <div class="summary-row">
              <span>배송비</span>
              <strong>3,000원</strong>
            </div>

            <div class="summary-row summary-row--total">
              <span>총 결제 금액</span>
              <strong>45,000원</strong>
            </div>
          </div>

          <div class="field-group">
            <p class="field-group__label">
              배송 방식
            </p>

            <label class="option-item">
              <input
                v-model="selectedDelivery"
                type="radio"
                name="delivery"
                value="normal"
              />

              <span>
                일반 배송
              </span>
            </label>

            <label class="option-item">
              <input
                v-model="selectedDelivery"
                type="radio"
                name="delivery"
                value="quick"
              />

              <span>
                빠른 배송
              </span>
            </label>
          </div>

          <label class="check-item">
            <input
              v-model="agreed"
              type="checkbox"
            />

            <span>
              주문 내용을 확인했으며 결제 진행에 동의합니다.
            </span>
          </label>
        </div>

        <template #footer>
          <button
            type="button"
            class="button button--secondary"
            @click="closeCheckout"
          >
            취소
          </button>

          <button
            type="button"
            class="button button--primary"
            :disabled="!agreed"
            @click="confirmCheckout"
          >
            결제하기
          </button>
        </template>
      </BottomSheet>
    </section>

    <!-- 삭제 확인 BottomSheet -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          삭제 확인 BottomSheet
        </h2>

        <p class="section__description">
          사용자의 확인 입력을 받은 뒤 위험한 작업을 실행하는 예제입니다.
        </p>
      </div>

      <button
        type="button"
        class="button button--danger"
        @click="deleteConfirmOpen = true"
      >
        삭제 확인 열기
      </button>

      <BottomSheet
        v-model:open="deleteConfirmOpen"
        title="항목 삭제"
        size="auto"
      >
        <div class="danger-box">
          <p class="danger-box__title">
            정말 삭제하시겠습니까?
          </p>

          <p class="danger-box__text">
            삭제한 데이터는 복구할 수 없습니다. 삭제하려면 아래 입력창에
            <strong>삭제</strong>
            라고 입력해주세요.
          </p>

          <input
            v-model="deleteConfirmText"
            class="text-input"
            type="text"
            placeholder="삭제"
          />
        </div>

        <template #footer>
          <button
            type="button"
            class="button button--secondary"
            @click="closeDeleteConfirm"
          >
            취소
          </button>

          <button
            type="button"
            class="button button--danger"
            :disabled="!canDelete"
            @click="confirmDelete"
          >
            삭제
          </button>
        </template>
      </BottomSheet>
    </section>

    <!-- size 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Size 예제
        </h2>

        <p class="section__description">
          BottomSheet가 제공하는 size 값을 버튼으로 비교해볼 수 있습니다.
        </p>
      </div>

      <div class="button-group">
        <button
          type="button"
          class="button button--secondary"
          @click="openSizeExample('auto')"
        >
          auto
        </button>

        <button
          type="button"
          class="button button--secondary"
          @click="openSizeExample('md')"
        >
          md
        </button>

        <button
          type="button"
          class="button button--secondary"
          @click="openSizeExample('lg')"
        >
          lg
        </button>

        <button
          type="button"
          class="button button--secondary"
          @click="openSizeExample('full')"
        >
          full
        </button>
      </div>

      <BottomSheet
        v-model:open="sizeExampleOpen"
        :title="`size = ${selectedSheetSize}`"
        :size="selectedSheetSize"
      >
        <div class="sheet-content">
          <p class="sheet-text">
            현재 BottomSheet size 값은
            <strong>{{ selectedSheetSize }}</strong>
            입니다.
          </p>

          <p class="sheet-text">
            auto는 콘텐츠 높이에 맞게 보여주고, md/lg/full은 컴포넌트에서 정의한 높이 기준에 따라 표시됩니다.
          </p>
        </div>

        <template #footer>
          <button
            type="button"
            class="button button--secondary"
            @click="closeSizeExample"
          >
            닫기
          </button>
        </template>
      </BottomSheet>
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
  min-height: 40px;
  padding: 0 16px;

  border: 1px solid transparent;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;
  line-height: 1;

  cursor: pointer;
  box-sizing: border-box;
}

.button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.button--primary {
  color: #ffffff;
  background: #2563eb;
  border-color: #2563eb;
}

.button--primary:hover:not(:disabled) {
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

.button--danger {
  color: #ffffff;
  background: #dc2626;
  border-color: #dc2626;
}

.button--danger:hover:not(:disabled) {
  background: #b91c1c;
  border-color: #b91c1c;
}

.result-text {
  margin: 12px 0 0;
  color: #4b5563;
  font-size: 14px;
}

.sheet-content {
  display: grid;
  gap: 12px;
}

.sheet-text {
  margin: 0;
  color: #374151;
  font-size: 14px;
  line-height: 1.7;
}

.option-list {
  display: grid;
  gap: 12px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 10px;

  min-height: 44px;
  padding: 0 12px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;

  color: #374151;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
}

.option-item:hover {
  background: #f9fafb;
}

.option-item input {
  width: 16px;
  height: 16px;
  margin: 0;
}

.long-content {
  display: grid;
  gap: 12px;
}

.notice-card {
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #ffffff;
}

.notice-card__title {
  margin: 0 0 6px;
  font-size: 15px;
  line-height: 1.4;
}

.notice-card__text {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.checkout {
  display: grid;
  gap: 18px;
}

.summary-card {
  display: grid;
  gap: 10px;

  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #f9fafb;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  color: #4b5563;
  font-size: 14px;
}

.summary-row strong {
  color: #111827;
}

.summary-row--total {
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
  color: #111827;
  font-size: 16px;
}

.field-group {
  display: grid;
  gap: 10px;
}

.field-group__label {
  margin: 0;
  color: #374151;
  font-size: 14px;
  font-weight: 700;
}

.check-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;

  color: #374151;
  font-size: 14px;
  line-height: 1.6;
  cursor: pointer;
}

.check-item input {
  width: 16px;
  height: 16px;
  margin-top: 3px;
}

.danger-box {
  display: grid;
  gap: 12px;
}

.danger-box__title {
  margin: 0;
  color: #b91c1c;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.5;
}

.danger-box__text {
  margin: 0;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.7;
}

.text-input {
  width: 100%;
  height: 42px;
  padding: 0 12px;

  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #ffffff;

  color: #111827;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.text-input:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.14);
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

  .button,
  .button-group {
    width: 100%;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>