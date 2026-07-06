<script setup lang="ts">
import { Icon } from "/src/components/icon";

/**
 * 예제에서 렌더링할 아이콘 목록입니다.
 */
const icons = [
  "search",
  "close",
  "arrow-left",
  "arrow-right",
  "chevron-down",
  "download",
  "upload",
  "edit",
  "trash",
  "check",
];

/**
 * 크기 예제 목록입니다.
 */
const sizes = [
  {
    label: "16px",
    value: 16,
  },
  {
    label: "20px",
    value: 20,
  },
  {
    label: "24px",
    value: 24,
  },
  {
    label: "32px",
    value: 32,
  },
  {
    label: "2rem",
    value: "2rem",
  },
];

/**
 * 컬러 예제 목록입니다.
 */
const colors = [
  {
    label: "default",
    value: "currentColor",
  },
  {
    label: "primary",
    value: "#2563eb",
  },
  {
    label: "success",
    value: "#16a34a",
  },
  {
    label: "danger",
    value: "#dc2626",
  },
  {
    label: "muted",
    value: "#6b7280",
  },
];
</script>

<template>
  <main class="icon-page">
    <header class="icon-page__header">
      <p class="icon-page__eyebrow">UI Kit</p>

      <h1>Icon</h1>

      <p>
        SVG 파일을 name 기준으로 불러와 렌더링하는 아이콘 컴포넌트입니다.
      </p>
    </header>

    <section class="icon-section">
      <h2>아이콘 목록</h2>

      <div class="icon-grid">
        <article
          v-for="name in icons"
          :key="name"
          class="icon-card"
        >
          <Icon
            :name="name"
            :size="28"
          />

          <strong>{{ name }}</strong>
        </article>
      </div>
    </section>

    <section class="icon-section">
      <h2>크기</h2>

      <div class="example-row">
        <article
          v-for="item in sizes"
          :key="item.label"
          class="example-card"
        >
          <Icon
            name="search"
            :size="item.value"
          />

          <span>{{ item.label }}</span>
        </article>
      </div>
    </section>

    <section class="icon-section">
      <h2>색상</h2>

      <div class="example-row">
        <article
          v-for="item in colors"
          :key="item.label"
          class="example-card"
        >
          <Icon
            name="check"
            :size="28"
            :color="item.value"
          />

          <span>{{ item.label }}</span>
        </article>
      </div>
    </section>

    <section class="icon-section">
      <h2>접근성 라벨</h2>

      <div class="usage-card">
        <button
          type="button"
          class="icon-button"
          aria-label="검색"
        >
          <Icon
            name="search"
            :size="20"
          />
        </button>

        <div>
          <strong>아이콘 버튼</strong>
          <p>
            버튼 자체에 aria-label을 주고, Icon은 장식용으로 숨깁니다.
          </p>
        </div>
      </div>

      <div class="usage-card">
        <Icon
          name="check"
          :size="24"
          color="#16a34a"
          label="완료"
          :decorative="false"
        />

        <div>
          <strong>의미가 있는 단독 아이콘</strong>
          <p>
            단독으로 의미를 전달하는 경우 decorative=false와 label을 사용합니다.
          </p>
        </div>
      </div>
    </section>

    <section class="icon-section">
      <h2>버튼 조합</h2>

      <div class="button-row">
        <button
          type="button"
          class="ui-button ui-button--primary"
        >
          <Icon
            name="search"
            :size="18"
          />

          검색
        </button>

        <button
          type="button"
          class="ui-button ui-button--secondary"
        >
          다운로드

          <Icon
            name="download"
            :size="18"
          />
        </button>

        <button
          type="button"
          class="ui-button ui-button--danger"
        >
          <Icon
            name="trash"
            :size="18"
          />

          삭제
        </button>

        <button
          type="button"
          class="icon-button"
          aria-label="닫기"
        >
          <Icon
            name="close"
            :size="20"
          />
        </button>
      </div>
    </section>

    <section class="icon-section">
      <h2>메뉴 조합</h2>

      <div class="menu-card">
        <button type="button">
          <Icon
            name="edit"
            :size="18"
          />

          수정
        </button>

        <button type="button">
          <Icon
            name="download"
            :size="18"
          />

          다운로드
        </button>

        <button
          type="button"
          class="menu-card__danger"
        >
          <Icon
            name="trash"
            :size="18"
          />

          삭제
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.icon-page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 24px 80px;

  color: #111827;
}

.icon-page__header {
  margin-bottom: 40px;
}

.icon-page__eyebrow {
  margin: 0 0 8px;

  color: #2563eb;

  font-size: 14px;
  font-weight: 700;
}

.icon-page__header h1 {
  margin: 0;

  font-size: 36px;
  line-height: 1.25;
}

.icon-page__header p {
  max-width: 720px;
  margin: 16px 0 0;

  color: #6b7280;

  font-size: 16px;
  line-height: 1.7;
}

.icon-section {
  margin-top: 36px;
}

.icon-section h2 {
  margin: 0 0 16px;

  font-size: 24px;
  line-height: 1.35;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.icon-card,
.example-card,
.usage-card,
.menu-card {
  border: 1px solid #e5e7eb;
  border-radius: 16px;

  background: #ffffff;

  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.icon-card {
  display: grid;
  justify-items: center;
  gap: 12px;

  padding: 24px 16px;
}

.icon-card strong {
  font-size: 13px;
  color: #374151;
}

.example-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.example-card {
  display: inline-flex;
  align-items: center;
  gap: 12px;

  padding: 18px;
}

.example-card span {
  font-size: 14px;
  color: #374151;
}

.usage-card {
  display: flex;
  align-items: center;
  gap: 16px;

  max-width: 640px;
  padding: 20px;
}

.usage-card + .usage-card {
  margin-top: 12px;
}

.usage-card strong {
  display: block;

  font-size: 15px;
}

.usage-card p {
  margin: 6px 0 0;

  color: #6b7280;

  font-size: 14px;
  line-height: 1.6;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.ui-button,
.icon-button,
.menu-card button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 0;

  font-family: inherit;

  cursor: pointer;
}

.ui-button {
  gap: 8px;

  min-height: 40px;
  padding: 0 16px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;
}

.ui-button--primary {
  background: #111827;
  color: #ffffff;
}

.ui-button--secondary {
  background: #f3f4f6;
  color: #111827;
}

.ui-button--danger {
  background: #dc2626;
  color: #ffffff;
}

.icon-button {
  width: 40px;
  height: 40px;

  border-radius: 10px;

  background: #f3f4f6;
  color: #111827;
}

.ui-button:hover,
.icon-button:hover,
.menu-card button:hover {
  opacity: 0.86;
}

.ui-button:focus-visible,
.icon-button:focus-visible,
.menu-card button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.menu-card {
  display: inline-grid;
  gap: 4px;

  min-width: 220px;
  padding: 8px;
}

.menu-card button {
  justify-content: flex-start;
  gap: 10px;

  min-height: 40px;
  padding: 0 12px;

  border-radius: 10px;

  background: transparent;
  color: #111827;

  font-size: 14px;
}

.menu-card button:hover {
  background: #f3f4f6;
}

.menu-card__danger {
  color: #dc2626 !important;
}

@media (max-width: 900px) {
  .icon-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .icon-page {
    padding: 28px 16px 64px;
  }

  .icon-page__header h1 {
    font-size: 28px;
  }

  .icon-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .usage-card {
    align-items: flex-start;
  }

  .button-row {
    flex-direction: column;
  }

  .ui-button,
  .icon-button {
    width: 100%;
  }
}
</style>