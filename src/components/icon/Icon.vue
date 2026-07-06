<script setup lang="ts">
import { computed, useAttrs } from "vue";

import "./Icon.css";

/**
 * SVG raw module map입니다.
 */
type SvgModuleMap = Record<string, string>;

/**
 * 아이콘 크기 값입니다.
 *
 * number: px 단위로 변환
 * string: CSS 값 그대로 사용
 */
type IconSize = number | string;

/**
 * Icon props입니다.
 */
type IconProps = {
  /**
   * 아이콘 파일명입니다.
   *
   * search.svg -> name="search"
   * arrow-left.svg -> name="arrow-left"
   */
  name: string;

  /**
   * 아이콘 크기입니다.
   */
  size?: IconSize;

  /**
   * 아이콘 색상입니다.
   */
  color?: string;

  /**
   * 접근성 라벨입니다.
   *
   * decorative=false일 때 aria-label로 사용합니다.
   */
  label?: string;

  /**
   * 장식용 아이콘 여부입니다.
   *
   * true: 스크린리더에서 숨김
   * false: role="img"와 aria-label 사용
   */
  decorative?: boolean;
};

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  color: "currentColor",
  label: "",
  decorative: true,
});

const attrs = useAttrs();

/**
 * /src/assets/icons 하위의 모든 svg 파일을 raw string으로 가져옵니다.
 */
const iconModules = import.meta.glob("/src/assets/icons/**/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
}) as SvgModuleMap;

/**
 * 파일명만 추출합니다.
 */
const getFileName = (path: string) => {
  return path.split("/").pop() ?? "";
};

/**
 * 확장자를 제거합니다.
 */
const removeExtension = (fileName: string) => {
  return fileName.replace(/\.svg$/i, "");
};

/**
 * 아이콘 이름을 비교 가능한 형태로 정규화합니다.
 *
 * arrow_left -> arrow-left
 * arrow left -> arrow-left
 */
const normalizeName = (name: string) => {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");
};

/**
 * SVG 목록을 name 기준 map으로 변환합니다.
 */
const iconMap = Object.entries(iconModules).reduce<SvgModuleMap>(
  (map, [path, rawSvg]) => {
    const fileName = getFileName(path);
    const iconName = normalizeName(removeExtension(fileName));

    map[iconName] = rawSvg;

    return map;
  },
  {}
);

/**
 * 실제 사용할 아이콘 이름입니다.
 */
const normalizedIconName = computed(() => {
  return normalizeName(props.name);
});

/**
 * 실제 SVG raw string입니다.
 */
const rawSvg = computed(() => {
  return iconMap[normalizedIconName.value] ?? "";
});

/**
 * 아이콘 존재 여부입니다.
 */
const hasIcon = computed(() => {
  return Boolean(rawSvg.value);
});

/**
 * class 병합입니다.
 */
const iconClassName = computed(() => {
  return ["ui-icon", attrs.class].filter(Boolean);
});

/**
 * size 값 변환입니다.
 */
const resolvedSize = computed(() => {
  if (typeof props.size === "number") {
    return `${props.size}px`;
  }

  return props.size;
});

/**
 * style 병합입니다.
 */
const iconStyle = computed(() => {
  return {
    width: resolvedSize.value,
    height: resolvedSize.value,
    color: props.color,
    ...(attrs.style as Record<string, string> | undefined),
  };
});

/**
 * 접근성 라벨입니다.
 */
const ariaLabel = computed(() => {
  if (props.decorative) return undefined;

  return props.label || props.name;
});
</script>

<template>
  <span
    v-if="hasIcon"
    :class="iconClassName"
    :style="iconStyle"
    :role="decorative ? 'presentation' : 'img'"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="ariaLabel"
    v-html="rawSvg"
  />
</template>