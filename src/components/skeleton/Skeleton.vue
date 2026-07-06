<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import './Skeleton.css'

/**
 * Skeleton의 시각적 형태 타입입니다.
 *
 * text   : 텍스트 한 줄 형태
 * rect   : 기본 사각형 형태
 * circle : 원형 형태
 * image  : 이미지 영역 형태
 */
type SkeletonVariant =
  | 'text'
  | 'rect'
  | 'circle'
  | 'image'

/**
 * Skeleton 애니메이션 타입입니다.
 *
 * pulse : 밝아졌다 어두워지는 기본 애니메이션
 * wave  : 좌우로 빛이 지나가는 애니메이션
 * none  : 애니메이션 없음
 */
type SkeletonAnimation =
  | 'pulse'
  | 'wave'
  | 'none'

/**
 * Skeleton Props입니다.
 */
interface SkeletonProps {
  /**
   * Skeleton의 모양입니다.
   */
  variant?: SkeletonVariant

  /**
   * Skeleton 너비입니다.
   * 숫자는 px로 처리하고, 문자열은 CSS 값으로 그대로 사용합니다.
   */
  width?: number | string

  /**
   * Skeleton 높이입니다.
   * 숫자는 px로 처리하고, 문자열은 CSS 값으로 그대로 사용합니다.
   */
  height?: number | string

  /**
   * border-radius 값입니다.
   * 숫자는 px로 처리하고, 문자열은 CSS 값으로 그대로 사용합니다.
   */
  radius?: number | string

  /**
   * 여러 줄 텍스트 Skeleton을 만들 때 사용합니다.
   */
  lines?: number

  /**
   * Skeleton 애니메이션 타입입니다.
   */
  animation?: SkeletonAnimation

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'rect',
  width: undefined,
  height: undefined,
  radius: undefined,
  lines: 1,
  animation: 'pulse',
  class: '',
})

/**
 * number로 들어온 값은 px로 변환하고,
 * string으로 들어온 값은 그대로 사용합니다.
 */
const getSizeValue = (value?: number | string) => {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

/**
 * 여러 줄 텍스트 Skeleton 여부입니다.
 */
const isTextMultipleLines = computed(() => {
  return props.variant === 'text' && props.lines > 1
})

/**
 * Skeleton className입니다.
 */
const skeletonClassName = computed(() => {
  return [
    'skeleton',
    `skeleton--${props.variant}`,
    `skeleton--${props.animation}`,
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

/**
 * 여러 줄 Skeleton을 감싸는 group className입니다.
 */
const skeletonGroupClassName = computed(() => {
  return [
    'skeleton-group',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

/**
 * 단일 Skeleton style입니다.
 */
const skeletonStyle = computed<CSSProperties>(() => {
  return {
    width: getSizeValue(props.width),
    height: getSizeValue(props.height),
    borderRadius: getSizeValue(props.radius),
  }
})

/**
 * 여러 줄 Skeleton 생성을 위한 배열입니다.
 */
const lineItems = computed(() => {
  return Array.from({
    length: props.lines,
  })
})

/**
 * 여러 줄 텍스트 Skeleton의 각 줄 style을 반환합니다.
 */
const getLineStyle = (index: number): CSSProperties => {
  const isLastLine = index === props.lines - 1

  return {
    /**
     * 마지막 줄은 실제 문단처럼 조금 짧게 보여줍니다.
     */
    width: isLastLine
      ? '72%'
      : getSizeValue(props.width) ?? '100%',

    height: getSizeValue(props.height),
    borderRadius: getSizeValue(props.radius),
  }
}
</script>

<template>
  <!--
    텍스트 Skeleton을 여러 줄로 보여줄 때는
    lines 개수만큼 Skeleton item을 반복 렌더링합니다.
  -->
  <div
    v-if="isTextMultipleLines"
    :class="skeletonGroupClassName"
    aria-hidden="true"
  >
    <div
      v-for="(_, index) in lineItems"
      :key="index"
      :class="[
        'skeleton',
        'skeleton--text',
        `skeleton--${animation}`,
      ]"
      :style="getLineStyle(index)"
    />
  </div>

  <!--
    일반 Skeleton입니다.
  -->
  <div
    v-else
    :class="skeletonClassName"
    :style="skeletonStyle"
    aria-hidden="true"
  />
</template>