<script setup lang="ts">
import { ref } from "vue";

import { Loading } from "/src/components/loading";

/**
 * 버튼 로딩 상태입니다.
 */
const buttonLoading = ref(false);

/**
 * 섹션 로딩 상태입니다.
 */
const sectionLoading = ref(true);

/**
 * 오버레이 로딩 상태입니다.
 */
const overlayLoading = ref(false);

/**
 * 전체 화면 로딩 상태입니다.
 */
const fullscreenLoading = ref(false);

/**
 * 버튼 저장 예제입니다.
 */
const handleSave = async () => {
  try {
    buttonLoading.value = true;

    /**
     * 실제 프로젝트에서는 저장 API 요청이 들어갑니다.
     */
    await new Promise((resolve) => setTimeout(resolve, 1200));

    alert("저장되었습니다.");
  } finally {
    buttonLoading.value = false;
  }
};

/**
 * 섹션 로딩 상태를 전환합니다.
 */
const toggleSectionLoading = () => {
  sectionLoading.value = !sectionLoading.value;
};

/**
 * 오버레이 로딩 예제입니다.
 */
const handleRefresh = async () => {
  try {
    overlayLoading.value = true;

    /**
     * 실제 프로젝트에서는 목록 재조회 API 요청이 들어갑니다.
     */
    await new Promise((resolve) => setTimeout(resolve, 1200));
  } finally {
    overlayLoading.value = false;
  }
};

/**
 * 전체 화면 로딩 예제입니다.
 */
const handleFullscreenLoading = async () => {
  try {
    fullscreenLoading.value = true;

    /**
     * 실제 프로젝트에서는 앱 초기화, 로그인 체크,
     * 권한 확인 같은 비동기 작업이 들어갑니다.
     */
    await new Promise((resolve) => setTimeout(resolve, 1600));
  } finally {
    fullscreenLoading.value = false;
  }
};
</script>

<template>
  <main class="app">
    <section class="app__header">
      <h1>Loading 예제 모음</h1>

      <p>
        spinner, dots, size, inline, center, overlay, fullscreen 로딩을
        한 페이지에서 확인할 수 있는 예제입니다.
      </p>
    </section>

    <!-- 기본 Loading -->
    <section class="example-section">
      <h2>기본 Loading</h2>

      <div class="example-card">
        <Loading label="불러오는 중입니다." />
      </div>
    </section>

    <!-- 크기별 Loading -->
    <section class="example-section">
      <h2>크기별 Loading</h2>

      <div class="example-card example-card--row">
        <div class="loading-preview">
          <Loading
            mode="inline"
            size="sm"
            label="Small"
          />
        </div>

        <div class="loading-preview">
          <Loading
            mode="inline"
            size="md"
            label="Medium"
          />
        </div>

        <div class="loading-preview">
          <Loading
            mode="inline"
            size="lg"
            label="Large"
          />
        </div>
      </div>
    </section>

    <!-- Spinner / Dots -->
    <section class="example-section">
      <h2>Spinner / Dots</h2>

      <div class="example-grid">
        <div class="example-card">
          <Loading
            variant="spinner"
            label="Spinner 로딩"
          />
        </div>

        <div class="example-card">
          <Loading
            variant="dots"
            label="Dots 로딩"
          />
        </div>
      </div>
    </section>

    <!-- 버튼 안에서 사용하는 Loading -->
    <section class="example-section">
      <h2>버튼 안에서 사용하는 Loading</h2>

      <div class="example-card">
        <button
          type="button"
          class="save-button"
          :disabled="buttonLoading"
          @click="handleSave"
        >
          <Loading
            v-if="buttonLoading"
            mode="inline"
            size="sm"
            aria-label="저장 중"
          />

          <span>
            {{ buttonLoading ? "저장 중..." : "저장하기" }}
          </span>
        </button>
      </div>
    </section>

    <!-- 섹션 로딩 -->
    <section class="example-section">
      <h2>섹션 로딩</h2>

      <div class="example-card">
        <div class="example-actions">
          <button
            type="button"
            class="secondary-button"
            @click="toggleSectionLoading"
          >
            {{ sectionLoading ? "콘텐츠 보기" : "로딩 보기" }}
          </button>
        </div>

        <section class="content-box">
          <Loading
            v-if="sectionLoading"
            mode="center"
            label="회원 정보를 불러오는 중입니다."
          />

          <div
            v-else
            class="member-info"
          >
            <h3>회원 정보</h3>
            <p>이름: 홍길동</p>
            <p>이메일: test@test.com</p>
            <p>상태: 활성</p>
          </div>
        </section>
      </div>
    </section>

    <!-- Overlay Loading -->
    <section class="example-section">
      <h2>Overlay Loading</h2>

      <div class="example-card">
        <div class="table-box">
          <div class="table-box__header">
            <h3>회원 목록</h3>

            <button
              type="button"
              class="secondary-button"
              @click="handleRefresh"
            >
              새로고침
            </button>
          </div>

          <div class="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>상태</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>홍길동</td>
                  <td>test@test.com</td>
                  <td>활성</td>
                </tr>

                <tr>
                  <td>김관리</td>
                  <td>admin@test.com</td>
                  <td>대기</td>
                </tr>

                <tr>
                  <td>이사용</td>
                  <td>user@test.com</td>
                  <td>활성</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Loading
            v-if="overlayLoading"
            mode="overlay"
            label="목록을 다시 불러오는 중입니다."
          />
        </div>
      </div>
    </section>

    <!-- Fullscreen Loading -->
    <section class="example-section">
      <h2>Fullscreen Loading</h2>

      <div class="example-card">
        <button
          type="button"
          class="primary-button"
          @click="handleFullscreenLoading"
        >
          전체 화면 로딩 보기
        </button>
      </div>
    </section>

    <!-- 사용 기준 정리 -->
    <section class="example-section">
      <h2>사용 기준</h2>

      <div class="example-card">
        <ul class="guide-list">
          <li>
            <strong>inline</strong>
            <span>버튼 내부나 텍스트 옆에 작은 로딩을 붙일 때 사용합니다.</span>
          </li>

          <li>
            <strong>center</strong>
            <span>특정 섹션 안에서 중앙 로딩을 보여줄 때 사용합니다.</span>
          </li>

          <li>
            <strong>overlay</strong>
            <span>테이블, 폼, 카드 영역 위를 덮어서 로딩을 보여줄 때 사용합니다.</span>
          </li>

          <li>
            <strong>fullscreen</strong>
            <span>앱 초기 로딩, 로그인 체크, 권한 확인처럼 전체 화면을 막아야 할 때 사용합니다.</span>
          </li>
        </ul>
      </div>
    </section>

    <Loading
      v-if="fullscreenLoading"
      mode="fullscreen"
      size="lg"
      label="페이지를 준비하고 있습니다."
    />
  </main>
</template>

<style scoped>
/**
 * App 내부 요소가 padding, border를 포함해서
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

.example-card--row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  width: 100%;
  min-width: 0;
}

.loading-preview {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 160px;
  min-height: 72px;
  padding: 16px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background: #f9fafb;
}

.example-actions {
  display: flex;
  justify-content: flex-end;
}

.primary-button,
.secondary-button,
.save-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: 40px;
  padding: 0 16px;

  border: 0;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  white-space: nowrap;
}

.primary-button,
.save-button {
  background-color: #2563eb;
  color: #ffffff;
}

.primary-button:hover,
.save-button:hover {
  background-color: #1d4ed8;
}

.secondary-button {
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #111827;
}

.secondary-button:hover {
  background-color: #f9fafb;
}

.primary-button:disabled,
.secondary-button:disabled,
.save-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

/**
 * 버튼 안의 spinner 색상을 버튼 색상에 맞춥니다.
 */
.save-button :deep(.loading__spinner) {
  border-color: rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
}

.content-box {
  min-height: 180px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background-color: #f9fafb;
}

.member-info {
  padding: 24px;
}

.member-info h3 {
  margin: 0 0 12px;

  font-size: 18px;
  line-height: 1.4;
}

.member-info p {
  margin: 6px 0;

  font-size: 14px;
  line-height: 1.5;
  color: #4b5563;
}

.table-box {
  position: relative;

  min-height: 240px;
  padding: 20px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background-color: #ffffff;

  overflow: hidden;
}

.table-box__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  margin-bottom: 16px;
}

.table-box__header h3 {
  margin: 0;

  font-size: 18px;
  line-height: 1.4;
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
}

.table-box table {
  width: 100%;
  min-width: 520px;

  border-collapse: collapse;
}

.table-box th,
.table-box td {
  padding: 12px;

  border-bottom: 1px solid #e5e7eb;

  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  white-space: nowrap;
}

.table-box th {
  font-weight: 700;
  color: #374151;
  background-color: #f9fafb;
}

.guide-list {
  display: grid;
  gap: 14px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.guide-list li {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 12px;

  padding: 14px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background-color: #f9fafb;
}

.guide-list strong {
  font-size: 14px;
  color: #111827;
}

.guide-list span {
  font-size: 14px;
  line-height: 1.5;
  color: #4b5563;
}

/**
 * scoped style에서 Loading 내부 클래스에 접근하기 위해
 * :deep()을 사용합니다.
 */
:deep(.loading) {
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

  .example-card--row {
    display: grid;
  }

  .loading-preview {
    width: 100%;
  }

  .table-box__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .secondary-button,
  .primary-button,
  .save-button {
    width: 100%;
  }

  .guide-list li {
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