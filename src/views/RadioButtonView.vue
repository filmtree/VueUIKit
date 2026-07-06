<script setup lang="ts">
import { ref } from 'vue'

import Radio from '/src/components/radio/Radio.vue'
import RadioGroup from '/src/components/radio/RadioGroup.vue'


/**
 * 기본 RadioGroup 예제에서 사용할 선택 값입니다.
 */
const gender = ref('male')

/**
 * 가로형 RadioGroup 예제에서 사용할 선택 값입니다.
 */
const payment = ref('card')

/**
 * 에러 메시지 예제에서 사용할 선택 값입니다.
 */
const delivery = ref('')

/**
 * helperText 예제에서 사용할 선택 값입니다.
 */
const notification = ref('email')

/**
 * Radio 단독 사용 예제에서 사용할 선택 값입니다.
 */
const agreement = ref('yes')

/**
 * 기본 RadioGroup 옵션입니다.
 */
const genderOptions = [
  {
    label: '남성',
    value: 'male',
  },
  {
    label: '여성',
    value: 'female',
  },
]

/**
 * 결제 수단 옵션입니다.
 */
const paymentOptions = [
  {
    label: '카드',
    value: 'card',
  },
  {
    label: '무통장입금',
    value: 'bank',
  },
  {
    label: '휴대폰 결제',
    value: 'phone',
    disabled: true,
  },
]

/**
 * 배송 방식 옵션입니다.
 */
const deliveryOptions = [
  {
    label: '일반 배송',
    value: 'normal',
  },
  {
    label: '빠른 배송',
    value: 'fast',
  },
]

/**
 * 알림 방식 옵션입니다.
 */
const notificationOptions = [
  {
    label: '이메일',
    value: 'email',
  },
  {
    label: '문자',
    value: 'sms',
  },
  {
    label: '카카오 알림톡',
    value: 'kakao',
  },
]
</script>

<template>
  <main class="app">
    <header class="app__header">
      <h1 class="app__title">
        Radio / RadioGroup 예제
      </h1>

      <p class="app__description">
        RadioGroup 중심 사용 방식과 Radio 단독 사용 방식을 한 페이지에서 확인할 수 있습니다.
      </p>
    </header>

    <section class="app__section">
      <div class="app__section-header">
        <h2 class="app__section-title">
          기본 RadioGroup
        </h2>

        <p class="app__section-description">
          세로 방향으로 옵션을 보여주는 기본 구성입니다.
        </p>
      </div>

      <div class="app__card">
        <RadioGroup
          v-model="gender"
          name="gender"
          label="성별"
          :options="genderOptions"
        />

        <div class="app__result">
          선택 값: <strong>{{ gender }}</strong>
        </div>
      </div>
    </section>

    <section class="app__section">
      <div class="app__section-header">
        <h2 class="app__section-title">
          가로형 RadioGroup
        </h2>

        <p class="app__section-description">
          direction 값을 horizontal로 지정하면 옵션을 가로로 배치할 수 있습니다.
        </p>
      </div>

      <div class="app__card">
        <RadioGroup
          v-model="payment"
          name="payment"
          label="결제 수단"
          required
          direction="horizontal"
          :options="paymentOptions"
        />

        <div class="app__result">
          선택 값: <strong>{{ payment }}</strong>
        </div>
      </div>
    </section>

    <section class="app__section">
      <div class="app__section-header">
        <h2 class="app__section-title">
          에러 메시지
        </h2>

        <p class="app__section-description">
          error 또는 errorMessage가 있으면 에러 상태로 표시됩니다.
        </p>
      </div>

      <div class="app__card">
        <RadioGroup
          v-model="delivery"
          name="delivery"
          label="배송 방식"
          error
          error-message="배송 방식을 선택해주세요."
          :options="deliveryOptions"
        />

        <div class="app__result">
          선택 값:
          <strong>
            {{ delivery || '선택 안 됨' }}
          </strong>
        </div>
      </div>
    </section>

    <section class="app__section">
      <div class="app__section-header">
        <h2 class="app__section-title">
          helperText
        </h2>

        <p class="app__section-description">
          에러가 없을 때는 helperText를 사용해 안내 문구를 보여줄 수 있습니다.
        </p>
      </div>

      <div class="app__card">
        <RadioGroup
          v-model="notification"
          name="notification"
          label="알림 방식"
          helper-text="주요 안내를 받을 방식을 선택해주세요."
          :options="notificationOptions"
        />

        <div class="app__result">
          선택 값: <strong>{{ notification }}</strong>
        </div>
      </div>
    </section>

    <section class="app__section">
      <div class="app__section-header">
        <h2 class="app__section-title">
          Radio 단독 사용
        </h2>

        <p class="app__section-description">
          RadioGroup 없이 Radio 컴포넌트만 직접 사용할 수도 있습니다.
        </p>
      </div>

      <div class="app__card">
        <div class="app__radio-list">
          <Radio
            v-model="agreement"
            name="agreement"
            value="yes"
          >
            동의합니다
          </Radio>

          <Radio
            v-model="agreement"
            name="agreement"
            value="no"
          >
            동의하지 않습니다
          </Radio>
        </div>

        <div class="app__result">
          선택 값: <strong>{{ agreement }}</strong>
        </div>
      </div>
    </section>
  </main>
</template>