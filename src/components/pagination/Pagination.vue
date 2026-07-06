<script setup lang="ts">
import { computed } from "vue";
import "./Pagination.css";

/**
 * Pagination에서 표시할 아이템 타입입니다.
 * number는 실제 페이지 번호이고, "ellipsis"는 ... 표시입니다.
 */
type PaginationItem = number | "ellipsis";

/**
 * Pagination 크기 타입입니다.
 */
export type PaginationSize =
  | "sm"
  | "md"
  | "lg";

/**
 * Pagination props 타입입니다.
 */
type PaginationProps = {
  /**
   * 현재 페이지 번호입니다.
   * 1부터 시작합니다.
   */
  page: number;

  /**
   * 한 페이지에 보여줄 데이터 개수입니다.
   */
  pageSize: number;

  /**
   * 전체 데이터 개수입니다.
   */
  totalCount: number;

  /**
   * 현재 페이지 양옆에 몇 개의 페이지 번호를 보여줄지 결정합니다.
   */
  siblingCount?: number;

  /**
   * 처음/마지막 버튼을 보여줄지 여부입니다.
   */
  showFirstLast?: boolean;

  /**
   * 이전/다음 버튼을 보여줄지 여부입니다.
   */
  showPrevNext?: boolean;

  /**
   * 전체 데이터가 없을 때 Pagination을 숨길지 여부입니다.
   */
  hideOnEmpty?: boolean;

  /**
   * Pagination 크기입니다.
   */
  size?: PaginationSize;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<PaginationProps>(), {
  siblingCount: 1,
  showFirstLast: true,
  showPrevNext: true,
  hideOnEmpty: true,
  size: "md",
  class: "",
});

const emit = defineEmits<{
  /**
   * v-model:page 업데이트 이벤트입니다.
   */
  "update:page": [page: number];

  /**
   * 페이지 변경 이벤트입니다.
   */
  change: [page: number];
}>();

/**
 * 숫자를 특정 범위 안으로 제한합니다.
 */
const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * start부터 end까지의 숫자 배열을 만듭니다.
 */
const range = (start: number, end: number) => {
  if (end < start) return [];

  return Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );
};

/**
 * 페이지 번호 목록을 계산합니다.
 *
 * 예:
 * [1, "ellipsis", 4, 5, 6, "ellipsis", 20]
 */
const getPaginationItems = ({
  currentPage,
  totalPage,
  siblingCount,
}: {
  currentPage: number;
  totalPage: number;
  siblingCount: number;
}): PaginationItem[] => {
  /**
   * 화면에 보여줄 최대 숫자 버튼 수입니다.
   * 첫 페이지, 마지막 페이지, 현재 페이지 주변 sibling, ellipsis를 고려합니다.
   */
  const totalPageNumbers = siblingCount * 2 + 5;

  /**
   * 전체 페이지 수가 적으면 ellipsis 없이 전부 보여줍니다.
   */
  if (totalPage <= totalPageNumbers) {
    return range(1, totalPage);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPage - 1;

  const firstPage = 1;
  const lastPage = totalPage;

  /**
   * 왼쪽 ellipsis만 없는 경우
   * 예: [1, 2, 3, 4, 5, ..., 20]
   */
  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + siblingCount * 2;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, "ellipsis", lastPage];
  }

  /**
   * 오른쪽 ellipsis만 없는 경우
   * 예: [1, ..., 16, 17, 18, 19, 20]
   */
  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + siblingCount * 2;
    const rightRange = range(totalPage - rightItemCount + 1, totalPage);

    return [firstPage, "ellipsis", ...rightRange];
  }

  /**
   * 양쪽 ellipsis가 모두 있는 경우
   * 예: [1, ..., 9, 10, 11, ..., 20]
   */
  const middleRange = range(leftSiblingIndex, rightSiblingIndex);

  return [firstPage, "ellipsis", ...middleRange, "ellipsis", lastPage];
};

/**
 * 전체 페이지 수입니다.
 */
const totalPage = computed(() => {
  if (props.pageSize <= 0) return 0;

  return Math.ceil(props.totalCount / props.pageSize);
});

/**
 * 실제 렌더링 여부입니다.
 */
const shouldRender = computed(() => {
  if (totalPage.value <= 0 && props.hideOnEmpty) {
    return false;
  }

  return true;
});

/**
 * 현재 페이지가 범위를 벗어나지 않도록 보정합니다.
 */
const currentPage = computed(() => {
  return clamp(props.page, 1, Math.max(totalPage.value, 1));
});

/**
 * 페이지 아이템 목록입니다.
 */
const paginationItems = computed(() => {
  return getPaginationItems({
    currentPage: currentPage.value,
    totalPage: Math.max(totalPage.value, 1),
    siblingCount: props.siblingCount,
  });
});

/**
 * 첫 페이지 여부입니다.
 */
const isFirstPage = computed(() => {
  return currentPage.value <= 1;
});

/**
 * 마지막 페이지 여부입니다.
 */
const isLastPage = computed(() => {
  return currentPage.value >= totalPage.value;
});

/**
 * Pagination class 목록입니다.
 */
const paginationClassName = computed(() => {
  return [
    "pagination",
    props.size !== "md" && `pagination--${props.size}`,
    props.class,
  ].filter(Boolean);
});

/**
 * 페이지 변경 함수입니다.
 * 같은 페이지이거나 범위를 벗어나면 실행하지 않습니다.
 */
const handlePageChange = (nextPage: number) => {
  const safePage = clamp(nextPage, 1, Math.max(totalPage.value, 1));

  if (safePage === currentPage.value) return;

  emit("update:page", safePage);
  emit("change", safePage);
};
</script>

<template>
  <nav
    v-if="shouldRender"
    :class="paginationClassName"
    aria-label="페이지네이션"
  >
    <ul class="pagination__list">
      <!-- 첫 페이지 버튼 -->
      <li
        v-if="showFirstLast"
        class="pagination__item"
      >
        <button
          type="button"
          class="pagination__button"
          :disabled="isFirstPage"
          aria-label="첫 페이지로 이동"
          @click="handlePageChange(1)"
        >
          «
        </button>
      </li>

      <!-- 이전 페이지 버튼 -->
      <li
        v-if="showPrevNext"
        class="pagination__item"
      >
        <button
          type="button"
          class="pagination__button"
          :disabled="isFirstPage"
          aria-label="이전 페이지로 이동"
          @click="handlePageChange(currentPage - 1)"
        >
          ‹
        </button>
      </li>

      <!-- 페이지 번호 -->
      <template
        v-for="(item, index) in paginationItems"
        :key="item === 'ellipsis' ? `ellipsis-${index}` : item"
      >
        <li
          v-if="item === 'ellipsis'"
          class="pagination__item"
          aria-hidden="true"
        >
          <span class="pagination__ellipsis">
            ...
          </span>
        </li>

        <li
          v-else
          class="pagination__item"
        >
          <button
            type="button"
            :class="[
              'pagination__button',
              item === currentPage && 'pagination__button--active',
            ]"
            :aria-label="`${item} 페이지로 이동`"
            :aria-current="item === currentPage ? 'page' : undefined"
            @click="handlePageChange(item)"
          >
            {{ item }}
          </button>
        </li>
      </template>

      <!-- 다음 페이지 버튼 -->
      <li
        v-if="showPrevNext"
        class="pagination__item"
      >
        <button
          type="button"
          class="pagination__button"
          :disabled="isLastPage"
          aria-label="다음 페이지로 이동"
          @click="handlePageChange(currentPage + 1)"
        >
          ›
        </button>
      </li>

      <!-- 마지막 페이지 버튼 -->
      <li
        v-if="showFirstLast"
        class="pagination__item"
      >
        <button
          type="button"
          class="pagination__button"
          :disabled="isLastPage"
          aria-label="마지막 페이지로 이동"
          @click="handlePageChange(totalPage)"
        >
          »
        </button>
      </li>
    </ul>
  </nav>
</template>