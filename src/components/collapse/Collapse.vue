<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";
import "./Collapse.css";

/**
 * Collapse props 타입입니다.
 */
type CollapseProps = {
  /**
   * Collapse가 열려 있는지 여부입니다.
   */
  open: boolean;

  /**
   * 닫힌 상태에서 DOM을 제거할지 여부입니다.
   * 애니메이션을 자연스럽게 유지하려면 기본값 false를 권장합니다.
   */
  unmountOnExit?: boolean;

  /**
   * 접근성 연결을 위한 id입니다.
   * 외부 버튼의 aria-controls와 연결할 수 있습니다.
   */
  id?: string;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<CollapseProps>(), {
  unmountOnExit: false,
  id: undefined,
  class: "",
});

/**
 * id를 직접 넘기지 않은 경우 내부에서 고유 id를 생성합니다.
 */
const generatedId = useId();

/**
 * 실제 Collapse id입니다.
 */
const collapseId = computed(() => {
  return props.id ?? generatedId;
});

/**
 * 실제 DOM 렌더링 여부입니다.
 * unmountOnExit가 true일 때 닫힘 애니메이션 이후 DOM에서 제거하기 위해 사용합니다.
 */
const mounted = ref(props.open || !props.unmountOnExit);

/**
 * open 값이 변경될 때 mounted 상태를 관리합니다.
 */
watch(
  () => props.open,
  (open) => {
    if (open) {
      mounted.value = true;
      return;
    }

    if (!props.unmountOnExit) {
      mounted.value = true;
    }
  },
  {
    immediate: true,
  }
);

/**
 * 닫힘 애니메이션이 끝난 후 DOM에서 제거합니다.
 */
const handleTransitionEnd = () => {
  if (!props.open && props.unmountOnExit) {
    mounted.value = false;
  }
};

/**
 * Collapse class 목록입니다.
 */
const collapseClassName = computed(() => {
  return [
    "collapse",
    props.open && "collapse--open",
    props.class,
  ].filter(Boolean);
});
</script>

<template>
  <div
    v-if="mounted"
    :id="collapseId"
    :class="collapseClassName"
    @transitionend="handleTransitionEnd"
  >
    <div class="collapse__inner">
      <slot />
    </div>
  </div>
</template>