<script setup lang="ts">
import { computed } from "vue";
import "./Card.css";

/**
 * CardMedia 이미지 비율 타입입니다.
 *
 * square : 1:1
 * wide   : 4:3
 * video  : 16:9
 * auto   : 원본 비율
 */
export type CardMediaRatio =
  | "square"
  | "wide"
  | "video"
  | "auto";

type CardMediaProps = {
  /**
   * 이미지 주소입니다.
   */
  src?: string;

  /**
   * 이미지 대체 텍스트입니다.
   */
  alt?: string;

  /**
   * 이미지 비율입니다.
   */
  ratio?: CardMediaRatio;

  /**
   * 이미지 lazy loading 여부입니다.
   */
  loading?: "lazy" | "eager";

  /**
   * 이미지 object-fit 값입니다.
   */
  objectFit?: "cover" | "contain";

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<CardMediaProps>(), {
  src: "",
  alt: "",
  ratio: "wide",
  loading: "lazy",
  objectFit: "cover",
  class: "",
});

/**
 * CardMedia class 목록입니다.
 */
const mediaClassName = computed(() => {
  return [
    "card__media",
    `card__media--${props.ratio}`,
    props.class,
  ].filter(Boolean);
});

/**
 * 이미지 class 목록입니다.
 */
const imageClassName = computed(() => {
  return [
    "card__image",
    `card__image--${props.objectFit}`,
  ].filter(Boolean);
});
</script>

<template>
  <div :class="mediaClassName">
    <!-- 이미지가 있을 때 -->
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      :loading="loading"
      :class="imageClassName"
    />

    <!-- 이미지가 없을 때 fallback -->
    <div
      v-else
      class="card__media-fallback"
    >
      <slot name="fallback">
        이미지가 없습니다
      </slot>
    </div>
  </div>
</template>