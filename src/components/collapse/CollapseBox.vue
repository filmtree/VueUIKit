<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";
import Collapse from "./Collapse.vue";
import "./Collapse.css";

/**
 * CollapseBox props 타입입니다.
 */
type CollapseBoxProps = {
  /**
   * v-model:open으로 외부에서 열림 상태를 제어할 때 사용합니다.
   */
  open?: boolean;

  /**
   * 기본으로 열려 있을지 여부입니다.
   * 비제어 방식으로 사용할 때 사용합니다.
   */
  defaultOpen?: boolean;

  /**
   * 버튼에 표시할 제목입니다.
   * 단순 문자열 제목에 사용합니다.
   * 복잡한 제목 UI는 title slot을 사용합니다.
   */
  title?: string;

  /**
   * 닫힌 상태에서 DOM을 제거할지 여부입니다.
   */
  unmountOnExit?: boolean;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<CollapseBoxProps>(), {
  open: undefined,
  defaultOpen: false,
  title: "",
  unmountOnExit: false,
  class: "",
});

const emit = defineEmits<{
  /**
   * v-model:open 업데이트 이벤트입니다.
   */
  "update:open": [value: boolean];

  /**
   * 열림 상태가 변경될 때 실행됩니다.
   */
  change: [value: boolean];
}>();

/**
 * 버튼과 Collapse 영역을 연결하기 위한 id입니다.
 */
const collapseId = useId();

/**
 * 내부 열림 상태입니다.
 * open props가 없을 때 사용합니다.
 */
const innerOpen = ref(props.defaultOpen);

/**
 * 제어 컴포넌트 여부입니다.
 */
const isControlled = computed(() => {
  return props.open !== undefined;
});

/**
 * 실제 열림 상태입니다.
 */
const isOpen = computed(() => {
  return isControlled.value ? props.open : innerOpen.value;
});

/**
 * 외부 open 값이 바뀌면 내부 상태와 동기화합니다.
 */
watch(
  () => props.open,
  (open) => {
    if (open === undefined) return;

    innerOpen.value = open;
  }
);

/**
 * CollapseBox class 목록입니다.
 */
const collapseBoxClassName = computed(() => {
  return [
    "collapse-box",
    isOpen.value && "collapse-box--open",
    props.class,
  ].filter(Boolean);
});

/**
 * 열림 상태를 변경합니다.
 */
const updateOpen = (nextOpen: boolean) => {
  if (!isControlled.value) {
    innerOpen.value = nextOpen;
  }

  emit("update:open", nextOpen);
  emit("change", nextOpen);
};

/**
 * 버튼 클릭 시 열림 상태를 토글합니다.
 */
const toggle = () => {
  updateOpen(!isOpen.value);
};
</script>

<template>
  <div :class="collapseBoxClassName">
    <button
      type="button"
      class="collapse-box__button"
      :aria-expanded="isOpen"
      :aria-controls="collapseId"
      @click="toggle"
    >
      <span>
        <slot name="title">
          {{ title }}
        </slot>
      </span>

      <span
        :class="[
          'collapse-box__icon',
          isOpen && 'collapse-box__icon--open',
        ]"
        aria-hidden="true"
      >
        <slot name="icon">
          ⌄
        </slot>
      </span>
    </button>

    <Collapse
      :id="collapseId"
      :open="isOpen"
      :unmount-on-exit="unmountOnExit"
    >
      <div class="collapse-box__content">
        <slot />
      </div>
    </Collapse>
  </div>
</template>