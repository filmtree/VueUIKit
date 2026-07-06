/**
 * 사이드 메뉴에서 사용할 타입입니다.
 */
export type RouterMenuItem = {
    label: string
    path: string
  }
  
  /**
   * 화면 왼쪽 메뉴에 표시할 라우터 메뉴 목록입니다.
   *
   * 'input type=number를 안쓰는 이유' 항목은 제외했습니다.
   */
  export const routerMenus: RouterMenuItem[] = [
    {
      label: 'Accordion',
      path: '/accordion',
    },
    {
      label: 'Alert',
      path: '/alert',
    },
    {
      label: 'Badge',
      path: '/badge',
    },
    {
      label: 'BottomSheet',
      path: '/bottom-sheet',
    },
    {
      label: 'Breadcrumb',
      path: '/breadcrumb',
    },
    {
      label: 'Button',
      path: '/button',
    },
    {
      label: 'Card',
      path: '/card',
    },
    {
      label: 'Checkbox (Switch)',
      path: '/checkbox',
    },
    {
      label: 'Collapse',
      path: '/collapse',
    },
    {
      label: 'Confirm',
      path: '/confirm',
    },
    {
      label: 'Drawer',
      path: '/drawer',
    },
    {
      label: 'Dropdown',
      path: '/dropdown',
    },
    {
      label: 'FileUploader',
      path: '/file-uploader',
    },
    {
      label: 'Icon',
      path: '/icon',
    },
    {
      label: 'InfiniteScroll',
      path: '/infinite-scroll',
    },
    {
      label: 'Input',
      path: '/input',
    },
    {
      label: 'Input Number',
      path: '/input-number',
    },
    {
      label: 'Loading',
      path: '/loading',
    },
    {
      label: 'Modal',
      path: '/modal',
    },
    {
      label: 'Pagination',
      path: '/pagination',
    },
    {
      label: 'Popover',
      path: '/popover',
    },
    {
      label: 'Radio Button',
      path: '/radio-button',
    },
    {
      label: 'RangeSlider',
      path: '/range-slider',
    },
    {
      label: 'Select',
      path: '/select',
    },
    {
      label: 'Skeleton',
      path: '/skeleton',
    },
    {
      label: 'Table',
      path: '/table',
    },
    {
      label: 'Tabs',
      path: '/tabs',
    },
    {
      label: 'Tag',
      path: '/tag',
    },
    {
      label: 'Textarea',
      path: '/textarea',
    },
    {
      label: 'Toast',
      path: '/toast',
    },
    {
      label: 'Tooltip',
      path: '/tooltip',
    },
    {
      label: 'TreeView',
      path: '/tree-view',
    },
  ]