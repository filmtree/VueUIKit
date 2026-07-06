<script setup lang="ts">
import { computed } from 'vue'
import './Tag.css'

/**
 * Tag 색상 타입입니다.
 *
 * 실무에서는 디자인 시스템 컬러 토큰에 맞춰
 * gray, blue, green, red, yellow, purple 정도를 자주 사용합니다.
 */
type TagColor =
  | 'gray'
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple'

/**
 * Tag 크기 타입입니다.
 */
type TagSize =
  | 'sm'
  | 'md'
  | 'lg'

/**
 * Tag 형태 타입입니다.
 *
 * rounded : 기본 둥근 사각형
 * pill    : 알약 형태
 * square  : 각진 형태
 */
type TagShape =
  | 'rounded'
  | 'pill'
  | 'square'

/**
 * Tag Props입니다.
 */
interface TagProps {
  /**
   * 태그 색상입니다.
   */
  color?: TagColor

  /**
   * 태그 크기입니다.
   */
  size?: TagSize

  /**
   * 태그 모양입니다.
   */
  shape?: TagShape

  /**
   * 선택된 태그인지 여부입니다.
   * 필터 태그, 카테고리 태그에서 자주 사용합니다.
   */
  selected?: boolean

  /**
   * 삭제 가능한 태그인지 여부입니다.
   */
  removable?: boolean

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean

  /**
   * 클릭 가능한 태그인지 여부입니다.
   *
   * Vue에서는 click 이벤트 리스너 존재 여부를
   * 컴포넌트 내부에서 안정적으로 판단하기 애매한 경우가 있어
   * 명시적으로 clickable prop을 두는 방식이 실무에서 관리하기 좋습니다.
   */
  clickable?: boolean

  /**
   * tabindex 값입니다.
   */
  tabindex?: number

  /**
   * 추가 className입니다.
   */
  class?: string

  /**
   * 삭제 버튼 접근성 라벨입니다.
   */
  removeLabel?: string
}

const props = withDefaults(defineProps<TagProps>(), {
  color: 'gray',
  size: 'md',
  shape: 'rounded',
  selected: false,
  removable: false,
  disabled: false,
  clickable: false,
  tabindex: undefined,
  class: '',
  removeLabel: '태그 삭제',
})

/**
 * 이벤트 정의입니다.
 */
const emit = defineEmits<{
  /**
   * 태그 클릭 이벤트입니다.
   */
  click: [event: MouseEvent]

  /**
   * 삭제 버튼 클릭 이벤트입니다.
   */
  remove: []
}>()

/**
 * 조건에 따라 className을 조합합니다.
 */
const tagClassName = computed(() => {
  return [
    'tag',
    `tag--${props.color}`,
    `tag--${props.size}`,
    `tag--${props.shape}`,
    props.selected && 'tag--selected',
    props.removable && 'tag--removable',
    props.clickable && 'tag--clickable',
    props.disabled && 'tag--disabled',
    props.class,
  ]
    .filter(Boolean)
    .join(' ')
})

/**
 * 실제 tabindex 값입니다.
 *
 * 클릭 가능한 태그라면 키보드 포커스를 받을 수 있게 0을 기본으로 둡니다.
 */
const computedTabIndex = computed(() => {
  if (props.tabindex !== undefined) {
    return props.tabindex
  }

  if (props.clickable && !props.disabled) {
    return 0
  }

  return undefined
})

/**
 * 태그 클릭 이벤트입니다.
 * disabled 상태에서는 클릭 이벤트가 실행되지 않도록 막습니다.
 */
const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  if (!props.clickable) return

  emit('click', event)
}

/**
 * 삭제 버튼 클릭 이벤트입니다.
 *
 * event.stopPropagation()을 사용하지 않으면
 * 삭제 버튼을 눌렀을 때 태그 자체의 click 이벤트도 같이 실행될 수 있습니다.
 */
const handleRemove = (event: MouseEvent) => {
  event.stopPropagation()

  if (props.disabled) return

  emit('remove')
}

/**
 * 키보드 접근성 처리입니다.
 *
 * 클릭 가능한 span은 기본적으로 Enter / Space 키 동작이 없습니다.
 * 그래서 role="button"과 함께 키보드 이벤트를 직접 처리합니다.
 */
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  if (!props.clickable) return

  if (event.key !== 'Enter' && event.key !== ' ') return

  event.preventDefault()

  emit('click', event as unknown as MouseEvent)
}
</script>

<template>
  <span
    :class="tagClassName"
    :role="clickable ? 'button' : undefined"
    :tabindex="computedTabIndex"
    :aria-pressed="clickable ? selected : undefined"
    :aria-disabled="disabled || undefined"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <span
      v-if="$slots.prefix"
      class="tag__prefix"
      aria-hidden="true"
    >
      <slot name="prefix" />
    </span>

    <span
      v-if="$slots.default"
      class="tag__text"
    >
      <slot />
    </span>

    <span
      v-if="$slots.suffix"
      class="tag__suffix"
      aria-hidden="true"
    >
      <slot name="suffix" />
    </span>

    <button
      v-if="removable"
      type="button"
      class="tag__remove"
      :aria-label="removeLabel"
      :disabled="disabled"
      @click="handleRemove"
    >
      ×
    </button>
  </span>
</template>