<script setup lang="ts">
import { computed, inject } from "vue";
import {
  BreadcrumbContextKey,
  type BreadcrumbContextValue,
} from "./breadcrumbContext";

/**
 * BreadcrumbItem props 타입입니다.
 */
type BreadcrumbItemProps = {
  /**
   * 링크 주소입니다.
   * href가 있으면 a 태그로 렌더링합니다.
   */
  href?: string;

  /**
   * 현재 페이지 여부입니다.
   */
  current?: boolean;

  /**
   * 비활성 여부입니다.
   */
  disabled?: boolean;

  /**
   * 구분자입니다.
   * 직접 전달하지 않으면 Breadcrumb에서 provide한 값을 사용합니다.
   */
  separator?: string;

  /**
   * 링크 target입니다.
   */
  target?: "_self" | "_blank" | "_parent" | "_top";

  /**
   * 링크 rel입니다.
   */
  rel?: string;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
  href: "",
  current: false,
  disabled: false,
  separator: undefined,
  target: undefined,
  rel: undefined,
  class: "",
});

/**
 * Breadcrumb에서 제공한 separator를 가져옵니다.
 */
const breadcrumbContext = inject<BreadcrumbContextValue | null>(
  BreadcrumbContextKey,
  null
);

/**
 * 실제 사용할 구분자입니다.
 */
const currentSeparator = computed(() => {
  return props.separator ?? breadcrumbContext?.separator ?? "/";
});

/**
 * 현재 페이지이거나 비활성 상태이거나 href가 없으면 span으로 렌더링합니다.
 */
const isText = computed(() => {
  return props.current || props.disabled || !props.href;
});

/**
 * li class 목록입니다.
 */
const itemClassName = computed(() => {
  return ["breadcrumb__item", props.class].filter(Boolean);
});

/**
 * 텍스트 class 목록입니다.
 */
const textClassName = computed(() => {
  return [
    "breadcrumb__text",
    props.current && "breadcrumb__text--current",
    props.disabled && "breadcrumb__text--disabled",
  ].filter(Boolean);
});

/**
 * target="_blank"인데 rel을 직접 전달하지 않은 경우 보안 속성을 자동으로 보완합니다.
 */
const linkRel = computed(() => {
  if (props.rel) return props.rel;

  if (props.target === "_blank") {
    return "noopener noreferrer";
  }

  return undefined;
});
</script>

<template>
  <li :class="itemClassName">
    <!-- 현재 페이지, 비활성, href가 없는 항목 -->
    <span
      v-if="isText"
      :class="textClassName"
      :aria-current="current ? 'page' : undefined"
    >
      <slot />
    </span>

    <!-- 이동 가능한 링크 항목 -->
    <a
      v-else
      class="breadcrumb__link"
      :href="href"
      :target="target"
      :rel="linkRel"
    >
      <slot />
    </a>

    <!-- 현재 페이지가 아닌 경우에만 구분자 표시 -->
    <span
      v-if="!current"
      class="breadcrumb__separator"
      aria-hidden="true"
    >
      {{ currentSeparator }}
    </span>
  </li>
</template>