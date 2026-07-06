<script setup lang="ts">
import { computed, ref } from "vue";
import { Alert } from "/src/components/alert";

/**
 * 닫을 수 있는 Alert 예제의 노출 상태입니다.
 */
const visibleWarningAlert = ref(true);

/**
 * 폼 검증용 입력값입니다.
 */
const email = ref("");
const password = ref("");

/**
 * 폼 검증 실패 시 보여줄 에러 메시지입니다.
 */
const formErrorMessage = ref("");

/**
 * 이메일 인증 안내 Alert 노출 상태입니다.
 */
const visibleEmailAlert = ref(true);

/**
 * 저장 완료 Alert 노출 상태입니다.
 */
const visibleSaveAlert = ref(false);

/**
 * 현재 폼 입력값이 유효한지 계산합니다.
 */
const isFormValid = computed(() => {
  return email.value.trim() !== "" && password.value.trim() !== "";
});

/**
 * 닫을 수 있는 경고 Alert를 다시 보여줍니다.
 */
const resetWarningAlert = () => {
  visibleWarningAlert.value = true;
};

/**
 * 폼 제출 함수입니다.
 */
const handleSubmit = () => {
  /**
   * 이메일이 비어 있으면 에러 Alert를 보여줍니다.
   */
  if (!email.value.trim()) {
    formErrorMessage.value = "이메일을 입력해주세요.";
    visibleSaveAlert.value = false;
    return;
  }

  /**
   * 비밀번호가 비어 있으면 에러 Alert를 보여줍니다.
   */
  if (!password.value.trim()) {
    formErrorMessage.value = "비밀번호를 입력해주세요.";
    visibleSaveAlert.value = false;
    return;
  }

  /**
   * 검증이 통과되면 에러 메시지를 비우고 저장 완료 Alert를 보여줍니다.
   */
  formErrorMessage.value = "";
  visibleSaveAlert.value = true;
};

/**
 * 폼 에러 Alert를 닫습니다.
 */
const closeFormError = () => {
  formErrorMessage.value = "";
};

/**
 * 저장 완료 Alert를 닫습니다.
 */
const closeSaveAlert = () => {
  visibleSaveAlert.value = false;
};

/**
 * 인증 메일 재발송 버튼 클릭 함수입니다.
 */
const resendEmail = () => {
  console.log("인증 메일 재발송");
};

/**
 * 이메일 인증 Alert를 닫습니다.
 */
const closeEmailAlert = () => {
  visibleEmailAlert.value = false;
};
</script>

<template>
  <main class="page">
    <header class="page__header">
      <span class="page__eyebrow">
        Vue UI Component
      </span>

      <h1 class="page__title">
        Alert 컴포넌트 예제
      </h1>

      <p class="page__description">
        Alert의 기본 상태, 닫기 기능, 폼 검증 메시지, 커스텀 슬롯, 액션 버튼 예제를 한 페이지에서 확인할 수 있습니다.
      </p>
    </header>

    <!-- 기본 variant 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          기본 상태
        </h2>

        <p class="section__description">
          success, error, warning, info 네 가지 상태를 확인하는 예제입니다.
        </p>
      </div>

      <div class="example-stack">
        <Alert
          variant="success"
          title="저장 완료"
        >
          입력한 정보가 정상적으로 저장되었습니다.
        </Alert>

        <Alert
          variant="error"
          title="오류 발생"
        >
          서버와 통신하는 중 문제가 발생했습니다.
        </Alert>

        <Alert
          variant="warning"
          title="주의가 필요합니다"
        >
          삭제한 데이터는 복구할 수 없습니다.
        </Alert>

        <Alert
          variant="info"
          title="안내"
        >
          회원 정보는 마이페이지에서 수정할 수 있습니다.
        </Alert>
      </div>
    </section>

    <!-- 닫기 가능한 Alert 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          닫을 수 있는 Alert
        </h2>

        <p class="section__description">
          closable props와 @close 이벤트를 사용해 부모에서 노출 여부를 제어합니다.
        </p>
      </div>

      <div class="example-stack">
        <Alert
          v-if="visibleWarningAlert"
          variant="warning"
          title="입력 내용을 확인해주세요"
          closable
          @close="visibleWarningAlert = false"
        >
          필수 입력 항목이 비어 있습니다.
        </Alert>

        <button
          v-if="!visibleWarningAlert"
          type="button"
          class="button button--secondary"
          @click="resetWarningAlert"
        >
          Alert 다시 보기
        </button>
      </div>
    </section>

    <!-- 폼 검증 Alert 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          폼 검증 메시지
        </h2>

        <p class="section__description">
          입력값 검증 결과에 따라 error Alert와 success Alert를 보여주는 예제입니다.
        </p>
      </div>

      <form
        class="form"
        @submit.prevent="handleSubmit"
      >
        <Alert
          v-if="formErrorMessage"
          variant="error"
          title="로그인 실패"
          closable
          @close="closeFormError"
        >
          {{ formErrorMessage }}
        </Alert>

        <Alert
          v-if="visibleSaveAlert"
          variant="success"
          title="검증 완료"
          closable
          @close="closeSaveAlert"
        >
          입력값 검증이 완료되었습니다.
        </Alert>

        <div class="form__field">
          <label
            class="form__label"
            for="email"
          >
            이메일
          </label>

          <input
            id="email"
            v-model="email"
            class="form__input"
            type="email"
            placeholder="example@email.com"
          />
        </div>

        <div class="form__field">
          <label
            class="form__label"
            for="password"
          >
            비밀번호
          </label>

          <input
            id="password"
            v-model="password"
            class="form__input"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>

        <button
          type="submit"
          class="button button--primary"
          :disabled="!isFormValid"
        >
          로그인 검증
        </button>
      </form>
    </section>

    <!-- 커스텀 아이콘 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          커스텀 아이콘
        </h2>

        <p class="section__description">
          icon slot을 사용하면 기본 아이콘 대신 원하는 아이콘을 넣을 수 있습니다.
        </p>
      </div>

      <div class="example-stack">
        <Alert
          variant="info"
          title="이메일 인증이 필요합니다"
        >
          <template #icon>
            📩
          </template>

          가입을 완료하려면 이메일 인증을 진행해주세요.
        </Alert>

        <Alert
          variant="success"
          title="새 메시지가 도착했습니다"
        >
          <template #icon>
            🔔
          </template>

          알림 설정에서 메시지 수신 여부를 변경할 수 있습니다.
        </Alert>
      </div>
    </section>

    <!-- title slot 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          제목 slot 커스텀
        </h2>

        <p class="section__description">
          제목 안에 배지나 강조 텍스트가 필요할 때 title slot을 사용합니다.
        </p>
      </div>

      <Alert variant="warning">
        <template #title>
          <span class="custom-title">
            주의가 필요합니다
            <em class="custom-title__badge">
              필수 확인
            </em>
          </span>
        </template>

        삭제한 데이터는 복구할 수 없으므로 진행 전에 다시 확인해주세요.
      </Alert>
    </section>

    <!-- 액션 버튼 포함 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          액션 버튼 포함
        </h2>

        <p class="section__description">
          Alert 내부에 설명 문구와 버튼을 함께 넣어 사용자 행동을 유도할 수 있습니다.
        </p>
      </div>

      <Alert
        v-if="visibleEmailAlert"
        variant="info"
        title="이메일 인증이 필요합니다"
        closable
        @close="closeEmailAlert"
      >
        <p class="alert-example__text">
          가입을 완료하려면 이메일 인증을 진행해주세요. 인증 메일을 받지 못했다면 다시 보낼 수 있습니다.
        </p>

        <div class="alert-example__actions">
          <button
            type="button"
            class="button button--primary"
            @click="resendEmail"
          >
            인증 메일 다시 보내기
          </button>
        </div>
      </Alert>

      <button
        v-else
        type="button"
        class="button button--secondary"
        @click="visibleEmailAlert = true"
      >
        이메일 인증 Alert 다시 보기
      </button>
    </section>

    <!-- 아이콘 숨김 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          아이콘 없는 Alert
        </h2>

        <p class="section__description">
          showIcon 값을 false로 전달하면 텍스트 중심의 Alert로 사용할 수 있습니다.
        </p>
      </div>

      <Alert
        variant="success"
        title="간단한 완료 메시지"
        :show-icon="false"
      >
        별도의 아이콘 없이 메시지만 보여주는 형태입니다.
      </Alert>
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

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form__label {
  color: #374151;
  font-size: 14px;
  font-weight: 700;
}

.form__input {
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

.form__input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.14);
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

.custom-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.custom-title__badge {
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  background: #fee2e2;
  color: #b91c1c;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
}

.alert-example__text {
  margin: 0;
}

.alert-example__actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
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

  .button {
    width: 100%;
  }

  .alert-example__actions {
    flex-direction: column;
  }
}
</style>