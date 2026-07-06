<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Skeleton from '/src/components/skeleton/Skeleton.vue'

type Post = {
  id: number
  title: string
  description: string
  category: string
}

/**
 * 실제 데이터 로딩 예제를 보여주기 위한 로딩 상태입니다.
 */
const loading = ref(true)

/**
 * 로딩 완료 후 보여줄 게시글 데이터입니다.
 */
const posts = ref<Post[]>([])

/**
 * 카드 Skeleton을 반복 렌더링하기 위한 배열입니다.
 */
const cardSkeletonItems = Array.from({
  length: 3,
})

/**
 * 리스트 Skeleton을 반복 렌더링하기 위한 배열입니다.
 */
const listSkeletonItems = Array.from({
  length: 5,
})

/**
 * 실제 API 요청 흐름을 흉내 내는 함수입니다.
 */
const fetchPosts = async () => {
  try {
    loading.value = true

    /**
     * 실제 프로젝트에서는 이 부분에 fetch 또는 axios 요청이 들어갑니다.
     */
    await new Promise((resolve) => {
      setTimeout(resolve, 1200)
    })

    posts.value = [
      {
        id: 1,
        title: 'Skeleton 컴포넌트 사용 방식',
        description: '로딩 중인 카드, 목록, 프로필 화면을 Skeleton으로 자연스럽게 표현합니다.',
        category: 'UI Component',
      },
      {
        id: 2,
        title: '텍스트 Skeleton 처리',
        description: '문단형 콘텐츠는 lines 속성을 사용해서 여러 줄 형태로 표시할 수 있습니다.',
        category: 'Loading',
      },
      {
        id: 3,
        title: '이미지 영역 로딩 처리',
        description: '썸네일, 배너, 카드 이미지는 image variant로 공간을 먼저 잡아둘 수 있습니다.',
        category: 'Layout',
      },
    ]
  } finally {
    loading.value = false
  }
}

/**
 * 예제를 처음 열었을 때 로딩 상태를 보여줍니다.
 */
onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <main class="app">
    <section class="app__hero">
      <p class="app__eyebrow">UI Component Example</p>

      <h1 class="app__title">
        Skeleton 예제 모음
      </h1>

      <p class="app__description">
        기본 Skeleton, 카드 Skeleton, 리스트 Skeleton, 실제 데이터 로딩 전환 예제를
        한 화면에서 확인할 수 있는 구성입니다.
      </p>

      <button
        type="button"
        class="app__button"
        @click="fetchPosts"
      >
        로딩 다시 보기
      </button>
    </section>

    <!-- 기본 Skeleton 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          기본 Skeleton
        </h2>

        <p class="section__description">
          text, rect, circle, image 형태를 각각 확인할 수 있습니다.
        </p>
      </div>

      <div class="basic-grid">
        <article class="example-card">
          <h3 class="example-card__title">
            Text
          </h3>

          <div class="example-card__content">
            <Skeleton
              variant="text"
              width="80%"
            />

            <Skeleton
              variant="text"
              width="60%"
            />

            <Skeleton
              variant="text"
              width="40%"
            />
          </div>
        </article>

        <article class="example-card">
          <h3 class="example-card__title">
            Multiple Text Lines
          </h3>

          <div class="example-card__content">
            <Skeleton
              variant="text"
              :lines="4"
            />
          </div>
        </article>

        <article class="example-card">
          <h3 class="example-card__title">
            Circle
          </h3>

          <div class="avatar-example">
            <Skeleton
              variant="circle"
              :width="56"
              :height="56"
            />

            <div class="avatar-example__content">
              <Skeleton
                variant="text"
                width="120px"
                :height="18"
              />

              <Skeleton
                variant="text"
                width="180px"
              />
            </div>
          </div>
        </article>

        <article class="example-card">
          <h3 class="example-card__title">
            Image
          </h3>

          <Skeleton variant="image" />
        </article>

        <article class="example-card">
          <h3 class="example-card__title">
            Button
          </h3>

          <div class="button-skeleton-row">
            <Skeleton
              :width="96"
              :height="40"
              :radius="8"
            />

            <Skeleton
              :width="120"
              :height="40"
              :radius="8"
            />
          </div>
        </article>

        <article class="example-card">
          <h3 class="example-card__title">
            Animation
          </h3>

          <div class="example-card__content">
            <Skeleton
              variant="text"
              animation="pulse"
            />

            <Skeleton
              variant="text"
              animation="wave"
            />

            <Skeleton
              variant="text"
              animation="none"
            />
          </div>
        </article>
      </div>
    </section>

    <!-- 카드 Skeleton 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          Card Skeleton
        </h2>

        <p class="section__description">
          카드 UI의 이미지, 제목, 설명, 버튼 영역을 Skeleton으로 구성한 예제입니다.
        </p>
      </div>

      <div class="card-grid">
        <article
          v-for="(_, index) in cardSkeletonItems"
          :key="index"
          class="card-skeleton"
        >
          <Skeleton variant="image" />

          <div class="card-skeleton__body">
            <Skeleton
              variant="text"
              width="70%"
              :height="20"
            />

            <Skeleton
              variant="text"
              :lines="3"
            />

            <Skeleton
              :width="120"
              :height="36"
              :radius="8"
            />
          </div>
        </article>
      </div>
    </section>

    <!-- 리스트 Skeleton 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          List Skeleton
        </h2>

        <p class="section__description">
          게시글 목록, 알림 목록, 상품 목록에서 자주 사용하는 리스트형 Skeleton입니다.
        </p>
      </div>

      <div class="list-skeleton">
        <div
          v-for="(_, index) in listSkeletonItems"
          :key="index"
          class="list-skeleton__item"
        >
          <Skeleton
            variant="circle"
            :width="48"
            :height="48"
          />

          <div class="list-skeleton__content">
            <Skeleton
              variant="text"
              width="60%"
              :height="18"
            />

            <Skeleton
              variant="text"
              width="90%"
            />

            <Skeleton
              variant="text"
              width="40%"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 실제 데이터 로딩 전환 예제 -->
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">
          실제 데이터 로딩 전환
        </h2>

        <p class="section__description">
          loading 값이 true일 때 Skeleton을 보여주고, 데이터가 준비되면 실제 콘텐츠로 전환합니다.
        </p>
      </div>

      <div
        v-if="loading"
        class="post-grid"
      >
        <article
          v-for="(_, index) in cardSkeletonItems"
          :key="index"
          class="post-card post-card--loading"
        >
          <Skeleton variant="image" />

          <div class="post-card__body">
            <Skeleton
              variant="text"
              width="44%"
              :height="14"
            />

            <Skeleton
              variant="text"
              width="80%"
              :height="22"
            />

            <Skeleton
              variant="text"
              :lines="3"
            />
          </div>
        </article>
      </div>

      <div
        v-else
        class="post-grid"
      >
        <article
          v-for="post in posts"
          :key="post.id"
          class="post-card"
        >
          <div class="post-card__thumbnail">
            {{ post.id }}
          </div>

          <div class="post-card__body">
            <span class="post-card__category">
              {{ post.category }}
            </span>

            <h3 class="post-card__title">
              {{ post.title }}
            </h3>

            <p class="post-card__description">
              {{ post.description }}
            </p>
          </div>
        </article>
      </div>
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
    linear-gradient(135deg, #f8fafc 0%, #ffffff 60%),
    #ffffff;
}

.app__eyebrow {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 700;
  color: #2563eb;
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
  max-width: 720px;
  margin: 16px 0 0;
  font-size: 16px;
  line-height: 1.7;
  color: #4b5563;
}

.app__button {
  height: 42px;
  padding: 0 18px;
  margin-top: 24px;
  border: 0;
  border-radius: 10px;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.app__button:hover {
  background-color: #1d4ed8;
}

.section {
  padding: 28px;
  margin-top: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background-color: #ffffff;
}

.section__header {
  margin-bottom: 20px;
}

.section__title {
  margin: 0;
  font-size: 22px;
  line-height: 1.35;
  letter-spacing: -0.02em;
}

.section__description {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
}

.basic-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.example-card {
  min-width: 0;
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background-color: #f9fafb;
}

.example-card__title {
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.4;
}

.example-card__content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.avatar-example {
  display: flex;
  gap: 12px;
  align-items: center;
}

.avatar-example__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.button-skeleton-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.card-skeleton {
  min-width: 0;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background-color: #ffffff;
}

.card-skeleton__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.list-skeleton {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list-skeleton__item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background-color: #f9fafb;
}

.list-skeleton__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.post-card {
  overflow: hidden;
  min-width: 0;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background-color: #ffffff;
}

.post-card--loading {
  padding: 16px;
}

.post-card__thumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 9;
  background-color: #eff6ff;
  color: #2563eb;
  font-size: 40px;
  font-weight: 800;
}

.post-card__body {
  padding: 18px;
}

.post-card--loading .post-card__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0 0;
}

.post-card__category {
  display: inline-flex;
  margin-bottom: 10px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
}

.post-card__title {
  margin: 0;
  font-size: 18px;
  line-height: 1.45;
  letter-spacing: -0.02em;
}

.post-card__description {
  margin: 10px 0 0;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .basic-grid,
  .card-grid,
  .post-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
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

  .basic-grid,
  .card-grid,
  .post-grid {
    grid-template-columns: 1fr;
  }
}
</style>