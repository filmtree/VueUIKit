<script setup lang="ts">
import { computed, ref } from "vue";

import { ConfirmModal } from "/src/components/confirm";

/**
 * Confirm 버튼 스타일 타입입니다.
 */
type ConfirmVariant = "default" | "danger";

/**
 * confirm 함수 호출 시 받을 옵션 타입입니다.
 */
type ConfirmOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  closeOnDim?: boolean;
};

/**
 * 내부에서 관리할 Confirm 상태 타입입니다.
 */
type ConfirmState = ConfirmOptions & {
  /**
   * 사용자가 확인 또는 취소를 눌렀을 때 Promise 결과를 반환합니다.
   */
  resolve: (value: boolean) => void;
};

/**
 * 현재 열려 있는 Confirm 정보입니다.
 * null이면 Confirm이 닫힌 상태입니다.
 */
const confirmState = ref<ConfirmState | null>(null);

/**
 * 최근 실행된 액션 결과를 화면에 표시하기 위한 상태입니다.
 */
const actionLogs = ref<string[]>([]);

/**
 * 저장 여부 예제 상태입니다.
 */
const saved = ref(false);

/**
 * 삭제 여부 예제 상태입니다.
 */
const deleted = ref(false);

/**
 * 페이지 이동 여부 예제 상태입니다.
 */
const pageLeft = ref(false);

/**
 * dim 클릭으로 닫히지 않는 Confirm 예제 상태입니다.
 */
const protectedActionDone = ref(false);

/**
 * Confirm 모달을 열고 사용자의 선택 결과를 Promise<boolean>으로 반환합니다.
 */
const confirm = (options: ConfirmOptions = {}) => {
  return new Promise<boolean>((resolve) => {
    confirmState.value = {
      title: options.title ?? "확인",
      message: options.message ?? "진행하시겠습니까?",
      confirmText: options.confirmText ?? "확인",
      cancelText: options.cancelText ?? "취소",
      variant: options.variant ?? "default",
      closeOnDim: options.closeOnDim ?? true,
      resolve,
    };
  });
};

/**
 * 로그를 추가합니다.
 */
const addLog = (message: string) => {
  actionLogs.value = [
    message,
    ...actionLogs.value,
  ].slice(0, 5);
};

/**
 * Confirm에서 확인 버튼을 눌렀을 때 실행됩니다.
 */
const handleConfirm = () => {
  if (!confirmState.value) return;

  confirmState.value.resolve(true);
  confirmState.value = null;
};

/**
 * Confirm에서 취소 버튼 또는 dim을 눌렀을 때 실행됩니다.
 */
const handleCancel = () => {
  if (!confirmState.value) return;

  confirmState.value.resolve(false);
  confirmState.value = null;
};

/**
 * 삭제 확인 예제입니다.
 */
const handleDelete = async () => {
  const isConfirmed = await confirm({
    title: "게시글을 삭제하시겠습니까?",
    message: "삭제한 게시글은 복구할 수 없습니다.",
    confirmText: "삭제",
    cancelText: "취소",
    variant: "danger",
  });

  if (!isConfirmed) {
    addLog("게시글 삭제를 취소했습니다.");
    return;
  }

  deleted.value = true;
  addLog("게시글 삭제를 실행했습니다.");
};

/**
 * 저장 전 확인 예제입니다.
 */
const handleSave = async () => {
  const isConfirmed = await confirm({
    title: "변경 내용을 저장하시겠습니까?",
    message: "현재 작성 중인 내용을 저장합니다.",
    confirmText: "저장",
    cancelText: "취소",
    variant: "default",
  });

  if (!isConfirmed) {
    addLog("저장을 취소했습니다.");
    return;
  }

  saved.value = true;
  addLog("변경 내용을 저장했습니다.");
};

/**
 * 페이지 이동 전 확인 예제입니다.
 */
const handleLeavePage = async () => {
  const isConfirmed = await confirm({
    title: "페이지를 나가시겠습니까?",
    message: "작성 중인 내용이 사라질 수 있습니다.",
    confirmText: "나가기",
    cancelText: "계속 작성",
    variant: "default",
  });

  if (!isConfirmed) {
    addLog("페이지 이동을 취소했습니다.");
    return;
  }

  pageLeft.value = true;
  addLog("페이지 이동을 실행했습니다.");
};

/**
 * dim 클릭으로 닫히지 않는 Confirm 예제입니다.
 */
const handleProtectedAction = async () => {
  const isConfirmed = await confirm({
    title: "중요 작업을 실행하시겠습니까?",
    message: "이 Confirm은 배경을 클릭해도 닫히지 않습니다.",
    confirmText: "실행",
    cancelText: "취소",
    variant: "danger",
    closeOnDim: false,
  });

  if (!isConfirmed) {
    addLog("중요 작업을 취소했습니다.");
    return;
  }

  protectedActionDone.value = true;
  addLog("중요 작업을 실행했습니다.");
};

/**
 * 모든 예제 상태를 초기화합니다.
 */
const resetAll = () => {
  saved.value = false;
  deleted.value = false;
  pageLeft.value = false;
  protectedActionDone.value = false;
  actionLogs.value = [];
};

/**
 * 현재 상태 요약입니다.
 */
const statusText = computed(() => {
  return [
    `저장: ${saved.value ? "완료" : "대기"}`,
    `삭제: ${deleted.value ? "완료" : "대기"}`,
    `이동: ${pageLeft.value ? "완료" : "대기"}`,
    `중요 작업: ${protectedActionDone.value ? "완료" : "대기"}`,
  ].join(" / ");
});
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
            Confirm 예제
          </h1>

          <p class="app__description">
            삭제 확인, 저장 전 확인, 페이지 이동 전 확인, dim 클릭 방지 Confirm을
            하나의 파일에서 확인할 수 있는 예제입니다.
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
      <!-- 삭제 확인 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            삭제 확인
          </h2>

          <p class="example-card__description">
            삭제, 탈퇴, 초기화처럼 되돌리기 어려운 작업에 danger Confirm을 사용합니다.
          </p>
        </div>

        <div class="example-card__body">
          <button
            type="button"
            class="demo-button demo-button--danger"
            @click="handleDelete"
          >
            게시글 삭제
          </button>

          <div class="state-box">
            삭제 상태:
            <strong>
              {{ deleted ? "삭제 완료" : "삭제 전" }}
            </strong>
          </div>
        </div>
      </article>

      <!-- 저장 전 확인 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            저장 전 확인
          </h2>

          <p class="example-card__description">
            저장, 등록, 적용처럼 일반적인 확인이 필요한 작업에 사용합니다.
          </p>
        </div>

        <div class="example-card__body">
          <button
            type="button"
            class="demo-button"
            @click="handleSave"
          >
            변경 내용 저장
          </button>

          <div class="state-box">
            저장 상태:
            <strong>
              {{ saved ? "저장 완료" : "저장 전" }}
            </strong>
          </div>
        </div>
      </article>

      <!-- 페이지 이동 전 확인 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            페이지 이동 전 확인
          </h2>

          <p class="example-card__description">
            작성 중인 내용이 사라질 수 있는 상황에서 이동 여부를 확인합니다.
          </p>
        </div>

        <div class="example-card__body">
          <button
            type="button"
            class="demo-button demo-button--secondary"
            @click="handleLeavePage"
          >
            페이지 나가기
          </button>

          <div class="state-box">
            이동 상태:
            <strong>
              {{ pageLeft ? "이동 처리됨" : "현재 페이지 유지" }}
            </strong>
          </div>
        </div>
      </article>

      <!-- closeOnDim false 예제 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            dim 클릭 방지
          </h2>

          <p class="example-card__description">
            중요한 작업은 배경 클릭으로 닫히지 않도록 closeOnDim을 false로 설정할 수 있습니다.
          </p>
        </div>

        <div class="example-card__body">
          <button
            type="button"
            class="demo-button demo-button--danger"
            @click="handleProtectedAction"
          >
            중요 작업 실행
          </button>

          <div class="state-box">
            작업 상태:
            <strong>
              {{ protectedActionDone ? "실행 완료" : "실행 전" }}
            </strong>
          </div>
        </div>
      </article>

      <!-- 현재 상태 요약 -->
      <article class="example-card example-card--wide">
        <div class="example-card__header">
          <h2 class="example-card__title">
            현재 상태
          </h2>

          <p class="example-card__description">
            각 Confirm 예제에서 확인 또는 취소를 눌렀을 때 상태가 어떻게 바뀌는지 확인할 수 있습니다.
          </p>
        </div>

        <div class="example-card__body">
          <div class="result-panel">
            <p>
              상태 요약:
              <code>{{ statusText }}</code>
            </p>
          </div>
        </div>
      </article>

      <!-- 실행 로그 -->
      <article class="example-card example-card--wide">
        <div class="example-card__header">
          <h2 class="example-card__title">
            실행 로그
          </h2>

          <p class="example-card__description">
            Confirm에서 사용자가 선택한 결과를 로그로 확인합니다.
          </p>
        </div>

        <div class="example-card__body">
          <ul
            v-if="actionLogs.length > 0"
            class="log-list"
          >
            <li
              v-for="log in actionLogs"
              :key="log"
              class="log-list__item"
            >
              {{ log }}
            </li>
          </ul>

          <div
            v-else
            class="empty-box"
          >
            아직 실행된 작업이 없습니다.
          </div>
        </div>
      </article>
    </section>

    <ConfirmModal
      v-if="confirmState"
      :title="confirmState.title"
      :message="confirmState.message"
      :confirm-text="confirmState.confirmText"
      :cancel-text="confirmState.cancelText"
      :variant="confirmState.variant"
      :close-on-dim="confirmState.closeOnDim"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.app {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0;

  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  color: #111827;
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

.demo-button--danger {
  border-color: #dc2626;
  background: #dc2626;
}

.demo-button--danger:hover {
  border-color: #b91c1c;
  background: #b91c1c;
}

.demo-button--secondary {
  border-color: #d1d5db;
  color: #374151;
  background: #fff;
}

.demo-button--secondary:hover {
  border-color: #9ca3af;
  background: #f9fafb;
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

.log-list {
  display: grid;
  gap: 8px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.log-list__item {
  padding: 12px 14px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  font-size: 14px;
  line-height: 1.5;

  color: #374151;
  background: #f9fafb;
}

.empty-box {
  padding: 20px;

  border: 1px dashed #d1d5db;
  border-radius: 14px;

  font-size: 14px;
  line-height: 1.5;
  text-align: center;

  color: #6b7280;
  background: #f9fafb;
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

  .demo-button {
    width: 100%;
  }
}
</style>