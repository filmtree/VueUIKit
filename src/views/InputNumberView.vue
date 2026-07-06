<script setup lang="ts">
import { computed, ref } from "vue";

import { NumberInput } from "/src/components/number-input";

/**
 * 기본 숫자 입력 값입니다.
 */
const basicValue = ref<number | undefined>();

/**
 * 최소 / 최대값 예제 값입니다.
 */
const percentValue = ref<number | undefined>();

/**
 * 소수점 2자리 예제 값입니다.
 */
const decimalValue = ref<number | undefined>();

/**
 * 천 단위 콤마 예제 값입니다.
 */
const commaValue = ref<number | undefined>();

/**
 * 원화 입력 예제 값입니다.
 */
const wonValue = ref<number | undefined>();

/**
 * 달러 입력 예제 값입니다.
 */
const dollarValue = ref<number | undefined>();

/**
 * 퍼센트 입력 예제 값입니다.
 */
const discountRate = ref<number | undefined>();

/**
 * 쇼핑몰 판매가 예제 값입니다.
 */
const sellingPrice = ref<number | undefined>();

/**
 * 에러 메시지 예제 값입니다.
 */
const errorPrice = ref<number | undefined>();

/**
 * disabled / readonly 예제 값입니다.
 */
const disabledValue = ref<number | undefined>(10000);
const readonlyValue = ref<number | undefined>(50000);

/**
 * 판매가 에러 메시지입니다.
 */
const priceError = computed(() => {
  if (errorPrice.value === undefined) {
    return "판매가를 입력해주세요.";
  }

  if (errorPrice.value < 1000) {
    return "판매가는 1,000원 이상이어야 합니다.";
  }

  return "";
});
</script>

<template>
  <main class="app">
    <section class="app__header">
      <h1>NumberInput 예제 모음</h1>

      <p>
        기본 숫자 입력, 최소/최대값, 소수점 자리수, 천 단위 콤마,
        원화/달러/퍼센트 입력, clearable, disabled, readonly,
        에러 메시지까지 한 페이지에서 확인하는 예제입니다.
      </p>
    </section>

    <!-- 기본 입력 -->
    <section class="example-section">
      <h2>기본 입력</h2>

      <div class="example-card">
        <NumberInput
          v-model="basicValue"
          label="기본 숫자"
          placeholder="숫자를 입력하세요"
          helper-text="숫자만 입력할 수 있습니다."
          full-width
        />

        <p class="example-value">
          현재 값: {{ basicValue ?? "없음" }}
        </p>
      </div>
    </section>

    <!-- 최소 / 최대값 -->
    <section class="example-section">
      <h2>최소 / 최대값</h2>

      <div class="example-card">
        <NumberInput
          v-model="percentValue"
          label="비율"
          :min="0"
          :max="100"
          suffix="%"
          placeholder="0 ~ 100"
          helper-text="0부터 100까지만 입력할 수 있습니다."
          full-width
        />

        <p class="example-value">
          현재 값: {{ percentValue ?? "없음" }}
        </p>
      </div>
    </section>

    <!-- 소수점 2자리 -->
    <section class="example-section">
      <h2>소수점 2자리</h2>

      <div class="example-card">
        <NumberInput
          v-model="decimalValue"
          label="금액"
          :decimal-scale="2"
          placeholder="예: 12.35"
          helper-text="소수점 2자리까지 표시됩니다."
          full-width
        />

        <p class="example-value">
          현재 값: {{ decimalValue ?? "없음" }}
        </p>
      </div>
    </section>

    <!-- 천 단위 콤마 -->
    <section class="example-section">
      <h2>천 단위 콤마</h2>

      <div class="example-card">
        <NumberInput
          v-model="commaValue"
          label="수량"
          thousand-separator
          placeholder="예: 1,000,000"
          helper-text="입력한 숫자가 천 단위 콤마로 표시됩니다."
          clearable
          full-width
        />

        <p class="example-value">
          현재 값: {{ commaValue ?? "없음" }}
        </p>
      </div>
    </section>

    <!-- 원화 입력 -->
    <section class="example-section">
      <h2>원화 입력</h2>

      <div class="example-card">
        <NumberInput
          v-model="wonValue"
          label="판매가"
          :min="0"
          thousand-separator
          suffix="원"
          placeholder="판매가를 입력하세요"
          helper-text="0원 이상 입력할 수 있습니다."
          clearable
          full-width
        />

        <p class="example-value">
          현재 값: {{ wonValue ?? "없음" }}
        </p>
      </div>
    </section>

    <!-- 달러 입력 -->
    <section class="example-section">
      <h2>달러 입력</h2>

      <div class="example-card">
        <NumberInput
          v-model="dollarValue"
          label="금액"
          thousand-separator
          prefix="$"
          placeholder="금액을 입력하세요"
          helper-text="숫자 앞에 달러 기호가 표시됩니다."
          clearable
          full-width
        />

        <p class="example-value">
          현재 값: {{ dollarValue ?? "없음" }}
        </p>
      </div>
    </section>

    <!-- 퍼센트 입력 -->
    <section class="example-section">
      <h2>퍼센트 입력</h2>

      <div class="example-card">
        <NumberInput
          v-model="discountRate"
          label="할인율"
          :min="0"
          :max="100"
          :decimal-scale="1"
          suffix="%"
          placeholder="할인율을 입력하세요"
          helper-text="0%부터 100%까지 입력할 수 있습니다."
          clearable
          full-width
        />

        <p class="example-value">
          현재 값: {{ discountRate ?? "없음" }}
        </p>
      </div>
    </section>

    <!-- 쇼핑몰 가격 입력 -->
    <section class="example-section">
      <h2>쇼핑몰 가격 입력</h2>

      <div class="example-card">
        <NumberInput
          v-model="sellingPrice"
          label="판매가"
          :min="0"
          thousand-separator
          suffix="원"
          placeholder="상품 판매가를 입력하세요"
          helper-text="상품의 실제 판매 가격을 입력하세요."
          clearable
          full-width
        />

        <p class="example-value">
          현재 값: {{ sellingPrice ?? "없음" }}
        </p>
      </div>
    </section>

    <!-- 에러 메시지 -->
    <section class="example-section">
      <h2>에러 메시지</h2>

      <div class="example-card">
        <NumberInput
          v-model="errorPrice"
          label="판매가"
          :min="0"
          thousand-separator
          suffix="원"
          placeholder="1,000원 이상 입력하세요"
          clearable
          :error-message="priceError"
          full-width
        />

        <p class="example-value">
          현재 값: {{ errorPrice ?? "없음" }}
        </p>
      </div>
    </section>

    <!-- Disabled / Readonly -->
    <section class="example-section">
      <h2>Disabled / Readonly</h2>

      <div class="example-grid">
        <div class="example-card">
          <NumberInput
            v-model="disabledValue"
            label="비활성화"
            thousand-separator
            suffix="원"
            disabled
            full-width
          />

          <p class="example-value">
            현재 값: {{ disabledValue ?? "없음" }}
          </p>
        </div>

        <div class="example-card">
          <NumberInput
            v-model="readonlyValue"
            label="읽기 전용"
            thousand-separator
            suffix="원"
            readonly
            full-width
          />

          <p class="example-value">
            현재 값: {{ readonlyValue ?? "없음" }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/**
 * App 내부 모든 요소가 padding, border를 포함해
 * 실제 너비를 계산하도록 설정합니다.
 */
.app,
.app * {
  box-sizing: border-box;
}

.app {
  width: 100%;
  max-width: 960px;

  margin: 0 auto;
  padding: 48px 24px;

  color: #111827;

  overflow-x: hidden;
}

.app__header {
  margin-bottom: 40px;
}

.app__header h1 {
  margin: 0 0 12px;

  font-size: 32px;
  line-height: 1.25;
  font-weight: 700;
}

.app__header p {
  max-width: 720px;
  margin: 0;

  font-size: 15px;
  line-height: 1.6;
  color: #6b7280;
}

.example-section {
  width: 100%;
  margin-top: 36px;
}

.example-section h2 {
  margin: 0 0 16px;

  font-size: 20px;
  line-height: 1.35;
  font-weight: 700;
}

.example-card {
  display: grid;
  gap: 12px;

  width: 100%;
  min-width: 0;
  max-width: 100%;

  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 16px;

  background: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  width: 100%;
  min-width: 0;
}

.example-value {
  margin: 0;

  font-size: 13px;
  line-height: 1.5;
  color: #6b7280;
}

/**
 * scoped style에서 자식 컴포넌트 내부 클래스에 접근하기 위해
 * :deep()을 사용합니다.
 */
:deep(.number-input-field) {
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

:deep(.number-input-wrapper) {
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

:deep(.number-input) {
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

@media (max-width: 720px) {
  .app {
    padding: 32px 16px;
  }

  .app__header h1 {
    font-size: 26px;
  }

  .example-card {
    padding: 20px;
  }

  .example-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 420px) {
  .app {
    padding: 24px 12px;
  }

  .example-card {
    padding: 16px;
    border-radius: 12px;
  }

  .app__header h1 {
    font-size: 24px;
  }

  .example-section h2 {
    font-size: 18px;
  }
}
</style>