<script setup lang="ts">
import './Table.css'

/**
 * TableRoot Props입니다.
 */
interface TableRootProps {
  /**
   * 가로 스크롤이 필요한 경우 true로 사용합니다.
   *
   * 실무에서는 모바일이나 좁은 영역에서 테이블이 깨지기 쉬워서
   * 기본값을 true로 두는 편이 안전합니다.
   */
  scrollable?: boolean

  /**
   * 추가 className입니다.
   */
  class?: string
}

const props = withDefaults(defineProps<TableRootProps>(), {
  scrollable: true,
  class: '',
})
</script>

<template>
  <!--
    가로 스크롤이 필요한 경우 table-scroll로 감쌉니다.
  -->
  <div
    v-if="scrollable"
    class="table-scroll"
  >
    <table
      :class="['table', props.class].filter(Boolean).join(' ')"
    >
      <slot />
    </table>
  </div>

  <!--
    스크롤 래퍼가 필요 없는 경우 table만 렌더링합니다.
  -->
  <table
    v-else
    :class="['table', props.class].filter(Boolean).join(' ')"
  >
    <slot />
  </table>
</template>