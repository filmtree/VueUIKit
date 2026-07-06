<script setup lang="ts">
import { computed } from "vue";
import "./Card.css";

type CardHeaderProps = {
  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<CardHeaderProps>(), {
  class: "",
});

/**
 * CardHeader class 목록입니다.
 */
const headerClassName = computed(() => {
  return ["card__header", props.class].filter(Boolean);
});
</script>

<template>
  <div :class="headerClassName">
    <!-- 제목, 설명, 텍스트 콘텐츠 영역 -->
    <div class="card__header-content">
      <slot />
    </div>

    <!-- 우측 액션 영역: 더보기 버튼, 상태 배지, 아이콘 버튼 등을 넣습니다. -->
    <div
      v-if="$slots.extra"
      class="card__header-extra"
    >
      <slot name="extra" />
    </div>
  </div>
</template>