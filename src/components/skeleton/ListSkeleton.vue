<script setup lang="ts">
import Skeleton from './Skeleton.vue'
import './ListSkeleton.css'

/**
 * 반복해서 보여줄 Skeleton 아이템 개수입니다.
 */
const items = Array.from({
  length: 5,
})
</script>

<template>
  <div class="list-skeleton">
    <div
      v-for="(_, index) in items"
      :key="index"
      class="list-skeleton__item"
    >
      <!-- 썸네일 또는 아바타 -->
      <Skeleton
        variant="circle"
        :width="48"
        :height="48"
      />

      <div class="list-skeleton__content">
        <!-- 제목 -->
        <Skeleton
          variant="text"
          width="60%"
          :height="18"
        />

        <!-- 설명 -->
        <Skeleton
          variant="text"
          width="90%"
        />

        <!-- 보조 설명 -->
        <Skeleton
          variant="text"
          width="40%"
        />
      </div>
    </div>
  </div>
</template>