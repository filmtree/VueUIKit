import type { InjectionKey, Ref } from "vue";

/**
 * Dropdown 메뉴 위치 타입입니다.
 */
export type DropdownPlacement =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

/**
 * Dropdown Context 타입입니다.
 */
export type DropdownContextValue = {
  /**
   * Dropdown 열림 상태입니다.
   */
  open: Ref<boolean>;

  /**
   * Dropdown 열림 상태를 직접 변경합니다.
   */
  setOpen: (open: boolean) => void;

  /**
   * Dropdown 열림 상태를 토글합니다.
   */
  toggleOpen: () => void;

  /**
   * 메뉴 영역 id입니다.
   */
  menuId: string;

  /**
   * 트리거 버튼 id입니다.
   */
  triggerId: string;

  /**
   * Trigger 버튼 DOM입니다.
   *
   * DropdownMenu에서 위치 계산할 때 사용합니다.
   */
  triggerRef: Ref<HTMLButtonElement | null>;

  /**
   * 메뉴 아이템 선택 후 자동으로 닫을지 여부입니다.
   */
  closeOnSelect: Ref<boolean>;
};

/**
 * Dropdown inject key입니다.
 */
export const DropdownContextKey: InjectionKey<DropdownContextValue> =
  Symbol("DropdownContext");