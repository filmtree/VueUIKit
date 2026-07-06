<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "/src/components/button/Button.vue";

/**
 * 저장 버튼의 loading 상태입니다.
 */
const saveLoading = ref(false);

/**
 * 제출 버튼의 loading 상태입니다.
 */
const submitLoading = ref(false);

/**
 * 좋아요 상태입니다.
 */
const liked = ref(false);

/**
 * 북마크 상태입니다.
 */
const bookmarked = ref(false);

/**
 * 삭제 확인 상태입니다.
 */
const deleteConfirmVisible = ref(false);

/**
 * 이메일 입력값입니다.
 */
const email = ref("");

/**
 * 비밀번호 입력값입니다.
 */
const password = ref("");

/**
 * 폼 메시지입니다.
 */
const formMessage = ref("");

/**
 * 폼 입력값이 모두 채워졌는지 확인합니다.
 */
const isFormValid = computed(() => {
  return email.value.trim() !== "" && password.value.trim() !== "";
});

/**
 * 저장 버튼 클릭 예제입니다.
 */
const handleSave = async () => {
  saveLoading.value = true;

  try {
    /**
     * 실제 프로젝트에서는 API 요청 코드가 들어갑니다.
     */
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("저장 완료");
  } finally {
    saveLoading.value = false;
  }
};

/**
 * 폼 제출 예제입니다.
 */
const handleSubmit = async () => {
  if (!isFormValid.value) {
    formMessage.value = "이메일과 비밀번호를 모두 입력해주세요.";
    return;
  }

  submitLoading.value = true;
  formMessage.value = "";

  try {
    /**
     * 실제 프로젝트에서는 로그인 API 요청 코드가 들어갑니다.
     */
    await new Promise((resolve) => setTimeout(resolve, 1000));

    formMessage.value = "로그인 요청이 완료되었습니다.";
  } finally {
    submitLoading.value = false;
  }
};

/**
 * 삭제 버튼 클릭 시 확인 영역을 보여줍니다.
 */
const showDeleteConfirm = () => {
  deleteConfirmVisible.value = true;
};

/**
 * 삭제를 취소합니다.
 */
const cancelDelete = () => {
  deleteConfirmVisible.value = false;
};

/**
 * 삭제를 실행합니다.
 */
const confirmDelete = () => {
  console.log("삭제 실행");
  deleteConfirmVisible.value = false;
};

/**
 * 좋아요 상태를 변경합니다.
 */
const toggleLike = () => {
  liked.value = !liked.value;
};

/**
 * 북마크 상태를 변경합니다.
 */
const toggleBookmark = () => {
  bookmarked.value = !bookmarked.value;
};
</script>

<template>
  <main class="page">
    <header class="page__header">
      <span class="page__eyebrow">
        Vue UI Component
      </span>

      <h1 class="page__title">
        Button 컴포넌트 예제
      </h1>

      <p class="page__description">
        Button의 기본 사용, variant, size, loading, disabled, fullWidth, 아이콘 슬롯, iconOnly, form submit 예제를 한 페이지에서 확인할 수 있습니다.
      </p>
    </header>

    <!-- 기본 버튼 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          기본 버튼
        </h2>

        <p class="section__description">
          가장 기본적인 버튼 사용 예제입니다.
        </p>
      </div>

      <div class="button-row">
        <Button>
          저장
        </Button>

        <Button variant="secondary">
          취소
        </Button>

        <Button variant="outline">
          미리보기
        </Button>

        <Button variant="danger">
          삭제
        </Button>
      </div>
    </section>

    <!-- variant 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Variant
        </h2>

        <p class="section__description">
          버튼의 목적에 따라 primary, secondary, outline, danger 스타일을 사용할 수 있습니다.
        </p>
      </div>

      <div class="button-row">
        <Button variant="primary">
          Primary
        </Button>

        <Button variant="secondary">
          Secondary
        </Button>

        <Button variant="outline">
          Outline
        </Button>

        <Button variant="danger">
          Danger
        </Button>
      </div>
    </section>

    <!-- size 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Size
        </h2>

        <p class="section__description">
          sm, md, lg 크기를 비교하는 예제입니다.
        </p>
      </div>

      <div class="button-row button-row--center">
        <Button size="sm">
          Small
        </Button>

        <Button size="md">
          Medium
        </Button>

        <Button size="lg">
          Large
        </Button>
      </div>
    </section>

    <!-- loading 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Loading
        </h2>

        <p class="section__description">
          loading 상태에서는 버튼 클릭을 막고 Loading 문구를 보여줍니다.
        </p>
      </div>

      <div class="button-row">
        <Button
          :loading="saveLoading"
          @click="handleSave"
        >
          저장하기
        </Button>

        <Button
          variant="secondary"
          loading
        >
          처리중
        </Button>

        <Button
          variant="danger"
          loading
        >
          삭제중
        </Button>
      </div>
    </section>

    <!-- disabled 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Disabled
        </h2>

        <p class="section__description">
          disabled 상태에서는 클릭할 수 없고 시각적으로 비활성화됩니다.
        </p>
      </div>

      <div class="button-row">
        <Button disabled>
          저장 불가
        </Button>

        <Button
          variant="secondary"
          disabled
        >
          취소 불가
        </Button>

        <Button
          variant="outline"
          disabled
        >
          미리보기 불가
        </Button>

        <Button
          variant="danger"
          disabled
        >
          삭제 불가
        </Button>
      </div>
    </section>

    <!-- fullWidth 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Full Width
        </h2>

        <p class="section__description">
          로그인, 회원가입, 결제 버튼처럼 부모 너비를 꽉 채우는 버튼 예제입니다.
        </p>
      </div>

      <div class="full-width-box">
        <Button full-width>
          로그인
        </Button>

        <Button
          variant="outline"
          full-width
        >
          회원가입
        </Button>
      </div>
    </section>

    <!-- 왼쪽 아이콘 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Left Icon
        </h2>

        <p class="section__description">
          #leftIcon 슬롯을 사용해 버튼 왼쪽에 아이콘을 넣는 예제입니다.
        </p>
      </div>

      <div class="button-row">
        <Button>
          <template #leftIcon>
            <span class="icon-text">
              🔍
            </span>
          </template>

          검색
        </Button>

        <Button variant="secondary">
          <template #leftIcon>
            <span class="icon-text">
              ↓
            </span>
          </template>

          다운로드
        </Button>

        <Button variant="outline">
          <template #leftIcon>
            <span class="icon-text">
              +
            </span>
          </template>

          추가
        </Button>
      </div>
    </section>

    <!-- 오른쪽 아이콘 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Right Icon
        </h2>

        <p class="section__description">
          #rightIcon 슬롯을 사용해 버튼 오른쪽에 아이콘을 넣는 예제입니다.
        </p>
      </div>

      <div class="button-row">
        <Button variant="outline">
          상세보기

          <template #rightIcon>
            <span class="icon-text">
              →
            </span>
          </template>
        </Button>

        <Button variant="secondary">
          더보기

          <template #rightIcon>
            <span class="icon-text">
              ▾
            </span>
          </template>
        </Button>

        <Button>
          다음 단계

          <template #rightIcon>
            <span class="icon-text">
              →
            </span>
          </template>
        </Button>
      </div>
    </section>

    <!-- 양쪽 아이콘 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Left / Right Icon
        </h2>

        <p class="section__description">
          왼쪽과 오른쪽 슬롯을 동시에 사용하는 예제입니다.
        </p>
      </div>

      <div class="button-row">
        <Button variant="secondary">
          <template #leftIcon>
            <span class="icon-text">
              📄
            </span>
          </template>

          문서 다운로드

          <template #rightIcon>
            <span class="icon-text">
              ↓
            </span>
          </template>
        </Button>

        <Button variant="outline">
          <template #leftIcon>
            <span class="icon-text">
              ⚙
            </span>
          </template>

          설정

          <template #rightIcon>
            <span class="icon-text">
              →
            </span>
          </template>
        </Button>
      </div>
    </section>

    <!-- iconOnly 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Icon Only
        </h2>

        <p class="section__description">
          아이콘만 보이는 버튼은 반드시 aria-label을 전달해야 합니다.
        </p>
      </div>

      <div class="button-row">
        <Button
          icon-only
          aria-label="검색"
        >
          🔍
        </Button>

        <Button
          icon-only
          variant="secondary"
          aria-label="좋아요"
          @click="toggleLike"
        >
          {{ liked ? "♥" : "♡" }}
        </Button>

        <Button
          icon-only
          variant="outline"
          aria-label="북마크"
          @click="toggleBookmark"
        >
          {{ bookmarked ? "★" : "☆" }}
        </Button>

        <Button
          icon-only
          variant="danger"
          aria-label="삭제"
          @click="showDeleteConfirm"
        >
          🗑
        </Button>
      </div>

      <p class="result-text">
        좋아요:
        <strong>{{ liked ? "선택됨" : "선택 안 됨" }}</strong>
        /
        북마크:
        <strong>{{ bookmarked ? "선택됨" : "선택 안 됨" }}</strong>
      </p>
    </section>

    <!-- 폼 submit 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Form Submit
        </h2>

        <p class="section__description">
          기본 type은 button입니다. 폼 제출 버튼은 type="submit"을 명시해서 사용합니다.
        </p>
      </div>

      <form
        class="form"
        @submit.prevent="handleSubmit"
      >
        <div class="form__field">
          <label
            for="email"
            class="form__label"
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
            for="password"
            class="form__label"
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

        <Button
          type="submit"
          full-width
          :loading="submitLoading"
          :disabled="!isFormValid"
        >
          로그인
        </Button>

        <p
          v-if="formMessage"
          class="form-message"
        >
          {{ formMessage }}
        </p>
      </form>
    </section>

    <!-- 액션 버튼 그룹 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Action Button Group
        </h2>

        <p class="section__description">
          상세 페이지, 관리자 페이지, 모달 footer에서 자주 사용하는 버튼 배치 예제입니다.
        </p>
      </div>

      <div class="card-preview">
        <div class="card-preview__content">
          <h3 class="card-preview__title">
            게시글 제목
          </h3>

          <p class="card-preview__text">
            게시글 상세 화면에서 수정, 복사, 삭제 버튼을 배치한 예제입니다.
          </p>
        </div>

        <div class="card-preview__actions">
          <Button variant="outline">
            복사
          </Button>

          <Button variant="secondary">
            수정
          </Button>

          <Button
            variant="danger"
            @click="showDeleteConfirm"
          >
            삭제
          </Button>
        </div>
      </div>
    </section>

    <!-- 삭제 확인 예제 -->
    <section
      v-if="deleteConfirmVisible"
      class="section section--danger"
    >
      <div class="section__header">
        <h2 class="section__title">
          삭제 확인
        </h2>

        <p class="section__description">
          위험한 동작은 바로 실행하지 않고 한 번 더 확인하는 흐름으로 구성할 수 있습니다.
        </p>
      </div>

      <div class="delete-box">
        <p class="delete-box__text">
          정말 삭제하시겠습니까? 삭제한 데이터는 복구할 수 없습니다.
        </p>

        <div class="button-row">
          <Button
            variant="secondary"
            @click="cancelDelete"
          >
            취소
          </Button>

          <Button
            variant="danger"
            @click="confirmDelete"
          >
            삭제
          </Button>
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

.section--danger {
  border-color: #fecaca;
  background: #fef2f2;
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

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.button-row--center {
  align-items: center;
}

.full-width-box {
  display: grid;
  gap: 10px;
  max-width: 360px;
}

.icon-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  font-size: 15px;
  line-height: 1;
}

.result-text {
  margin: 12px 0 0;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.6;
}

.form {
  display: grid;
  gap: 14px;
  max-width: 420px;
}

.form__field {
  display: grid;
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

.form-message {
  margin: 0;
  padding: 12px 14px;
  border-radius: 10px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 14px;
  line-height: 1.6;
}

.card-preview {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #f9fafb;
}

.card-preview__content {
  min-width: 0;
}

.card-preview__title {
  margin: 0;
  font-size: 18px;
  line-height: 1.4;
}

.card-preview__text {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.card-preview__actions {
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
}

.delete-box {
  display: grid;
  gap: 14px;
}

.delete-box__text {
  margin: 0;
  color: #991b1b;
  font-size: 14px;
  line-height: 1.7;
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

  .button-row {
    flex-direction: column;
  }

  .full-width-box {
    max-width: none;
  }

  .card-preview {
    flex-direction: column;
  }

  .card-preview__actions {
    width: 100%;
    flex-direction: column;
  }
}
</style>