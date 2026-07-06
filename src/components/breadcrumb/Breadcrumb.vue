<script setup lang="ts">
    import { computed, provide } from "vue";
    import BreadcrumbItem from "./BreadcrumbItem.vue";
    import {
      BreadcrumbContextKey,
      type BreadcrumbContextValue,
    } from "./breadcrumbContext";
    import "./Breadcrumb.css";
    
    /**
     * Breadcrumb 데이터 기반 렌더링에 사용할 item 타입입니다.
     */
    export type BreadcrumbItemData = {
      /**
       * 화면에 표시될 텍스트입니다.
       */
      label: string;
    
      /**
       * 이동할 링크입니다.
       */
      href?: string;
    
      /**
       * 현재 페이지 여부입니다.
       */
      current?: boolean;
    
      /**
       * 비활성 상태입니다.
       */
      disabled?: boolean;
    };
    
    /**
     * Breadcrumb props 타입입니다.
     */
    type BreadcrumbProps = {
      /**
       * 배열 데이터로 Breadcrumb를 렌더링할 때 사용합니다.
       */
      items?: BreadcrumbItemData[];
    
      /**
       * 구분자입니다.
       */
      separator?: string;
    
      /**
       * nav 영역의 접근성 라벨입니다.
       */
      ariaLabel?: string;
    
      /**
       * 외부에서 추가로 전달할 클래스입니다.
       */
      class?: string;
    };
    
    const props = withDefaults(defineProps<BreadcrumbProps>(), {
      items: undefined,
      separator: "/",
      ariaLabel: "Breadcrumb",
      class: "",
    });
    
    /**
     * 하위 BreadcrumbItem에서 separator를 사용할 수 있도록 제공합니다.
     */
    provide<BreadcrumbContextValue>(BreadcrumbContextKey, {
      separator: props.separator,
    });
    
    /**
     * Breadcrumb 최상위 class 목록입니다.
     */
    const breadcrumbClassName = computed(() => {
      return ["breadcrumb", props.class].filter(Boolean);
    });
    </script>
    
    <template>
      <nav
        :class="breadcrumbClassName"
        :aria-label="ariaLabel"
      >
        <ol class="breadcrumb__list">
          <!-- 배열 데이터 방식 -->
          <template v-if="items && items.length">
            <BreadcrumbItem
              v-for="(item, index) in items"
              :key="`${item.label}-${index}`"
              :href="item.href"
              :current="item.current ?? index === items.length - 1"
              :disabled="item.disabled"
              :separator="separator"
            >
              {{ item.label }}
            </BreadcrumbItem>
          </template>
    
          <!-- 직접 조합 방식 -->
          <slot v-else />
        </ol>
      </nav>
    </template>