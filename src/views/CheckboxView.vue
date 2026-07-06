<script setup lang="ts">
import { computed, ref } from "vue";

import { Checkbox, CheckboxGroup } from "/src/components/checkbox";
import { Switch } from "/src/components/switch";

/**
 * 단일 Checkbox 상태입니다.
 */
const basicChecked = ref(false);

/**
 * helperText 예제용 Checkbox 상태입니다.
 */
const marketingChecked = ref(false);

/**
 * 에러 예제용 Checkbox 상태입니다.
 */
const privacyChecked = ref(false);

/**
 * Switch 상태입니다.
 */
const notificationEnabled = ref(false);

/**
 * 다크 모드 Switch 예제 상태입니다.
 */
const darkModeEnabled = ref(false);

/**
 * 약관 그룹에서 선택된 값 목록입니다.
 */
const agreementValues = ref<string[]>([]);

/**
 * disabled 항목이 포함된 그룹에서 선택된 값 목록입니다.
 */
const disabledGroupValues = ref<string[]>(["required"]);

/**
 * 약관 전체 선택 예제 옵션입니다.
 */
const agreementOptions = [
  {
    label: "서비스 이용약관 동의",
    value: "terms",
  },
  {
    label: "개인정보 수집 및 이용 동의",
    value: "privacy",
  },
  {
    label: "마케팅 정보 수신 동의",
    value: "marketing",
  },
];

/**
 * 일부 항목이 disabled 된 예제 옵션입니다.
 */
const disabledOptions = [
  {
    label: "필수 약관",
    value: "required",
    disabled: true,
  },
  {
    label: "개인정보 처리방침 동의",
    value: "privacy",
  },
  {
    label: "이벤트 정보 수신 동의",
    value: "event",
  },
];

/**
 * 필수 약관 동의 여부를 계산합니다.
 */
const isRequiredAgreementChecked = computed(() => {
  return (
    agreementValues.value.includes("terms") &&
    agreementValues.value.includes("privacy")
  );
});

/**
 * 현재 선택된 약관 값을 화면에 표시하기 위한 텍스트입니다.
 */
const agreementResultText = computed(() => {
  if (agreementValues.value.length === 0) {
    return "선택된 약관이 없습니다.";
  }

  return agreementValues.value.join(", ");
});

/**
 * disabled 그룹의 선택 값을 화면에 표시하기 위한 텍스트입니다.
 */
const disabledGroupResultText = computed(() => {
  if (disabledGroupValues.value.length === 0) {
    return "선택된 항목이 없습니다.";
  }

  return disabledGroupValues.value.join(", ");
});

/**
 * 전체 상태를 초기화합니다.
 */
const resetAll = () => {
  basicChecked.value = false;
  marketingChecked.value = false;
  privacyChecked.value = false;
  notificationEnabled.value = false;
  darkModeEnabled.value = false;
  agreementValues.value = [];
  disabledGroupValues.value = ["required"];
};
</script>

<template>
  <main class="app">
    <section class="app__header">
      <p class="app__eyebrow">Vue 3 Form Components</p>

      <div class="app__header-row">
        <div>
          <h1 class="app__title">
            Checkbox / CheckboxGroup / Switch 예제
          </h1>

          <p class="app__description">
            단일 체크박스, 전체 선택 그룹, disabled 항목, Switch 상태 변경을
            하나의 페이지에서 확인할 수 있는 예제입니다.
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
      <!-- 기본 Checkbox 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            기본 Checkbox
          </h2>

          <p class="example-card__description">
            가장 기본적인 체크박스 사용 예제입니다.
          </p>
        </div>

        <div class="example-card__body">
          <Checkbox v-model="basicChecked">
            이용약관에 동의합니다
          </Checkbox>

          <div class="state-box">
            현재 상태:
            <strong>
              {{ basicChecked ? "선택됨" : "선택 안 됨" }}
            </strong>
          </div>
        </div>
      </article>

      <!-- helperText Checkbox 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            helperText Checkbox
          </h2>

          <p class="example-card__description">
            선택 항목이나 부가 설명이 필요한 경우 사용할 수 있습니다.
          </p>
        </div>

        <div class="example-card__body">
          <Checkbox
            id="marketing"
            v-model="marketingChecked"
            helper-text="선택 동의 항목입니다."
          >
            마케팅 정보 수신에 동의합니다
          </Checkbox>

          <div class="state-box">
            마케팅 수신:
            <strong>
              {{ marketingChecked ? "동의" : "미동의" }}
            </strong>
          </div>
        </div>
      </article>

      <!-- Error Checkbox 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            에러 Checkbox
          </h2>

          <p class="example-card__description">
            필수 동의 항목이 선택되지 않았을 때 에러 상태를 표시합니다.
          </p>
        </div>

        <div class="example-card__body">
          <Checkbox
            id="privacy"
            v-model="privacyChecked"
            :error="!privacyChecked"
            error-message="필수 동의 항목입니다."
          >
            개인정보 수집에 동의합니다
          </Checkbox>

          <div class="state-box">
            개인정보 동의:
            <strong>
              {{ privacyChecked ? "완료" : "필요" }}
            </strong>
          </div>
        </div>
      </article>

      <!-- Switch 기본 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            Switch
          </h2>

          <p class="example-card__description">
            on/off 상태를 표현할 때 사용하는 컴포넌트입니다.
          </p>
        </div>

        <div class="example-card__body">
          <Switch v-model="notificationEnabled">
            알림 받기
          </Switch>

          <Switch v-model="darkModeEnabled">
            다크 모드 사용
          </Switch>

          <div class="state-box">
            알림:
            <strong>
              {{ notificationEnabled ? "ON" : "OFF" }}
            </strong>
            /
            다크 모드:
            <strong>
              {{ darkModeEnabled ? "ON" : "OFF" }}
            </strong>
          </div>
        </div>
      </article>

      <!-- CheckboxGroup 전체 선택 예제 -->
      <article class="example-card example-card--wide">
        <div class="example-card__header">
          <h2 class="example-card__title">
            CheckboxGroup 전체 선택
          </h2>

          <p class="example-card__description">
            전체 선택, 전체 해제, 일부 선택 상태를 한 번에 확인할 수 있습니다.
          </p>
        </div>

        <div class="example-card__body">
          <CheckboxGroup
            v-model="agreementValues"
            all-label="약관 전체 동의"
            :options="agreementOptions"
          />

          <div class="result-panel">
            <p>
              필수 약관 상태:
              <strong>
                {{ isRequiredAgreementChecked ? "완료" : "미완료" }}
              </strong>
            </p>

            <p>
              선택된 값:
              <code>{{ agreementResultText }}</code>
            </p>
          </div>
        </div>
      </article>

      <!-- disabled 항목 포함 CheckboxGroup 예제 -->
      <article class="example-card example-card--wide">
        <div class="example-card__header">
          <h2 class="example-card__title">
            disabled 항목 포함 CheckboxGroup
          </h2>

          <p class="example-card__description">
            특정 항목은 기본 선택 상태로 유지하고 사용자가 변경하지 못하게 할 수 있습니다.
          </p>
        </div>

        <div class="example-card__body">
          <CheckboxGroup
            v-model="disabledGroupValues"
            all-label="전체 선택"
            :options="disabledOptions"
          />

          <div class="result-panel">
            <p>
              선택된 값:
              <code>{{ disabledGroupResultText }}</code>
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
  max-width: 720px;
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

.result-panel strong {
  color: #111827;
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
}

</style>