<script setup lang="ts">
import { ref } from 'vue'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '/src/components/accordion'

/**
 * v-model 제어 방식 예제에서 사용할 열린 항목 값입니다.
 *
 * Accordion 컴포넌트가 update:modelValue로 string[]을 emit하기 때문에
 * string[] 형태로 관리합니다.
 */
const controlledOpenValues = ref<string[]>(['controlled-1'])

/**
 * 여러 개 열리는 예제에서 사용할 열린 항목 값입니다.
 */
const multipleOpenValues = ref<string[]>(['multiple-1', 'multiple-3'])

/**
 * 동적 콘텐츠 예제에서 사용할 목록입니다.
 *
 * 실제 프로젝트에서는 API 응답 데이터가 들어오는 상황과 비슷합니다.
 */
const dynamicItems = ref([
  '첫 번째 동적 콘텐츠입니다.',
  '두 번째 동적 콘텐츠입니다.',
])

/**
 * 동적 콘텐츠를 추가합니다.
 *
 * AccordionContent 내부에서 ResizeObserver를 사용하고 있다면
 * 내용이 늘어나도 높이가 다시 계산됩니다.
 */
function addDynamicItem() {
  dynamicItems.value.push(
    `${dynamicItems.value.length + 1}번째 동적 콘텐츠입니다.`,
  )
}
</script>

<template>
  <main class="accordion-view">
    <section class="accordion-view__hero">
      <p class="accordion-view__eyebrow">
        Components
      </p>

      <h1 class="accordion-view__title">
        Accordion
      </h1>

      <p class="accordion-view__description">
        제목을 클릭하면 관련 내용을 펼쳐서 보여주는 UI입니다.
        FAQ, 설정 페이지, 상품 상세 정보, 공지사항 목록에서 자주 사용할 수 있습니다.
      </p>
    </section>

    <!-- 기본 사용 예제 -->
    <section class="accordion-example">
      <div class="accordion-example__header">
        <h2 class="accordion-example__title">
          기본 사용
        </h2>

        <p class="accordion-example__description">
          하나의 항목만 열리는 가장 기본적인 형태입니다.
        </p>
      </div>

      <div class="accordion-example__content">
        <Accordion
          type="single"
          default-value="basic-1"
        >
          <AccordionItem value="basic-1">
            <AccordionTrigger>
              Accordion은 언제 사용하나요?
            </AccordionTrigger>

            <AccordionContent>
              관련 내용을 접었다 펼쳐야 하는 화면에서 사용합니다.
              FAQ, 상품 상세 정보, 설정 메뉴처럼 한 화면에 많은 정보를 정리할 때 유용합니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="basic-2">
            <AccordionTrigger>
              내용 높이가 달라도 괜찮나요?
            </AccordionTrigger>

            <AccordionContent>
              네. 콘텐츠 높이를 고정하지 않고 실제 내용 높이를 기준으로 열림과 닫힘을 처리하므로
              짧은 내용과 긴 내용이 섞여 있어도 자연스럽게 동작합니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="basic-3">
            <AccordionTrigger>
              다시 클릭하면 닫히나요?
            </AccordionTrigger>

            <AccordionContent>
              기본적으로 collapsible 옵션이 true이므로 이미 열린 항목을 다시 클릭하면 닫을 수 있습니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- v-model 제어 예제 -->
    <section class="accordion-example">
      <div class="accordion-example__header">
        <h2 class="accordion-example__title">
          v-model 제어 방식
        </h2>

        <p class="accordion-example__description">
          부모 컴포넌트에서 현재 열린 항목을 직접 관리하는 방식입니다.
        </p>
      </div>

      <div class="accordion-example__content">
        <div class="accordion-state-box">
          현재 열린 항목:
          <strong>
            {{ controlledOpenValues.length ? controlledOpenValues.join(', ') : '없음' }}
          </strong>
        </div>

        <Accordion
          v-model="controlledOpenValues"
          type="single"
        >
          <AccordionItem value="controlled-1">
            <AccordionTrigger>
              회원가입은 무료인가요?
            </AccordionTrigger>

            <AccordionContent>
              네, 회원가입은 무료입니다. 일부 유료 기능은 별도 결제가 필요할 수 있습니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="controlled-2">
            <AccordionTrigger>
              비밀번호를 잊어버렸어요.
            </AccordionTrigger>

            <AccordionContent>
              로그인 화면의 비밀번호 찾기 메뉴에서 이메일 인증 후 재설정할 수 있습니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="controlled-3">
            <AccordionTrigger>
              계정을 삭제할 수 있나요?
            </AccordionTrigger>

            <AccordionContent>
              마이페이지의 계정 관리 메뉴에서 계정 삭제를 요청할 수 있습니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- 여러 개 열리는 예제 -->
    <section class="accordion-example">
      <div class="accordion-example__header">
        <h2 class="accordion-example__title">
          여러 개 열기
        </h2>

        <p class="accordion-example__description">
          type을 multiple로 설정하면 여러 항목을 동시에 열 수 있습니다.
        </p>
      </div>

      <div class="accordion-example__content">
        <div class="accordion-state-box">
          현재 열린 항목:
          <strong>
            {{ multipleOpenValues.length ? multipleOpenValues.join(', ') : '없음' }}
          </strong>
        </div>

        <Accordion
          v-model="multipleOpenValues"
          type="multiple"
        >
          <AccordionItem value="multiple-1">
            <AccordionTrigger>
              배송 안내
            </AccordionTrigger>

            <AccordionContent>
              배송은 결제 완료 후 순차적으로 진행됩니다.
              일반적으로 영업일 기준 2~3일 정도 소요됩니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="multiple-2">
            <AccordionTrigger>
              교환 안내
            </AccordionTrigger>

            <AccordionContent>
              교환은 상품 수령 후 7일 이내에 신청할 수 있습니다.
              단, 사용 흔적이 있거나 포장이 훼손된 경우 교환이 제한될 수 있습니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="multiple-3">
            <AccordionTrigger>
              환불 안내
            </AccordionTrigger>

            <AccordionContent>
              환불은 반품 상품 확인 후 영업일 기준 3~5일 내 처리됩니다.
              결제 수단에 따라 실제 입금 시점은 달라질 수 있습니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- 카드형 예제 -->
    <section class="accordion-example">
      <div class="accordion-example__header">
        <h2 class="accordion-example__title">
          카드형 스타일
        </h2>

        <p class="accordion-example__description">
          class를 추가해서 일반 리스트형이 아닌 카드형 UI로 사용할 수 있습니다.
        </p>
      </div>

      <div class="accordion-example__content">
        <Accordion
          class="accordion--card"
          type="multiple"
          :default-value="['card-1']"
        >
          <AccordionItem value="card-1">
            <AccordionTrigger>
              공지사항 1
            </AccordionTrigger>

            <AccordionContent>
              카드형 아코디언은 독립적인 정보 블록을 보여줄 때 사용하기 좋습니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="card-2">
            <AccordionTrigger>
              공지사항 2
            </AccordionTrigger>

            <AccordionContent>
              각 항목이 카드처럼 분리되어 보이기 때문에 설정 페이지나 안내 목록에 잘 어울립니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="card-3">
            <AccordionTrigger>
              공지사항 3
            </AccordionTrigger>

            <AccordionContent>
              border, radius, background 스타일만 확장해도 기본 구조는 그대로 재사용할 수 있습니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- 비활성 예제 -->
    <section class="accordion-example">
      <div class="accordion-example__header">
        <h2 class="accordion-example__title">
          비활성 항목
        </h2>

        <p class="accordion-example__description">
          특정 항목을 클릭할 수 없도록 disabled 상태로 만들 수 있습니다.
        </p>
      </div>

      <div class="accordion-example__content">
        <Accordion type="single">
          <AccordionItem value="disabled-1">
            <AccordionTrigger>
              사용 가능한 항목
            </AccordionTrigger>

            <AccordionContent>
              이 항목은 정상적으로 열고 닫을 수 있습니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="disabled-2"
            disabled
          >
            <AccordionTrigger>
              비활성 항목
            </AccordionTrigger>

            <AccordionContent>
              이 내용은 항목이 disabled 상태이므로 열리지 않습니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="disabled-3">
            <AccordionTrigger>
              다시 사용 가능한 항목
            </AccordionTrigger>

            <AccordionContent>
              disabled가 아닌 항목은 계속 사용할 수 있습니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- 커스텀 아이콘 예제 -->
    <section class="accordion-example">
      <div class="accordion-example__header">
        <h2 class="accordion-example__title">
          커스텀 아이콘
        </h2>

        <p class="accordion-example__description">
          Trigger의 icon 슬롯을 사용하면 기본 화살표 대신 원하는 아이콘을 넣을 수 있습니다.
        </p>
      </div>

      <div class="accordion-example__content">
        <Accordion type="single">
          <AccordionItem value="icon-1">
            <AccordionTrigger>
              플러스 아이콘 사용

              <template #icon>
                +
              </template>
            </AccordionTrigger>

            <AccordionContent>
              icon 슬롯에 텍스트, SVG, 아이콘 컴포넌트 등을 넣을 수 있습니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="icon-2">
            <AccordionTrigger>
              화살표 문자 변경

              <template #icon>
                ›
              </template>
            </AccordionTrigger>

            <AccordionContent>
              프로젝트에서 사용하는 아이콘 시스템이 있다면 이 영역에 아이콘 컴포넌트를 넣으면 됩니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- unmountOnExit 예제 -->
    <section class="accordion-example">
      <div class="accordion-example__header">
        <h2 class="accordion-example__title">
          unmountOnExit
        </h2>

        <p class="accordion-example__description">
          닫힌 콘텐츠를 DOM에서 제거해야 하는 경우 사용할 수 있습니다.
        </p>
      </div>

      <div class="accordion-example__content">
        <Accordion type="single">
          <AccordionItem value="unmount-1">
            <AccordionTrigger>
              닫히면 DOM에서 제거되는 콘텐츠
            </AccordionTrigger>

            <AccordionContent unmount-on-exit>
              이 내용은 닫힘 애니메이션이 끝난 뒤 DOM에서 제거됩니다.
              무거운 컴포넌트나 필요할 때만 렌더링해야 하는 영역에 사용할 수 있습니다.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="unmount-2">
            <AccordionTrigger>
              일반 콘텐츠
            </AccordionTrigger>

            <AccordionContent>
              이 내용은 닫힌 상태에서도 DOM에 남아 있습니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- 동적 콘텐츠 예제 -->
    <section class="accordion-example">
      <div class="accordion-example__header">
        <h2 class="accordion-example__title">
          동적 콘텐츠 높이 대응
        </h2>

        <p class="accordion-example__description">
          열린 상태에서 내용이 추가되어도 높이를 다시 계산하는지 확인할 수 있는 예제입니다.
        </p>
      </div>

      <div class="accordion-example__content">
        <button
          type="button"
          class="accordion-demo-button"
          @click="addDynamicItem"
        >
          콘텐츠 추가
        </button>

        <Accordion
          type="single"
          default-value="dynamic-1"
        >
          <AccordionItem value="dynamic-1">
            <AccordionTrigger>
              동적으로 늘어나는 콘텐츠
            </AccordionTrigger>

            <AccordionContent>
              <ul class="accordion-demo-list">
                <li
                  v-for="item in dynamicItems"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  </main>
</template>

<style scoped>
.accordion-view {
  width: min(100%, 960px);
  margin: 0 auto;
  padding: 48px 20px 80px;
  color: #111827;
}

.accordion-view__hero {
  margin-bottom: 40px;
}

.accordion-view__eyebrow {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.accordion-view__title {
  margin: 0;
  font-size: 40px;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.accordion-view__description {
  max-width: 720px;
  margin: 16px 0 0;
  color: #4b5563;
  font-size: 16px;
  line-height: 1.7;
}

.accordion-example {
  padding: 28px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background-color: #ffffff;
}

.accordion-example + .accordion-example {
  margin-top: 24px;
}

.accordion-example__header {
  margin-bottom: 20px;
}

.accordion-example__title {
  margin: 0;
  font-size: 22px;
  line-height: 1.35;
  letter-spacing: -0.02em;
}

.accordion-example__description {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

.accordion-example__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.accordion-state-box {
  padding: 12px 14px;
  border: 1px solid #dbeafe;
  border-radius: 10px;
  background-color: #eff6ff;
  color: #1e3a8a;
  font-size: 14px;
  line-height: 1.5;
}

.accordion-demo-button {
  align-self: flex-start;
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid #2563eb;
  border-radius: 8px;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.accordion-demo-button:hover {
  background-color: #1d4ed8;
}

.accordion-demo-button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.accordion-demo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding-left: 20px;
}

.accordion-demo-list li {
  line-height: 1.6;
}

@media (max-width: 640px) {
  .accordion-view {
    padding: 32px 16px 56px;
  }

  .accordion-view__title {
    font-size: 32px;
  }

  .accordion-example {
    padding: 20px;
    border-radius: 16px;
  }
}
</style>