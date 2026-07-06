<script setup lang="ts">
import { ref } from "vue";

import { Modal } from "/src/components/modal";

/**
 * 기본 모달 열림 상태입니다.
 */
const basicOpen = ref(false);

/**
 * 삭제 확인 모달 열림 상태입니다.
 */
const deleteOpen = ref(false);

/**
 * 배경 클릭으로 닫히지 않는 모달 열림 상태입니다.
 */
const overlayBlockOpen = ref(false);

/**
 * ESC 키로 닫히지 않는 모달 열림 상태입니다.
 */
const escBlockOpen = ref(false);

/**
 * 닫기 버튼이 없는 모달 열림 상태입니다.
 */
const hideCloseOpen = ref(false);

/**
 * 전체 화면 모달 열림 상태입니다.
 */
const fullScreenOpen = ref(false);

/**
 * title slot 모달 열림 상태입니다.
 */
const titleSlotOpen = ref(false);

/**
 * 긴 콘텐츠 모달 열림 상태입니다.
 */
const longContentOpen = ref(false);

/**
 * 삭제 실행 예제 함수입니다.
 */
const handleDelete = () => {
  alert("삭제되었습니다.");
  deleteOpen.value = false;
};

/**
 * 확인 버튼 예제 함수입니다.
 */
const handleConfirm = () => {
  alert("확인되었습니다.");
  basicOpen.value = false;
};
</script>

<template>
  <main class="app">
    <section class="app__header">
      <h1>Modal 예제 모음</h1>

      <p>
        기본 모달, 삭제 확인 모달, 배경 클릭 방지, ESC 닫기 방지,
        닫기 버튼 숨김, 전체 화면 모달, title slot, 긴 콘텐츠 모달을
        한 페이지에서 확인하는 예제입니다.
      </p>
    </section>

    <!-- 기본 모달 -->
    <section class="example-section">
      <h2>기본 모달</h2>

      <div class="example-card">
        <p class="example-description">
          가장 기본적인 모달입니다. 제목, 본문, footer 버튼 영역을 사용합니다.
        </p>

        <button
          type="button"
          class="primary-button"
          @click="basicOpen = true"
        >
          기본 모달 열기
        </button>

        <Modal
          v-model:open="basicOpen"
          title="회원 정보"
        >
          <div class="modal-content">
            <p>
              회원 정보를 확인해주세요.
            </p>

            <ul>
              <li>이름: 홍길동</li>
              <li>이메일: test@test.com</li>
              <li>상태: 활성</li>
            </ul>
          </div>

          <template #footer>
            <button
              type="button"
              class="secondary-button"
              @click="basicOpen = false"
            >
              취소
            </button>

            <button
              type="button"
              class="primary-button"
              @click="handleConfirm"
            >
              확인
            </button>
          </template>
        </Modal>
      </div>
    </section>

    <!-- 삭제 확인 모달 -->
    <section class="example-section">
      <h2>삭제 확인 모달</h2>

      <div class="example-card">
        <p class="example-description">
          위험한 작업을 실행하기 전에 사용자에게 한 번 더 확인을 받는 모달입니다.
        </p>

        <button
          type="button"
          class="danger-button"
          @click="deleteOpen = true"
        >
          삭제 모달 열기
        </button>

        <Modal
          v-model:open="deleteOpen"
          title="삭제 확인"
          size="sm"
        >
          <div class="modal-content">
            <p>
              정말 삭제하시겠습니까?
            </p>

            <p class="warning-text">
              삭제된 데이터는 복구할 수 없습니다.
            </p>
          </div>

          <template #footer>
            <button
              type="button"
              class="secondary-button"
              @click="deleteOpen = false"
            >
              취소
            </button>

            <button
              type="button"
              class="danger-button"
              @click="handleDelete"
            >
              삭제
            </button>
          </template>
        </Modal>
      </div>
    </section>

    <!-- 배경 클릭으로 닫히지 않는 모달 -->
    <section class="example-section">
      <h2>배경 클릭으로 닫히지 않는 모달</h2>

      <div class="example-card">
        <p class="example-description">
          중요한 안내나 필수 확인처럼 명시적으로 버튼을 눌러야 닫히는 모달입니다.
        </p>

        <button
          type="button"
          class="primary-button"
          @click="overlayBlockOpen = true"
        >
          중요 안내 열기
        </button>

        <Modal
          v-model:open="overlayBlockOpen"
          title="중요 안내"
          :close-on-overlay-click="false"
        >
          <div class="modal-content">
            <p>
              이 모달은 배경을 클릭해도 닫히지 않습니다.
            </p>

            <p>
              사용자가 반드시 내용을 확인한 뒤 버튼을 눌러야 하는 상황에서 사용합니다.
            </p>
          </div>

          <template #footer>
            <button
              type="button"
              class="primary-button"
              @click="overlayBlockOpen = false"
            >
              확인했습니다
            </button>
          </template>
        </Modal>
      </div>
    </section>

    <!-- ESC 키로 닫히지 않는 모달 -->
    <section class="example-section">
      <h2>ESC 키로 닫히지 않는 모달</h2>

      <div class="example-card">
        <p class="example-description">
          처리 중 상태나 필수 단계처럼 ESC 키로 닫히면 안 되는 경우에 사용합니다.
        </p>

        <button
          type="button"
          class="primary-button"
          @click="escBlockOpen = true"
        >
          ESC 방지 모달 열기
        </button>

        <Modal
          v-model:open="escBlockOpen"
          title="처리 중"
          :close-on-esc="false"
        >
          <div class="modal-content">
            <p>
              이 모달은 ESC 키를 눌러도 닫히지 않습니다.
            </p>

            <p>
              닫으려면 아래 버튼을 눌러주세요.
            </p>
          </div>

          <template #footer>
            <button
              type="button"
              class="primary-button"
              @click="escBlockOpen = false"
            >
              닫기
            </button>
          </template>
        </Modal>
      </div>
    </section>

    <!-- 닫기 버튼 숨김 -->
    <section class="example-section">
      <h2>닫기 버튼 숨김</h2>

      <div class="example-card">
        <p class="example-description">
          우측 상단 닫기 버튼을 숨기고 footer 버튼으로만 닫는 예제입니다.
        </p>

        <button
          type="button"
          class="primary-button"
          @click="hideCloseOpen = true"
        >
          닫기 버튼 없는 모달 열기
        </button>

        <Modal
          v-model:open="hideCloseOpen"
          title="필수 확인"
          :show-close-button="false"
          :close-on-overlay-click="false"
        >
          <div class="modal-content">
            <p>
              닫기 버튼이 없는 모달입니다.
            </p>

            <p>
              사용자가 하단 버튼을 눌러야만 닫을 수 있습니다.
            </p>
          </div>

          <template #footer>
            <button
              type="button"
              class="primary-button"
              @click="hideCloseOpen = false"
            >
              동의하고 닫기
            </button>
          </template>
        </Modal>
      </div>
    </section>

    <!-- 전체 화면 모달 -->
    <section class="example-section">
      <h2>전체 화면 모달</h2>

      <div class="example-card">
        <p class="example-description">
          상세 보기, 작성 화면, 모바일 전체 화면 UI에 사용할 수 있는 예제입니다.
        </p>

        <button
          type="button"
          class="primary-button"
          @click="fullScreenOpen = true"
        >
          전체 화면 모달 열기
        </button>

        <Modal
          v-model:open="fullScreenOpen"
          title="상세 보기"
          full-screen
        >
          <div class="modal-content modal-content--full">
            <h3>상품 상세 정보</h3>

            <p>
              전체 화면 모달은 화면 전체를 사용하는 입력 폼, 상세 페이지,
              이미지 보기, 모바일 작성 화면 등에 사용할 수 있습니다.
            </p>

            <div class="detail-grid">
              <div class="detail-card">
                <strong>상품명</strong>
                <span>프리미엄 키보드</span>
              </div>

              <div class="detail-card">
                <strong>판매가</strong>
                <span>129,000원</span>
              </div>

              <div class="detail-card">
                <strong>재고</strong>
                <span>24개</span>
              </div>

              <div class="detail-card">
                <strong>상태</strong>
                <span>판매중</span>
              </div>
            </div>
          </div>

          <template #footer>
            <button
              type="button"
              class="secondary-button"
              @click="fullScreenOpen = false"
            >
              닫기
            </button>

            <button
              type="button"
              class="primary-button"
              @click="fullScreenOpen = false"
            >
              저장
            </button>
          </template>
        </Modal>
      </div>
    </section>

    <!-- title slot 사용 -->
    <section class="example-section">
      <h2>title slot 사용</h2>

      <div class="example-card">
        <p class="example-description">
          제목 영역에 배지, 아이콘, 강조 텍스트를 함께 넣는 예제입니다.
        </p>

        <button
          type="button"
          class="primary-button"
          @click="titleSlotOpen = true"
        >
          title slot 모달 열기
        </button>

        <Modal v-model:open="titleSlotOpen">
          <template #title>
            <span class="modal-title-with-badge">
              회원 정보
              <span class="title-badge">필수</span>
            </span>
          </template>

          <div class="modal-content">
            <p>
              제목 영역을 slot으로 구성하면 텍스트 외에도 배지나 아이콘을 함께 넣을 수 있습니다.
            </p>
          </div>

          <template #footer>
            <button
              type="button"
              class="primary-button"
              @click="titleSlotOpen = false"
            >
              확인
            </button>
          </template>
        </Modal>
      </div>
    </section>

    <!-- 긴 콘텐츠 모달 -->
    <section class="example-section">
      <h2>긴 콘텐츠 모달</h2>

      <div class="example-card">
        <p class="example-description">
          내용이 길어질 때 본문 영역만 스크롤되는지 확인하는 예제입니다.
        </p>

        <button
          type="button"
          class="primary-button"
          @click="longContentOpen = true"
        >
          긴 콘텐츠 모달 열기
        </button>

        <Modal
          v-model:open="longContentOpen"
          title="이용약관"
          size="lg"
        >
          <div class="modal-content">
            <section
              v-for="index in 12"
              :key="index"
              class="terms-section"
            >
              <h3>제 {{ index }} 조</h3>

              <p>
                이 영역은 긴 콘텐츠가 들어가는 상황을 확인하기 위한 예제입니다.
                모달 전체가 화면을 벗어나지 않고, 본문 영역만 스크롤되는지 확인할 수 있습니다.
              </p>

              <p>
                실제 프로젝트에서는 이용약관, 개인정보 처리방침, 상세 설명,
                긴 폼 입력 화면 등이 이 구조에 해당합니다.
              </p>
            </section>
          </div>

          <template #footer>
            <button
              type="button"
              class="secondary-button"
              @click="longContentOpen = false"
            >
              닫기
            </button>

            <button
              type="button"
              class="primary-button"
              @click="longContentOpen = false"
            >
              동의
            </button>
          </template>
        </Modal>
      </div>
    </section>
  </main>
</template>

<style scoped>
/**
 * App 내부 모든 요소가 padding, border를 포함해서
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
  gap: 16px;

  width: 100%;
  min-width: 0;
  max-width: 100%;

  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 16px;

  background: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.example-description {
  margin: 0;

  font-size: 14px;
  line-height: 1.6;
  color: #4b5563;
}

.primary-button,
.secondary-button,
.danger-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  min-width: 88px;
  height: 40px;
  padding: 0 16px;

  border-radius: 8px;

  font-size: 14px;
  font-weight: 600;
  line-height: 1;

  cursor: pointer;
  white-space: nowrap;
}

.primary-button {
  border: 0;

  background: #2563eb;
  color: #ffffff;
}

.primary-button:hover {
  background: #1d4ed8;
}

.secondary-button {
  border: 1px solid #d1d5db;

  background: #ffffff;
  color: #111827;
}

.secondary-button:hover {
  background: #f9fafb;
}

.danger-button {
  border: 0;

  background: #dc2626;
  color: #ffffff;
}

.danger-button:hover {
  background: #b91c1c;
}

.modal-content {
  display: grid;
  gap: 14px;

  font-size: 14px;
  line-height: 1.6;
  color: #374151;
}

.modal-content p {
  margin: 0;
}

.modal-content ul {
  margin: 0;
  padding-left: 20px;
}

.modal-content--full {
  gap: 20px;
}

.modal-content--full h3 {
  margin: 0;

  font-size: 22px;
  line-height: 1.4;
  color: #111827;
}

.warning-text {
  color: #dc2626;
  font-weight: 600;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.detail-card {
  display: grid;
  gap: 8px;

  padding: 16px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background: #f9fafb;
}

.detail-card strong {
  font-size: 13px;
  color: #6b7280;
}

.detail-card span {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.modal-title-with-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.title-badge {
  display: inline-flex;
  align-items: center;

  height: 22px;
  padding: 0 8px;

  border-radius: 9999px;

  background: #dbeafe;
  color: #2563eb;

  font-size: 12px;
  font-weight: 700;
}

.terms-section {
  display: grid;
  gap: 8px;

  padding-bottom: 18px;

  border-bottom: 1px solid #e5e7eb;
}

.terms-section:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.terms-section h3 {
  margin: 0;

  font-size: 16px;
  line-height: 1.4;
  color: #111827;
}

/**
 * scoped style에서 Modal 내부 footer 버튼이
 * 좁은 화면에서도 밀리지 않도록 보정합니다.
 */
:deep(.modal__footer) {
  flex-wrap: wrap;
}

/**
 * 모달 내부 버튼들도 작은 화면에서 자연스럽게 줄바꿈될 수 있게 합니다.
 */
:deep(.modal__footer button) {
  min-width: 88px;
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

  .primary-button,
  .secondary-button,
  .danger-button {
    width: 100%;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  :deep(.modal__footer) {
    display: grid;
    grid-template-columns: 1fr;
  }

  :deep(.modal__footer button) {
    width: 100%;
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