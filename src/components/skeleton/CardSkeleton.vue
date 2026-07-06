<script setup lang="ts">
import Skeleton from './Skeleton.vue'
import './CardSkeleton.css'
</script>

<template>
  <div class="card-skeleton">
    <!-- 이미지 영역 -->
    <Skeleton variant="image" />

    <div class="card-skeleton__body">
      <!-- 제목 -->
      <Skeleton
        variant="text"
        width="70%"
        :height="20"
      />

      <!-- 설명 텍스트 -->
      <Skeleton
        variant="text"
        :lines="3"
      />

      <!-- 버튼 자리 -->
      <Skeleton
        :width="120"
        :height="36"
        :radius="8"
      />
    </div>
  </div>
</template>