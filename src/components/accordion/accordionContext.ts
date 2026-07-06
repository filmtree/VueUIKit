// components/accordion/accordionContext.ts

import type {
    ComputedRef,
    InjectionKey,
  } from 'vue'
  
  /**
   * Accordion 아이템을 구분하기 위한 값 타입입니다.
   */
  export type AccordionValue = string
  
  /**
   * Accordion 열림 방식을 정의합니다.
   *
   * single   : 하나의 아이템만 열림
   * multiple : 여러 아이템을 동시에 열 수 있음
   */
  export type AccordionType = 'single' | 'multiple'
  
  /**
   * Accordion 최상위에서 하위 컴포넌트로 공유할 값입니다.
   */
  export type AccordionContextValue = {
    /**
     * 하나만 열지, 여러 개를 열지에 대한 설정입니다.
     */
    type: ComputedRef<AccordionType>
  
    /**
     * 현재 열려 있는 item value 목록입니다.
     */
    openValues: ComputedRef<AccordionValue[]>
  
    /**
     * 특정 item을 열거나 닫는 함수입니다.
     */
    toggleValue: (value: AccordionValue) => void
  
    /**
     * aria 연결용 기본 id입니다.
     */
    baseId: string
  }
  
  /**
   * AccordionItem 내부에서 Trigger와 Content가 공유할 값입니다.
   */
  export type AccordionItemContextValue = {
    /**
     * 현재 item의 value입니다.
     */
    value: AccordionValue
  
    /**
     * 현재 item이 열려 있는지 여부입니다.
     */
    isOpen: ComputedRef<boolean>
  
    /**
     * 현재 item이 비활성 상태인지 여부입니다.
     */
    disabled: ComputedRef<boolean>
  
    /**
     * Trigger id입니다.
     */
    triggerId: string
  
    /**
     * Content id입니다.
     */
    contentId: string
  }
  
  /**
   * Accordion Context 주입 키입니다.
   */
  export const AccordionContextKey: InjectionKey<AccordionContextValue> =
    Symbol('AccordionContext')
  
  /**
   * AccordionItem Context 주입 키입니다.
   */
  export const AccordionItemContextKey: InjectionKey<AccordionItemContextValue> =
    Symbol('AccordionItemContext')