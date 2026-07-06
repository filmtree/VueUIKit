<script setup lang="ts">
import { computed, ref } from 'vue'

import Select from '/src/components/select/Select.vue'
import CustomSelect from '/src/components/select/CustomSelect.vue'

import type { SelectOption } from '/src/components/select/Select.vue'
import type { CustomSelectOption } from '/src/components/select/CustomSelect.vue'

/**
 * 기본 Select 옵션입니다.
 */
const countryOptions: SelectOption[] = [
  {
    label: '대한민국',
    value: 'kr',
  },
  {
    label: '일본',
    value: 'jp',
  },
  {
    label: '미국',
    value: 'us',
  },
  {
    label: '프랑스',
    value: 'fr',
  },
]

/**
 * 직업 Select 옵션입니다.
 */
const jobOptions: SelectOption[] = [
  {
    label: '웹 퍼블리셔',
    value: 'publisher',
  },
  {
    label: '프론트엔드 개발자',
    value: 'frontend',
  },
  {
    label: '웹 디자이너',
    value: 'designer',
  },
  {
    label: '기획자',
    value: 'planner',
  },
]

/**
 * 카테고리 옵션입니다.
 */
const categoryOptions: SelectOption[] = [
  {
    label: '공지',
    value: 'notice',
  },
  {
    label: '이벤트',
    value: 'event',
  },
  {
    label: 'FAQ',
    value: 'faq',
  },
]

/**
 * CustomSelect 옵션입니다.
 */
const customCategoryOptions: CustomSelectOption[] = [
  {
    label: '공지사항',
    value: 'notice',
  },
  {
    label: '이벤트',
    value: 'event',
  },
  {
    label: 'FAQ',
    value: 'faq',
    disabled: true,
  },
  {
    label: '문의',
    value: 'qna',
  },
]

/**
 * 배송 방식 옵션입니다.
 */
const deliveryOptions: CustomSelectOption[] = [
  {
    label: '일반 배송',
    value: 'normal',
  },
  {
    label: '빠른 배송',
    value: 'fast',
  },
  {
    label: '방문 수령',
    value: 'pickup',
  },
]

/**
 * 상태 값입니다.
 */
const country = ref('')
const job = ref('')
const category = ref('')
const sizeValue = ref('')
const successValue = ref('frontend')
const customCategory = ref('')
const delivery = ref('')
const eventCategory = ref('')

/**
 * change 이벤트 확인용 메시지입니다.
 */
const changeMessage = ref('아직 선택된 항목이 없습니다.')

/**
 * Select change 이벤트 예제입니다.
 */
const handleNativeSelectChange = (value: string) => {
  changeMessage.value = `기본 Select에서 선택한 값: ${value}`
}

/**
 * CustomSelect change 이벤트 예제입니다.
 */
const handleCustomSelectChange = (
  value: string,
  option: CustomSelectOption,
) => {
  changeMessage.value = `CustomSelect에서 선택한 항목: ${option.label} / 값: ${value}`
}

/**
 * 값이 비어 있는지 확인해서 에러 상태를 표시합니다.
 */
const isCategoryError = computed(() => {
  return !category.value
})

/**
 * 배송 방식 에러 상태입니다.
 */
const isDeliveryError = computed(() => {
  return !delivery.value
})

/**
 * 선택된 값을 화면에 표시하기 위한 함수입니다.
 */
const getOptionLabel = (
  options: Array<SelectOption | CustomSelectOption>,
  value: string,
) => {
  const targetOption = options.find((option) => {
    return option.value === value
  })

  return targetOption ? targetOption.label : '선택 안 됨'
}
</script>

<template>
  <main class="app">
    <section class="app__hero">
      <p class="app__eyebrow">
        Vue 3 UI Components
      </p>

      <h1 class="app__title">
        Select 통합 예제
      </h1>

      <p class="app__description">
        기본 HTML select 기반 Select와 버튼 + 리스트 기반 CustomSelect를
        한 페이지에서 비교하면서 확인할 수 있는 예제입니다.
      </p>
    </section>

    <section class="app__grid">
      <!-- 기본 Select -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            기본 Select
          </h2>

          <p class="example-card__text">
            가장 기본적인 단일 선택 폼입니다.
          </p>
        </div>

        <Select
          id="country"
          v-model="country"
          label="국가"
          placeholder="국가를 선택하세요"
          helper-text="서비스를 이용할 국가를 선택하세요."
          :options="countryOptions"
          @change="handleNativeSelectChange"
        />
      </article>

      <!-- fullWidth Select -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            전체 너비 Select
          </h2>

          <p class="example-card__text">
            폼 영역 전체 너비에 맞춰 사용하는 예제입니다.
          </p>
        </div>

        <Select
          id="job"
          v-model="job"
          label="직업"
          placeholder="직업을 선택하세요"
          helper-text="현재 담당 업무와 가장 가까운 항목을 선택하세요."
          full-width
          :options="jobOptions"
        />
      </article>

      <!-- 크기별 Select -->
      <article class="example-card example-card--wide">
        <div class="example-card__header">
          <h2 class="example-card__title">
            크기별 Select
          </h2>

          <p class="example-card__text">
            sm, md, lg 크기를 상황에 맞게 사용할 수 있습니다.
          </p>
        </div>

        <div class="stack">
          <Select
            id="size-sm"
            v-model="sizeValue"
            label="작은 크기"
            placeholder="sm 크기"
            size="sm"
            full-width
            :options="countryOptions"
          />

          <Select
            id="size-md"
            v-model="sizeValue"
            label="기본 크기"
            placeholder="md 크기"
            size="md"
            full-width
            :options="countryOptions"
          />

          <Select
            id="size-lg"
            v-model="sizeValue"
            label="큰 크기"
            placeholder="lg 크기"
            size="lg"
            full-width
            :options="countryOptions"
          />
        </div>
      </article>

      <!-- 에러 상태 Select -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            에러 상태
          </h2>

          <p class="example-card__text">
            필수 값을 선택하지 않았을 때 에러 메시지를 표시합니다.
          </p>
        </div>

        <Select
          id="category"
          v-model="category"
          label="카테고리"
          required
          placeholder="카테고리를 선택하세요"
          full-width
          :error="isCategoryError"
          :error-message="isCategoryError ? '카테고리를 선택해주세요.' : ''"
          :options="categoryOptions"
        />
      </article>

      <!-- 성공 상태 Select -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            성공 상태
          </h2>

          <p class="example-card__text">
            유효한 값이 선택되었을 때 성공 메시지를 표시합니다.
          </p>
        </div>

        <Select
          id="success-job"
          v-model="successValue"
          label="담당 업무"
          full-width
          success
          success-message="담당 업무가 선택되었습니다."
          :options="jobOptions"
        />
      </article>

      <!-- CustomSelect 기본 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            CustomSelect 기본
          </h2>

          <p class="example-card__text">
            디자인 커스터마이징이 필요한 경우 사용할 수 있는 선택 컴포넌트입니다.
          </p>
        </div>

        <CustomSelect
          v-model="customCategory"
          label="게시판"
          placeholder="게시판을 선택하세요"
          helper-text="FAQ는 비활성화된 옵션입니다."
          full-width
          :options="customCategoryOptions"
          @change="handleCustomSelectChange"
        />
      </article>

      <!-- CustomSelect 에러 -->
      <article class="example-card">
        <div class="example-card__header">
          <h2 class="example-card__title">
            CustomSelect 에러 상태
          </h2>

          <p class="example-card__text">
            CustomSelect에서도 동일하게 에러 상태를 표현할 수 있습니다.
          </p>
        </div>

        <CustomSelect
          v-model="delivery"
          label="배송 방식"
          placeholder="배송 방식을 선택하세요"
          required
          full-width
          :error="isDeliveryError"
          :error-message="isDeliveryError ? '배송 방식을 선택해주세요.' : ''"
          :options="deliveryOptions"
        />
      </article>

      <!-- CustomSelect change 이벤트 -->
      <article class="example-card example-card--wide">
        <div class="example-card__header">
          <h2 class="example-card__title">
            change 이벤트 확인
          </h2>

          <p class="example-card__text">
            선택 값뿐만 아니라 선택된 option 전체 정보가 필요할 때 사용할 수 있습니다.
          </p>
        </div>

        <CustomSelect
          v-model="eventCategory"
          label="이벤트 카테고리"
          placeholder="카테고리를 선택하세요"
          full-width
          :options="customCategoryOptions"
          @change="handleCustomSelectChange"
        />

        <div class="event-message">
          {{ changeMessage }}
        </div>
      </article>
    </section>

    <section class="summary-card">
      <h2 class="summary-card__title">
        현재 선택 값
      </h2>

      <dl class="summary-list">
        <div class="summary-list__item">
          <dt>국가</dt>
          <dd>{{ getOptionLabel(countryOptions, country) }}</dd>
        </div>

        <div class="summary-list__item">
          <dt>직업</dt>
          <dd>{{ getOptionLabel(jobOptions, job) }}</dd>
        </div>

        <div class="summary-list__item">
          <dt>카테고리</dt>
          <dd>{{ getOptionLabel(categoryOptions, category) }}</dd>
        </div>

        <div class="summary-list__item">
          <dt>CustomSelect</dt>
          <dd>{{ getOptionLabel(customCategoryOptions, customCategory) }}</dd>
        </div>

        <div class="summary-list__item">
          <dt>배송 방식</dt>
          <dd>{{ getOptionLabel(deliveryOptions, delivery) }}</dd>
        </div>

        <div class="summary-list__item">
          <dt>이벤트 카테고리</dt>
          <dd>{{ getOptionLabel(customCategoryOptions, eventCategory) }}</dd>
        </div>
      </dl>
    </section>
  </main>
</template>

<style scoped>
.app {
  min-height: 100vh;
  padding: 48px 24px;

  background: #f3f4f6;
  color: #111827;
  box-sizing: border-box;
}

.app__hero {
  max-width: 960px;
  margin: 0 auto 32px;
}

.app__eyebrow {
  margin: 0 0 8px;

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
}

.app__title {
  margin: 0;

  font-size: 36px;
  line-height: 1.2;
  letter-spacing: -0.04em;
}

.app__description {
  max-width: 720px;
  margin: 16px 0 0;

  font-size: 16px;
  line-height: 1.7;
  color: #4b5563;
}

.app__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  max-width: 960px;
  margin: 0 auto;
}

.example-card {
  min-width: 0;
  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 20px;

  background: #ffffff;

  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
}

.example-card--wide {
  grid-column: 1 / -1;
}

.example-card__header {
  margin-bottom: 20px;
}

.example-card__title {
  margin: 0;

  font-size: 18px;
  line-height: 1.4;
}

.example-card__text {
  margin: 8px 0 0;

  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
}

.stack {
  display: grid;
  gap: 16px;
}

.event-message {
  margin-top: 16px;
  padding: 14px 16px;

  border: 1px solid #dbeafe;
  border-radius: 12px;

  background: #eff6ff;
  color: #1d4ed8;

  font-size: 14px;
  font-weight: 600;
}

.summary-card {
  max-width: 960px;
  margin: 20px auto 0;
  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 20px;

  background: #ffffff;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
}

.summary-card__title {
  margin: 0 0 16px;

  font-size: 18px;
}

.summary-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  margin: 0;
}

.summary-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  min-width: 0;
  padding: 12px 14px;

  border-radius: 12px;
  background: #f9fafb;
}

.summary-list__item dt {
  flex: 0 0 auto;

  font-size: 13px;
  font-weight: 700;
  color: #4b5563;
}

.summary-list__item dd {
  overflow: hidden;

  margin: 0;

  font-size: 13px;
  font-weight: 700;
  color: #111827;

  white-space: nowrap;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .app {
    padding: 32px 16px;
  }

  .app__title {
    font-size: 28px;
  }

  .app__grid {
    grid-template-columns: 1fr;
  }

  .example-card {
    padding: 20px;
  }

  .summary-list {
    grid-template-columns: 1fr;
  }

  .summary-list__item {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .summary-list__item dd {
    white-space: normal;
  }
}
</style>