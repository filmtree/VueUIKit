<script setup lang="ts">
import { computed, ref } from 'vue'

import TabsRoot from '/src/components/tabs/TabsRoot.vue'
import TabsList from '/src/components/tabs/TabsList.vue'
import TabsTrigger from '/src/components/tabs/TabsTrigger.vue'
import TabsPanel from '/src/components/tabs/TabsPanel.vue'

type NoticeTabValue = 'notice' | 'event' | 'faq'

type StatusTabItem = {
  value: string
  label: string
  count: number
  content: string
}

/**
 * v-model 제어형 Tabs에서 사용할 현재 탭 값입니다.
 */
const controlledTab = ref<NoticeTabValue>('notice')

/**
 * 배열 기반 Tabs 예제에서 사용할 데이터입니다.
 */
const statusTabs: StatusTabItem[] = [
  {
    value: 'all',
    label: '전체',
    count: 24,
    content: '전체 주문 목록입니다.',
  },
  {
    value: 'waiting',
    label: '대기',
    count: 8,
    content: '처리 대기 중인 주문 목록입니다.',
  },
  {
    value: 'done',
    label: '완료',
    count: 13,
    content: '처리가 완료된 주문 목록입니다.',
  },
  {
    value: 'cancel',
    label: '취소',
    count: 3,
    content: '취소된 주문 목록입니다.',
  },
]

/**
 * value-change 이벤트 예제에서 마지막으로 선택한 값을 보여주기 위한 상태입니다.
 */
const changedValue = ref('all')

/**
 * unmountOnExit false 예제에서 입력값 유지 여부를 확인하기 위한 상태입니다.
 */
const formTitle = ref('')
const formContent = ref('')

/**
 * 현재 제어형 탭 이름을 화면에 표시하기 위한 값입니다.
 */
const controlledTabLabel = computed(() => {
  const labelMap: Record<NoticeTabValue, string> = {
    notice: '공지사항',
    event: '이벤트',
    faq: 'FAQ',
  }

  return labelMap[controlledTab.value]
})

/**
 * value-change 이벤트가 발생했을 때 실행됩니다.
 */
const handleValueChange = (value: string) => {
  changedValue.value = value
  console.log('변경된 탭:', value)
}
</script>

<template>
  <main class="app">
    <section class="app__hero">
      <p class="app__eyebrow">
        UI Component Example
      </p>

      <h1 class="app__title">
        Tabs 예제 모음
      </h1>

      <p class="app__description">
        기본 Tabs, disabled 탭, v-model 제어형 Tabs, value-change 이벤트,
        unmountOnExit 옵션, 카드형 Tabs, 배열 기반 렌더링 예제를 한 페이지에서 확인할 수 있습니다.
      </p>
    </section>

    <!-- 기본 Tabs 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          기본 Tabs
        </h2>

        <p class="section__description">
          default-value를 사용해서 처음 선택될 탭을 지정하는 기본 사용 방식입니다.
        </p>
      </div>

      <TabsRoot default-value="profile">
        <TabsList>
          <TabsTrigger value="profile">
            프로필
          </TabsTrigger>

          <TabsTrigger value="account">
            계정
          </TabsTrigger>

          <TabsTrigger value="security">
            보안
          </TabsTrigger>
        </TabsList>

        <TabsPanel value="profile">
          <div class="panel-card">
            <h3 class="panel-card__title">
              프로필
            </h3>

            <p class="panel-card__text">
              사용자 이름, 소개글, 프로필 이미지 같은 기본 정보를 보여주는 영역입니다.
            </p>
          </div>
        </TabsPanel>

        <TabsPanel value="account">
          <div class="panel-card">
            <h3 class="panel-card__title">
              계정
            </h3>

            <p class="panel-card__text">
              이메일, 비밀번호, 계정 연결 상태를 관리하는 영역입니다.
            </p>
          </div>
        </TabsPanel>

        <TabsPanel value="security">
          <div class="panel-card">
            <h3 class="panel-card__title">
              보안
            </h3>

            <p class="panel-card__text">
              2단계 인증, 로그인 기록, 보안 알림 설정을 확인하는 영역입니다.
            </p>
          </div>
        </TabsPanel>
      </TabsRoot>
    </section>

    <!-- disabled 탭 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Disabled Tabs
        </h2>

        <p class="section__description">
          아직 접근할 수 없는 탭은 disabled 속성으로 비활성화할 수 있습니다.
        </p>
      </div>

      <TabsRoot default-value="basic">
        <TabsList>
          <TabsTrigger value="basic">
            기본 정보
          </TabsTrigger>

          <TabsTrigger value="payment">
            결제 정보
          </TabsTrigger>

          <TabsTrigger
            value="admin"
            disabled
          >
            관리자 전용
          </TabsTrigger>
        </TabsList>

        <TabsPanel value="basic">
          <div class="panel-card">
            기본 정보 내용입니다.
          </div>
        </TabsPanel>

        <TabsPanel value="payment">
          <div class="panel-card">
            결제 정보 내용입니다.
          </div>
        </TabsPanel>

        <TabsPanel value="admin">
          <div class="panel-card">
            관리자 전용 내용입니다.
          </div>
        </TabsPanel>
      </TabsRoot>
    </section>

    <!-- v-model 제어형 Tabs 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          v-model 제어형 Tabs
        </h2>

        <p class="section__description">
          외부 상태로 현재 탭 값을 직접 관리해야 할 때 사용하는 방식입니다.
        </p>
      </div>

      <div class="status-box">
        현재 선택된 탭:
        <strong>{{ controlledTabLabel }}</strong>
      </div>

      <TabsRoot v-model="controlledTab">
        <TabsList>
          <TabsTrigger value="notice">
            공지사항
          </TabsTrigger>

          <TabsTrigger value="event">
            이벤트
          </TabsTrigger>

          <TabsTrigger value="faq">
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsPanel value="notice">
          <div class="content-list">
            <article class="content-item">
              <strong>서비스 점검 안내</strong>
              <span>2026.07.02 02:00부터 04:00까지 점검이 진행됩니다.</span>
            </article>

            <article class="content-item">
              <strong>개인정보 처리방침 개정 안내</strong>
              <span>변경된 약관은 다음 업데이트부터 적용됩니다.</span>
            </article>
          </div>
        </TabsPanel>

        <TabsPanel value="event">
          <div class="content-list">
            <article class="content-item">
              <strong>신규 회원 이벤트</strong>
              <span>가입 후 첫 구매 시 쿠폰이 지급됩니다.</span>
            </article>

            <article class="content-item">
              <strong>여름 시즌 프로모션</strong>
              <span>일부 상품을 기간 한정 할인가로 제공합니다.</span>
            </article>
          </div>
        </TabsPanel>

        <TabsPanel value="faq">
          <div class="content-list">
            <article class="content-item">
              <strong>비밀번호를 변경하려면 어떻게 하나요?</strong>
              <span>계정 설정의 보안 메뉴에서 변경할 수 있습니다.</span>
            </article>

            <article class="content-item">
              <strong>주문 취소는 어디서 하나요?</strong>
              <span>주문 상세 페이지에서 취소 요청을 진행할 수 있습니다.</span>
            </article>
          </div>
        </TabsPanel>
      </TabsRoot>
    </section>

    <!-- value-change 이벤트 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          value-change 이벤트
        </h2>

        <p class="section__description">
          탭이 변경될 때 로그 기록, 데이터 요청, 외부 상태 동기화 같은 추가 작업을 실행할 수 있습니다.
        </p>
      </div>

      <div class="status-box">
        마지막으로 변경된 탭 값:
        <strong>{{ changedValue }}</strong>
      </div>

      <TabsRoot
        default-value="all"
        @value-change="handleValueChange"
      >
        <TabsList>
          <TabsTrigger value="all">
            전체
          </TabsTrigger>

          <TabsTrigger value="waiting">
            대기
          </TabsTrigger>

          <TabsTrigger value="done">
            완료
          </TabsTrigger>
        </TabsList>

        <TabsPanel value="all">
          <div class="panel-card">
            전체 목록입니다.
          </div>
        </TabsPanel>

        <TabsPanel value="waiting">
          <div class="panel-card">
            대기 목록입니다.
          </div>
        </TabsPanel>

        <TabsPanel value="done">
          <div class="panel-card">
            완료 목록입니다.
          </div>
        </TabsPanel>
      </TabsRoot>
    </section>

    <!-- unmountOnExit 옵션 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          unmountOnExit 옵션
        </h2>

        <p class="section__description">
          입력값이나 내부 상태를 유지해야 하는 화면에서는 unmount-on-exit을 false로 사용할 수 있습니다.
        </p>
      </div>

      <TabsRoot default-value="form">
        <TabsList>
          <TabsTrigger value="form">
            입력 폼
          </TabsTrigger>

          <TabsTrigger value="preview">
            미리보기
          </TabsTrigger>
        </TabsList>

        <TabsPanel
          value="form"
          :unmount-on-exit="false"
        >
          <div class="form-box">
            <label class="field">
              <span class="field__label">제목</span>

              <input
                v-model="formTitle"
                class="field__input"
                placeholder="제목을 입력하세요"
              />
            </label>

            <label class="field">
              <span class="field__label">내용</span>

              <textarea
                v-model="formContent"
                class="field__textarea"
                placeholder="내용을 입력하세요"
              />
            </label>
          </div>
        </TabsPanel>

        <TabsPanel
          value="preview"
          :unmount-on-exit="false"
        >
          <div class="preview-box">
            <h3>
              {{ formTitle || '제목 미입력' }}
            </h3>

            <p>
              {{ formContent || '내용을 입력하면 이곳에 미리보기로 표시됩니다.' }}
            </p>
          </div>
        </TabsPanel>
      </TabsRoot>
    </section>

    <!-- 카드형 Tabs 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          카드형 Tabs
        </h2>

        <p class="section__description">
          TabsRoot에 class를 추가해서 pill 형태의 카드형 탭 UI로 사용할 수 있습니다.
        </p>
      </div>

      <TabsRoot
        default-value="all"
        class="tabs--card"
      >
        <TabsList>
          <TabsTrigger value="all">
            전체
          </TabsTrigger>

          <TabsTrigger value="waiting">
            대기
          </TabsTrigger>

          <TabsTrigger value="done">
            완료
          </TabsTrigger>

          <TabsTrigger value="cancel">
            취소
          </TabsTrigger>
        </TabsList>

        <TabsPanel value="all">
          <div class="panel-card">
            전체 상태의 데이터를 보여줍니다.
          </div>
        </TabsPanel>

        <TabsPanel value="waiting">
          <div class="panel-card">
            대기 상태의 데이터를 보여줍니다.
          </div>
        </TabsPanel>

        <TabsPanel value="done">
          <div class="panel-card">
            완료 상태의 데이터를 보여줍니다.
          </div>
        </TabsPanel>

        <TabsPanel value="cancel">
          <div class="panel-card">
            취소 상태의 데이터를 보여줍니다.
          </div>
        </TabsPanel>
      </TabsRoot>
    </section>

    <!-- 배열 기반 Tabs 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          배열 기반 렌더링
        </h2>

        <p class="section__description">
          탭 목록이 서버 데이터나 고정 배열로 관리될 때 v-for로 Trigger와 Panel을 함께 렌더링합니다.
        </p>
      </div>

      <TabsRoot default-value="all">
        <TabsList>
          <TabsTrigger
            v-for="item in statusTabs"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
            <span class="tab-count">
              {{ item.count }}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsPanel
          v-for="item in statusTabs"
          :key="item.value"
          :value="item.value"
        >
          <div class="panel-card">
            <h3 class="panel-card__title">
              {{ item.label }}
            </h3>

            <p class="panel-card__text">
              {{ item.content }}
            </p>

            <p class="panel-card__meta">
              총 {{ item.count }}개의 항목이 있습니다.
            </p>
          </div>
        </TabsPanel>
      </TabsRoot>
    </section>
  </main>
</template>

<style scoped>
.app {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0 72px;
  color: #111827;
}

.app__hero {
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  background:
    linear-gradient(135deg, #f8fafc 0%, #ffffff 64%),
    #ffffff;
}

.app__eyebrow {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.app__title {
  margin: 0;
  font-size: 36px;
  line-height: 1.2;
  letter-spacing: -0.04em;
}

.app__description {
  max-width: 760px;
  margin: 16px 0 0;
  color: #4b5563;
  font-size: 16px;
  line-height: 1.7;
}

.section {
  padding: 28px;
  margin-top: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background-color: #ffffff;
}

.section__header {
  margin-bottom: 18px;
}

.section__title {
  margin: 0;
  font-size: 22px;
  line-height: 1.35;
  letter-spacing: -0.02em;
}

.section__description {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.panel-card {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background-color: #f9fafb;
}

.panel-card__title {
  margin: 0;
  font-size: 18px;
  line-height: 1.4;
}

.panel-card__text {
  margin: 8px 0 0;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.7;
}

.panel-card__meta {
  margin: 12px 0 0;
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
}

.status-box {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 38px;
  padding: 0 12px;
  margin-bottom: 16px;
  border-radius: 10px;
  background-color: #eff6ff;
  color: #1f2937;
  font-size: 14px;
}

.status-box strong {
  color: #2563eb;
}

.content-list {
  display: grid;
  gap: 12px;
}

.content-item {
  display: grid;
  gap: 6px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background-color: #ffffff;
}

.content-item strong {
  font-size: 15px;
  line-height: 1.4;
}

.content-item span {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.form-box {
  display: grid;
  gap: 16px;
  max-width: 520px;
}

.field {
  display: grid;
  gap: 8px;
}

.field__label {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
}

.field__input,
.field__textarea {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background-color: #ffffff;
  color: #111827;
  font: inherit;
  box-sizing: border-box;
}

.field__input {
  height: 42px;
  padding: 0 12px;
}

.field__textarea {
  min-height: 120px;
  padding: 12px;
  resize: vertical;
}

.field__input:focus,
.field__textarea:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
  border-color: #2563eb;
}

.preview-box {
  min-height: 180px;
  padding: 20px;
  border: 1px dashed #93c5fd;
  border-radius: 14px;
  background-color: #eff6ff;
}

.preview-box h3 {
  margin: 0;
  font-size: 20px;
  line-height: 1.4;
}

.preview-box p {
  margin: 12px 0 0;
  color: #4b5563;
  line-height: 1.7;
  white-space: pre-wrap;
}

.tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 7px;
  margin-left: 6px;
  border-radius: 9999px;
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 12px;
  font-weight: 800;
}

.tabs__trigger--active .tab-count {
  background-color: #dbeafe;
  color: #2563eb;
}

@media (max-width: 768px) {
  .app {
    width: min(100% - 24px, 1120px);
    padding: 24px 0 48px;
  }

  .app__hero,
  .section {
    padding: 20px;
    border-radius: 18px;
  }

  .app__title {
    font-size: 28px;
  }
}
</style>