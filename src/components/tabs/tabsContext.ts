import type { InjectionKey, Ref } from 'vue'

/**
 * Tabs에서 사용할 value 타입입니다.
 * 실무에서는 대부분 string을 사용합니다.
 */
export type TabValue = string

/**
 * Tabs 내부 컴포넌트들이 공유할 Context 타입입니다.
 */
export type TabsContextValue = {
  /**
   * 현재 선택된 탭 값입니다.
   */
  value: Ref<TabValue>

  /**
   * 탭 값을 변경하는 함수입니다.
   */
  setValue: (value: TabValue) => void

  /**
   * trigger와 panel의 id 연결을 위한 고유 id입니다.
   */
  baseId: string
}

/**
 * provide / inject에서 사용할 key입니다.
 */
export const tabsContextKey: InjectionKey<TabsContextValue> =
  Symbol('tabsContext')