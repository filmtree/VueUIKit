```vue
<script setup lang="ts">
import { computed, ref } from "vue";

import { Input } from "/src/components/input";
import { Icon } from "/src/components/icon";

/**
 * 기본 입력 예제 값입니다.
 */
const userId = ref("");

/**
 * 이메일 입력 예제 값입니다.
 */
const email = ref("");

/**
 * 검색 입력 예제 값입니다.
 */
const keyword = ref("");

/**
 * 성공 상태 예제 값입니다.
 */
const availableId = ref("publisher01");

/**
 * disabled / readonly 예제 값입니다.
 */
const disabledValue = ref("수정할 수 없습니다.");
const readonlyValue = ref("읽기 전용 값입니다.");

/**
 * size 예제 값입니다.
 */
const smallValue = ref("");
const mediumValue = ref("");
const largeValue = ref("");

/**
 * 비밀번호 예제 값입니다.
 */
const password = ref("");

/**
 * 비밀번호 표시 여부입니다.
 */
const passwordVisible = ref(false);

/**
 * 비밀번호 input type을 상태에 따라 변경합니다.
 */
const passwordType = computed(() => {
  return passwordVisible.value ? "text" : "password";
});

/**
 * 비밀번호 보기 / 숨기기 상태를 변경합니다.
 */
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};

/**
 * 이메일 검증 메시지입니다.
 */
const emailError = computed(() => {
  if (!email.value) {
    return "이메일을 입력해주세요.";
  }

  if (!email.value.includes("@")) {
    return "이메일 형식이 올바르지 않습니다.";
  }

  return "";
});

/**
 * 검색 실행 예제 함수입니다.
 */
const handleSearch = () => {
  if (!keyword.value.trim()) {
    alert("검색어를 입력해주세요.");
    return;
  }

  alert(`검색어: ${keyword.value}`);
};
</script>

<template>
  <main class="app">
    <section class="app__header">
      <h1>Input 예제 모음</h1>
      <p>
        기본 입력, 상태 메시지, 아이콘 슬롯, 검색창, 비밀번호 입력,
        disabled, readonly, size 옵션을 한 페이지에서 확인하는 예제입니다.
      </p>
    </section>

    <section class="example-section">
      <h2>기본 입력</h2>

      <div class="example-card">
        <Input
          v-model="userId"
          id="user-id"
          label="아이디"
          required
          placeholder="아이디를 입력하세요"
          helper-text="영문과 숫자 조합 6자 이상"
          full-width
        />
      </div>
    </section>

    <section class="example-section">
      <h2>에러 상태</h2>

      <div class="example-card">
        <Input
          v-model="email"
          id="email"
          label="이메일"
          placeholder="example@email.com"
          :error="Boolean(emailError)"
          :error-message="emailError"
          clearable
          full-width
        />
      </div>
    </section>

    <section class="example-section">
      <h2>검색창</h2>

      <div class="example-card example-card--search">
        <Input
          v-model="keyword"
          label="검색"
          placeholder="검색어를 입력하세요"
          clearable
          full-width
          @keydown.enter="handleSearch"
        >
          <template #leftIcon>
            <Icon
              name="search"
              :size="18"
            />
          </template>
        </Input>

        <button
          type="button"
          class="example-button"
          @click="handleSearch"
        >
          검색하기
        </button>
      </div>
    </section>

    <section class="example-section">
      <h2>오른쪽 아이콘 / 성공 상태</h2>

      <div class="example-card">
        <Input
          v-model="availableId"
          label="아이디"
          success
          success-message="사용 가능한 아이디입니다."
          full-width
        >
          <template #rightIcon>
            <Icon
              name="check"
              :size="18"
            />
          </template>
        </Input>
      </div>
    </section>

    <section class="example-section">
      <h2>비밀번호 입력</h2>

      <div class="example-card">
        <Input
          v-model="password"
          :type="passwordType"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          helper-text="8자 이상 입력해주세요."
          clearable
          full-width
        >
          <template #rightIcon>
            <button
              type="button"
              class="password-toggle"
              :aria-label="passwordVisible ? '비밀번호 숨기기' : '비밀번호 보기'"
              @click="togglePasswordVisible"
            >
              <Icon
                :name="passwordVisible ? 'eye-off' : 'eye'"
                :size="18"
              />
            </button>
          </template>
        </Input>
      </div>
    </section>

    <section class="example-section">
      <h2>Disabled / Readonly</h2>

      <div class="example-grid">
        <div class="example-card">
          <Input
            v-model="disabledValue"
            label="비활성화"
            disabled
            full-width
          />
        </div>

        <div class="example-card">
          <Input
            v-model="readonlyValue"
            label="읽기 전용"
            readonly
            full-width
          />
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2>Size / Full Width</h2>

      <div class="example-card example-card--stack">
        <Input
          v-model="smallValue"
          label="Small"
          size="sm"
          placeholder="small input"
          full-width
        />

        <Input
          v-model="mediumValue"
          label="Medium"
          size="md"
          placeholder="medium input"
          full-width
        />

        <Input
          v-model="largeValue"
          label="Large"
          size="lg"
          placeholder="large input"
          full-width
        />
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

  /**
   * 긴 텍스트나 input 내부 요소 때문에
   * 가로 스크롤이 생기는 것을 방지합니다.
   */
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

/**
 * 예제 카드의 기본 배치를 grid로 둡니다.
 * flex보다 input 너비 제어가 안정적입니다.
 */
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

/**
 * 검색 영역은 넓은 화면에서만 input + 버튼을 좌우 배치합니다.
 */
.example-card--search {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
}

.example-card--stack {
  gap: 20px;
}

/**
 * 2열 예제도 화면보다 커지지 않도록 minmax(0, 1fr)를 사용합니다.
 */
.example-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  width: 100%;
  min-width: 0;
}

.example-button {
  flex-shrink: 0;

  height: 44px;
  padding: 0 18px;

  border: 0;
  border-radius: 8px;

  background: #2563eb;
  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  white-space: nowrap;
}

.example-button:hover {
  background: #1d4ed8;
}

.password-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  padding: 0;

  border: 0;
  background: transparent;
  color: #6b7280;

  cursor: pointer;
}

.password-toggle:hover {
  color: #111827;
}

/**
 * Vue scoped style에서는 자식 컴포넌트 내부 클래스에
 * 직접 접근하려면 :deep()을 사용합니다.
 *
 * Input 컴포넌트의 최상위 wrapper가 가로로 밀리지 않게 보정합니다.
 */
:deep(.input-field) {
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

:deep(.input) {
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

:deep(.input input) {
  min-width: 0;
}

/**
 * 태블릿 이하에서는 모든 예제를 한 줄 배치로 전환합니다.
 */
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

  .example-card--search {
    grid-template-columns: 1fr;
  }

  .example-button {
    width: 100%;
  }

  .example-grid {
    grid-template-columns: 1fr;
  }
}

/**
 * 아주 좁은 모바일 화면 대응입니다.
 */
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
