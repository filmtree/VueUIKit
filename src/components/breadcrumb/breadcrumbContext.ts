// Breadcrumb와 BreadcrumbItem이 함께 사용할 provide/inject key입니다.
// <script setup> 안에서는 export const를 직접 사용할 수 없기 때문에
// 별도 ts 파일로 분리합니다.

export type BreadcrumbContextValue = {
    /**
     * Breadcrumb 항목 사이에 표시할 구분자입니다.
     */
    separator: string;
  };
  
  export const BreadcrumbContextKey = Symbol("BreadcrumbContext");