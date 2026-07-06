<script setup lang="ts">
import { ref } from "vue";
import Popover from "/src/components/popover/Popover.vue";

/**
 * 위치별 예제에서 사용할 placement 목록입니다.
 */
const placements = [
  {
    value: "top",
    label: "top",
    description: "위쪽 가운데",
  },
  {
    value: "top-start",
    label: "top-start",
    description: "위쪽 왼쪽 정렬",
  },
  {
    value: "top-end",
    label: "top-end",
    description: "위쪽 오른쪽 정렬",
  },
  {
    value: "bottom",
    label: "bottom",
    description: "아래쪽 가운데",
  },
  {
    value: "bottom-start",
    label: "bottom-start",
    description: "아래쪽 왼쪽 정렬",
  },
  {
    value: "bottom-end",
    label: "bottom-end",
    description: "아래쪽 오른쪽 정렬",
  },
  {
    value: "left",
    label: "left",
    description: "왼쪽",
  },
  {
    value: "right",
    label: "right",
    description: "오른쪽",
  },
] as const;

/**
 * 사용자 메뉴 클릭 결과를 화면에 보여주기 위한 상태입니다.
 */
const selectedUserMenu = ref("아직 선택한 메뉴가 없습니다.");

/**
 * 사용자 메뉴 클릭 처리 함수입니다.
 */
const handleUserMenuClick = (menu: string) => {
  selectedUserMenu.value = `${menu} 메뉴를 선택했습니다.`;
};

/**
 * 미니 필터 예제에서 사용할 정렬 상태입니다.
 */
const sort = ref("latest");

/**
 * 제어형 Popover 예제에서 사용할 열림 상태입니다.
 */
const controlledOpen = ref(false);

/**
 * open-change 이벤트 로그를 화면에 보여주기 위한 상태입니다.
 */
const openChangeMessage = ref("아직 상태 변경 이벤트가 없습니다.");

/**
 * Popover 열림 상태가 바뀔 때 실행됩니다.
 */
const handleOpenChange = (open: boolean) => {
  openChangeMessage.value = open
    ? "Popover가 열렸습니다."
    : "Popover가 닫혔습니다.";
};
</script>

<template>
  <main class="app">
    <section class="page-hero">
      <p class="page-hero__eyebrow">
        UI Component Example
      </p>

      <h1 class="page-hero__title">
        Popover 예제 모음
      </h1>

      <p class="page-hero__description">
        기본 Popover, 위치별 Popover, 사용자 메뉴, 도움말, 미니 필터,
        제어형 상태, 상태 변경 이벤트를 한 페이지에서 확인할 수 있습니다.
      </p>
    </section>

    <!-- 기본 사용 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            기본 사용
          </h2>

          <p class="example-section__description">
            trigger 슬롯에 버튼을 넣고, 기본 슬롯에 Popover 내용을 넣는 형태입니다.
          </p>
        </div>
      </div>

      <div class="example-card">
        <Popover>
          <template #trigger>
            <button
              type="button"
              class="button"
            >
              더보기
            </button>
          </template>

          <div class="popover-content">
            <strong class="popover-content__title">
              기본 Popover
            </strong>

            <p class="popover-content__text">
              버튼을 클릭하면 Popover가 열립니다. 바깥 영역을 클릭하거나 ESC 키를 누르면 닫힙니다.
            </p>
          </div>
        </Popover>
      </div>
    </section>

    <!-- 위치별 Popover 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            위치별 Popover
          </h2>

          <p class="example-section__description">
            placement 값에 따라 Popover가 표시되는 위치를 변경할 수 있습니다.
          </p>
        </div>
      </div>

      <div class="placement-demo">
        <Popover
          v-for="placement in placements"
          :key="placement.value"
          :placement="placement.value"
          size="sm"
        >
          <template #trigger>
            <button
              type="button"
              class="button button--secondary"
            >
              {{ placement.label }}
            </button>
          </template>

          <div class="popover-content">
            <strong class="popover-content__title">
              {{ placement.label }}
            </strong>

            <p class="popover-content__text">
              {{ placement.description }} 위치에 표시되는 Popover입니다.
            </p>
          </div>
        </Popover>
      </div>
    </section>

    <!-- 사용자 메뉴 Popover 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            사용자 메뉴
          </h2>

          <p class="example-section__description">
            메뉴 항목을 클릭하면 자동으로 닫히도록 close-on-content-click을 사용한 예제입니다.
          </p>
        </div>

        <span class="example-section__badge">
          {{ selectedUserMenu }}
        </span>
      </div>

      <div class="example-card">
        <Popover          
          close-on-content-click
        >
          <template #trigger>
            <button
              type="button"
              class="user-button"
            >
              <span class="user-button__avatar">
                성
              </span>

              <span class="user-button__name">
                성민님
              </span>
            </button>
          </template>

          <div class="popover-menu">
            <button
              type="button"
              class="popover-menu__item"
              @click="handleUserMenuClick('마이페이지')"
            >
              마이페이지
            </button>

            <button
              type="button"
              class="popover-menu__item"
              @click="handleUserMenuClick('설정')"
            >
              설정
            </button>

            <button
              type="button"
              class="popover-menu__item popover-menu__item--danger"
              @click="handleUserMenuClick('로그아웃')"
            >
              로그아웃
            </button>
          </div>
        </Popover>
      </div>
    </section>

    <!-- 도움말 Popover 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            도움말 Popover
          </h2>

          <p class="example-section__description">
            폼 라벨이나 설정 항목 옆에 설명 레이어를 붙일 때 사용할 수 있습니다.
          </p>
        </div>
      </div>

      <div class="example-card">
        <div class="form-row">
          <label class="field-label">
            배송 정책

            <Popover
              size="lg"              
            >
              <template #trigger>
                <button
                  type="button"
                  class="help-button"
                  aria-label="배송 정책 안내"
                >
                  ?
                </button>
              </template>

              <div class="popover-content">
                <strong class="popover-content__title">
                  배송 정책 안내
                </strong>

                <p class="popover-content__text">
                  오후 2시 이전 결제 건은 당일 출고됩니다. 도서산간 지역은 추가 배송비가 발생할 수 있습니다.
                </p>
              </div>
            </Popover>
          </label>

          <input
            class="input"
            type="text"
            value="당일 출고"
            readonly
          />
        </div>
      </div>
    </section>

    <!-- 미니 필터 Popover 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            미니 필터
          </h2>

          <p class="example-section__description">
            정렬, 필터, 옵션 선택처럼 작은 입력 UI를 Popover 안에 넣는 형태입니다.
          </p>
        </div>

        <span class="example-section__badge">
          선택값: {{ sort }}
        </span>
      </div>

      <div class="example-card">
        <Popover>
          <template #trigger>
            <button
              type="button"
              class="button"
            >
              정렬 선택
            </button>
          </template>

          <fieldset class="filter-fieldset">
            <legend class="filter-fieldset__legend">
              정렬
            </legend>

            <label class="radio-row">
              <input
                v-model="sort"
                type="radio"
                name="sort"
                value="latest"
              />

              <span>최신순</span>
            </label>

            <label class="radio-row">
              <input
                v-model="sort"
                type="radio"
                name="sort"
                value="popular"
              />

              <span>인기순</span>
            </label>

            <label class="radio-row">
              <input
                v-model="sort"
                type="radio"
                name="sort"
                value="price-low"
              />

              <span>낮은 가격순</span>
            </label>
          </fieldset>
        </Popover>
      </div>
    </section>

    <!-- 제어형 Popover 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            제어형 Popover
          </h2>

          <p class="example-section__description">
            v-model을 사용하면 외부 상태로 Popover 열림 여부를 직접 제어할 수 있습니다.
          </p>
        </div>

        <span class="example-section__badge">
          {{ controlledOpen ? "열림" : "닫힘" }}
        </span>
      </div>

      <div class="example-card control-demo">
        <Popover
          v-model="controlledOpen"          
        >
          <template #trigger>
            <button
              type="button"
              class="button"
            >
              {{ controlledOpen ? "닫기" : "열기" }}
            </button>
          </template>

          <div class="popover-content">
            <strong class="popover-content__title">
              제어형 Popover
            </strong>

            <p class="popover-content__text">
              이 Popover는 외부의 controlledOpen 상태와 연결되어 있습니다.
            </p>

            <button
              type="button"
              class="button button--secondary button--full"
              @click="controlledOpen = false"
            >
              내부 버튼으로 닫기
            </button>
          </div>
        </Popover>

        <button
          type="button"
          class="button button--secondary"
          @click="controlledOpen = !controlledOpen"
        >
          외부 버튼으로 토글
        </button>
      </div>
    </section>

    <!-- open-change 이벤트 예제 -->
    <section class="example-section">
      <div class="example-section__header">
        <div>
          <h2 class="example-section__title">
            open-change 이벤트
          </h2>

          <p class="example-section__description">
            Popover 상태가 바뀔 때 추가 작업이 필요하면 open-change 이벤트를 사용할 수 있습니다.
          </p>
        </div>

        <span class="example-section__badge">
          {{ openChangeMessage }}
        </span>
      </div>

      <div class="example-card">
        <Popover          
          @open-change="handleOpenChange"
        >
          <template #trigger>
            <button
              type="button"
              class="button"
            >
              상태 변경 확인
            </button>
          </template>

          <div class="popover-content">
            <strong class="popover-content__title">
              상태 이벤트
            </strong>

            <p class="popover-content__text">
              이 Popover가 열리거나 닫히면 화면 오른쪽 상태 문구가 변경됩니다.
            </p>
          </div>
        </Popover>
      </div>
    </section>
  </main>
</template>

<style scoped>
.app {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0 80px;

  color: #111827;
}

.page-hero {
  margin-bottom: 40px;
  padding: 32px;

  border: 1px solid #e5e7eb;
  border-radius: 24px;

  background:
    linear-gradient(135deg, #eff6ff 0%, #ffffff 46%, #f9fafb 100%);
}

.page-hero__eyebrow {
  margin: 0 0 8px;

  color: #2563eb;

  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-hero__title {
  margin: 0;

  font-size: 34px;
  line-height: 1.25;
  font-weight: 800;
}

.page-hero__description {
  max-width: 720px;
  margin: 14px 0 0;

  color: #6b7280;

  font-size: 15px;
  line-height: 1.7;
}

.example-section {
  margin-top: 32px;
}

.example-section__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;

  margin-bottom: 14px;
}

.example-section__title {
  margin: 0;

  font-size: 22px;
  line-height: 1.35;
  font-weight: 800;
}

.example-section__description {
  margin: 6px 0 0;

  color: #6b7280;

  font-size: 14px;
  line-height: 1.6;
}

.example-section__badge {
  flex-shrink: 0;

  display: inline-flex;
  align-items: center;

  min-height: 32px;
  padding: 0 12px;

  border-radius: 999px;

  background-color: #eff6ff;
  color: #2563eb;

  font-size: 13px;
  font-weight: 800;
}

.example-card {
  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 18px;

  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.placement-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  min-height: 260px;
  padding: 80px 24px;

  border: 1px solid #e5e7eb;
  border-radius: 18px;

  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 40px;
  padding: 0 16px;

  border: 1px solid #2563eb;
  border-radius: 10px;

  background-color: #2563eb;
  color: #ffffff;

  font-size: 14px;
  font-weight: 800;

  cursor: pointer;
}

.button:hover {
  background-color: #1d4ed8;
}

.button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.button--secondary {
  border-color: #d1d5db;

  background-color: #ffffff;
  color: #374151;
}

.button--secondary:hover {
  border-color: #2563eb;

  background-color: #eff6ff;
  color: #2563eb;
}

.button--full {
  width: 100%;
  margin-top: 14px;
}

.popover-content {
  display: grid;
  gap: 8px;
}

.popover-content__title {
  color: #111827;

  font-size: 15px;
  line-height: 1.4;
  font-weight: 800;
}

.popover-content__text {
  margin: 0;

  color: #6b7280;

  font-size: 14px;
  line-height: 1.6;
}

.user-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  min-height: 44px;
  padding: 0 14px 0 8px;

  border: 1px solid #d1d5db;
  border-radius: 999px;

  background-color: #ffffff;
  color: #111827;

  cursor: pointer;
}

.user-button:hover {
  border-color: #2563eb;
}

.user-button__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  border-radius: 999px;

  background-color: #2563eb;
  color: #ffffff;

  font-size: 13px;
  font-weight: 800;
}

.user-button__name {
  font-size: 14px;
  font-weight: 800;
}

.popover-menu {
  display: grid;
  gap: 4px;
}

.popover-menu__item {
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 38px;
  padding: 0 10px;

  border: 0;
  border-radius: 8px;

  background: transparent;
  color: #111827;

  font-size: 14px;
  text-align: left;

  cursor: pointer;
}

.popover-menu__item:hover {
  background-color: #f3f4f6;
}

.popover-menu__item--danger {
  color: #dc2626;
}

.popover-menu__item--danger:hover {
  background-color: #fef2f2;
}

.form-row {
  display: grid;
  gap: 8px;

  max-width: 420px;
}

.field-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  color: #374151;

  font-size: 14px;
  font-weight: 800;
}

.help-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;

  border: 1px solid #d1d5db;
  border-radius: 999px;

  background-color: #ffffff;
  color: #6b7280;

  font-size: 12px;
  font-weight: 900;

  cursor: pointer;
}

.help-button:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.input {
  width: 100%;
  height: 42px;
  padding: 0 12px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  color: #111827;

  font-size: 14px;
}

.filter-fieldset {
  display: grid;
  gap: 10px;

  margin: 0;
  padding: 0;

  border: 0;
}

.filter-fieldset__legend {
  margin-bottom: 2px;

  color: #111827;

  font-size: 14px;
  font-weight: 800;
}

.radio-row {
  display: flex;
  align-items: center;
  gap: 8px;

  color: #374151;

  font-size: 14px;
  line-height: 1.4;

  cursor: pointer;
}

.control-demo {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 900px) {
  .example-section__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .placement-demo {
    min-height: auto;
    padding: 24px;
  }

  .control-demo {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 520px) {
  .app {
    width: min(100% - 24px, 1120px);
    padding-top: 28px;
  }

  .page-hero {
    padding: 24px;
    border-radius: 20px;
  }

  .page-hero__title {
    font-size: 28px;
  }

  .example-card {
    padding: 18px;
  }
}
</style>