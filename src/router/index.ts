import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

/**
 * UI 컴포넌트 문서 페이지 라우트 목록입니다.
 *
 * component는 lazy loading 방식으로 작성했습니다.
 * 사용자가 해당 페이지에 접근할 때만 파일을 불러옵니다.
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/accordion',
  },
  {
    path: '/accordion',
    name: 'accordion',
    component: () => import('../views/AccordionView.vue'),
  },
  {
    path: '/alert',
    name: 'alert',
    component: () => import('../views/AlertView.vue'),
  },
  {
    path: '/badge',
    name: 'badge',
    component: () => import('../views/BadgeView.vue'),
  },
  {
    path: '/bottom-sheet',
    name: 'bottomSheet',
    component: () => import('../views/BottomSheetView.vue'),
  },
  {
    path: '/breadcrumb',
    name: 'breadcrumb',
    component: () => import('../views/BreadcrumbView.vue'),
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('../views/ButtonView.vue'),
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('../views/CardView.vue'),
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    component: () => import('../views/CheckboxView.vue'),
  },
  {
    path: '/collapse',
    name: 'collapse',
    component: () => import('../views/CollapseView.vue'),
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: () => import('../views/ConfirmView.vue'),
  },
  {
    path: '/drawer',
    name: 'drawer',
    component: () => import('../views/DrawerView.vue'),
  },
  {
    path: '/dropdown',
    name: 'dropdown',
    component: () => import('../views/DropdownView.vue'),
  },
  {
    path: '/file-uploader',
    name: 'fileUploader',
    component: () => import('../views/FileUploaderView.vue'),
  },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('../views/IconView.vue'),
  },
  {
    path: '/infinite-scroll',
    name: 'infiniteScroll',
    component: () => import('../views/InfiniteScrollView.vue'),
  },
  {
    path: '/input',
    name: 'input',
    component: () => import('../views/InputView.vue'),
  },
  {
    path: '/input-number',
    name: 'inputNumber',
    component: () => import('../views/InputNumberView.vue'),
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('../views/LoadingView.vue'),
  },
  {
    path: '/modal',
    name: 'modal',
    component: () => import('../views/ModalView.vue'),
  },
  {
    path: '/pagination',
    name: 'pagination',
    component: () => import('../views/PaginationView.vue'),
  },
  {
    path: '/popover',
    name: 'popover',
    component: () => import('../views/PopoverView.vue'),
  },
  {
    path: '/radio-button',
    name: 'radioButton',
    component: () => import('../views/RadioButtonView.vue'),
  },
  {
    path: '/range-slider',
    name: 'rangeSlider',
    component: () => import('../views/RangeSliderView.vue'),
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('../views/SelectView.vue'),
  },
  {
    path: '/skeleton',
    name: 'skeleton',
    component: () => import('../views/SkeletonView.vue'),
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../views/TableView.vue'),
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: () => import('../views/TabsView.vue'),
  },
  {
    path: '/tag',
    name: 'tag',
    component: () => import('../views/TagView.vue'),
  },
  {
    path: '/textarea',
    name: 'textarea',
    component: () => import('../views/TextareaView.vue'),
  },
  {
    path: '/toast',
    name: 'toast',
    component: () => import('../views/ToastView.vue'),
  },
  {
    path: '/tooltip',
    name: 'tooltip',
    component: () => import('../views/TooltipView.vue'),
  },
  {
    path: '/tree-view',
    name: 'treeView',
    component: () => import('../views/TreeViewView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router