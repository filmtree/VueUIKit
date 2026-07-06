<script setup lang="ts">
import { onMounted } from 'vue'

import { InfiniteScroll } from '/src/components/infinite-scroll'
import {
  useInfiniteList,
  type InfiniteListResponse,
} from '/src/composables/useInfiniteList'

type Post = {
  id: number
  title: string
  body: string
  author: string
  createdAt: string
}

/**
 * 예제용 API 함수입니다.
 * 실제 프로젝트에서는 services/postService.ts 같은 파일로 분리해서 사용하면 됩니다.
 */
async function fetchPosts(
  page: number,
  options: {
    signal: AbortSignal
  },
): Promise<InfiniteListResponse<Post>> {
  await new Promise((resolve) => {
    setTimeout(resolve, 700)
  })

  if (options.signal.aborted) {
    throw new DOMException('요청이 취소되었습니다.', 'AbortError')
  }

  const PAGE_SIZE = 8
  const TOTAL_COUNT = 42

  const startIndex = (page - 1) * PAGE_SIZE

  const items = Array.from({
    length: PAGE_SIZE,
  })
    .map((_, index) => {
      const id = startIndex + index + 1

      if (id > TOTAL_COUNT) return null

      return {
        id,
        title: `게시글 제목 ${id}`,
        body: `게시글 ${id}번의 내용입니다. Infinite Scroll 예제 데이터입니다.`,
        author: '관리자',
        createdAt: '2026.07.02',
      }
    })
    .filter((item): item is Post => item !== null)

  return {
    items,
    hasMore: startIndex + PAGE_SIZE < TOTAL_COUNT,
  }
}

const {
  items: posts,
  hasMore,
  isLoading,
  isInitialLoading,
  error,
  loadPage,
  loadMore,
  refresh,
} = useInfiniteList<Post>({
  fetchPage: fetchPosts,
  errorMessage: '게시글을 불러오지 못했습니다.',
})

/**
 * 첫 진입 시 1페이지를 불러옵니다.
 */
onMounted(() => {
  loadPage(1)
})
</script>

<template>
  <main class="post-list-page">
    <header class="post-list-page__header">
      <div>
        <h1 class="post-list-page__title">
          게시글 목록
        </h1>

        <p class="post-list-page__description">
          스크롤을 내리면 다음 게시글을 자동으로 불러옵니다.
        </p>
      </div>

      <button
        type="button"
        class="post-list-page__refresh"
        :disabled="isLoading"
        @click="refresh"
      >
        새로고침
      </button>
    </header>

    <InfiniteScroll
      :has-more="hasMore"
      :is-loading="isLoading"
      :is-initial-loading="isInitialLoading"
      :item-count="posts.length"
      :error="error"
      empty-text="게시글이 없습니다."
      loading-text="게시글을 불러오는 중입니다."
      end-text="모든 게시글을 확인했습니다."
      root-margin="400px"
      @load-more="loadMore"
    >
      <div class="post-list">
        <article
          v-for="post in posts"
          :key="post.id"
          class="post-card"
        >
          <h2 class="post-card__title">
            {{ post.title }}
          </h2>

          <p class="post-card__body">
            {{ post.body }}
          </p>

          <div class="post-card__meta">
            <span>{{ post.author }}</span>
            <span>{{ post.createdAt }}</span>
          </div>
        </article>
      </div>

      <template #error>
        <div class="post-list-page__error">
          <p>{{ error }}</p>

          <button
            type="button"
            @click="refresh"
          >
            다시 시도
          </button>
        </div>
      </template>
    </InfiniteScroll>
  </main>
</template>

<style scoped>
.post-list-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
}

.post-list-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  margin-bottom: 24px;
}

.post-list-page__title {
  margin: 0;

  font-size: 28px;
  line-height: 1.3;
  color: #111827;
}

.post-list-page__description {
  margin: 8px 0 0;

  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
}

.post-list-page__refresh {
  height: 36px;
  padding: 0 14px;

  border: 1px solid #d1d5db;
  border-radius: 8px;

  color: #111827;
  background: #ffffff;

  font-size: 14px;
  cursor: pointer;
}

.post-list-page__refresh:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.post-list {
  display: grid;
  gap: 12px;
}

.post-card {
  padding: 16px;

  border: 1px solid #e5e7eb;
  border-radius: 12px;

  background: #ffffff;
}

.post-card__title {
  margin: 0;

  font-size: 18px;
  line-height: 1.4;
  color: #111827;
}

.post-card__body {
  margin: 8px 0 0;

  font-size: 14px;
  line-height: 1.6;
  color: #4b5563;
}

.post-card__meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;

  margin-top: 12px;

  font-size: 13px;
  line-height: 1.4;
  color: #9ca3af;
}

.post-list-page__error {
  display: grid;
  justify-items: center;
  gap: 8px;
}

.post-list-page__error p {
  margin: 0;
}

.post-list-page__error button {
  height: 34px;
  padding: 0 12px;

  border: 1px solid #fecaca;
  border-radius: 8px;

  color: #b91c1c;
  background: #ffffff;

  cursor: pointer;
}
</style>