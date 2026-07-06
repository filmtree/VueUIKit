<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  ref,
  useId,
} from "vue";

import "./FileUploader.css";

/**
 * FileUploader에서 관리할 파일 아이템 타입입니다.
 *
 * 실제 File 객체와 함께 미리보기 URL, 에러 메시지를 같이 관리합니다.
 */
export type FileUploaderItem = {
  /**
   * 화면 렌더링용 고유 id입니다.
   */
  id: string;

  /**
   * 실제 업로드에 사용할 File 객체입니다.
   */
  file: File;

  /**
   * 이미지 미리보기 URL입니다.
   * image 파일일 때만 생성합니다.
   */
  previewUrl?: string;

  /**
   * 파일별 에러 메시지입니다.
   */
  error?: string;
};

/**
 * FileUploader props 타입입니다.
 */
type FileUploaderProps = {
  /**
   * 라벨 텍스트입니다.
   */
  label?: string;

  /**
   * 안내 문구입니다.
   */
  description?: string;

  /**
   * 선택된 파일 목록입니다.
   * v-model로 외부에서 제어합니다.
   */
  modelValue: FileUploaderItem[];

  /**
   * 여러 파일을 선택할 수 있는지 여부입니다.
   */
  multiple?: boolean;

  /**
   * 허용할 파일 타입입니다.
   *
   * 예:
   * accept="image/*"
   * accept=".pdf,.doc,.docx"
   * accept="image/*,.pdf"
   */
  accept?: string;

  /**
   * 파일 1개당 최대 용량입니다.
   * byte 단위입니다.
   */
  maxSize?: number;

  /**
   * 최대 파일 개수입니다.
   */
  maxFiles?: number;

  /**
   * 이미지 미리보기 사용 여부입니다.
   */
  preview?: boolean;

  /**
   * 비활성화 여부입니다.
   */
  disabled?: boolean;

  /**
   * 필수 입력 여부입니다.
   */
  required?: boolean;

  /**
   * 외부 폼 검증 에러 메시지입니다.
   */
  error?: string;

  /**
   * 업로드 영역 문구입니다.
   */
  placeholder?: string;

  /**
   * 파일 선택 버튼 문구입니다.
   */
  buttonText?: string;

  /**
   * 외부에서 추가로 전달할 클래스입니다.
   */
  class?: string;
};

const props = withDefaults(defineProps<FileUploaderProps>(), {
  label: "",
  description: "",
  multiple: false,
  accept: "",
  maxSize: undefined,
  maxFiles: undefined,
  preview: true,
  disabled: false,
  required: false,
  error: "",
  placeholder: "파일을 드래그하거나 클릭해서 업로드하세요.",
  buttonText: "파일 선택",
  class: "",
});

const emit = defineEmits<{
  /**
   * v-model 업데이트 이벤트입니다.
   */
  "update:modelValue": [files: FileUploaderItem[]];

  /**
   * 파일 목록 변경 이벤트입니다.
   */
  change: [files: FileUploaderItem[]];
}>();

/**
 * input과 label 연결용 id입니다.
 */
const inputId = useId();

/**
 * 실제 file input DOM입니다.
 */
const inputRef = ref<HTMLInputElement | null>(null);

/**
 * 드래그 중인지 여부입니다.
 */
const isDragging = ref(false);

/**
 * 내부 에러 메시지입니다.
 * 용량 초과, 타입 불일치, 개수 초과 같은 검증 오류를 표시합니다.
 */
const internalError = ref("");

/**
 * 실제 최대 파일 개수입니다.
 * multiple이 아니면 기본 1개, multiple이면 기본 10개입니다.
 */
const resolvedMaxFiles = computed(() => {
  if (props.maxFiles !== undefined) return props.maxFiles;

  return props.multiple ? 10 : 1;
});

/**
 * 파일 크기를 사람이 읽기 쉬운 단위로 변환합니다.
 */
const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size}B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)}KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)}MB`;
};

/**
 * 파일 확장자를 가져옵니다.
 */
const getFileExtension = (fileName: string) => {
  const parts = fileName.split(".");

  if (parts.length <= 1) return "";

  return `.${parts.pop()?.toLowerCase()}`;
};

/**
 * accept 조건과 파일이 일치하는지 확인합니다.
 *
 * accept 예:
 * - image/*
 * - .pdf
 * - image/png
 * - image/*,.pdf
 */
const isAcceptedFile = (file: File, accept?: string) => {
  /**
   * accept가 없으면 모든 파일을 허용합니다.
   */
  if (!accept) return true;

  const acceptList = accept
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  const fileType = file.type.toLowerCase();
  const fileExtension = getFileExtension(file.name);

  return acceptList.some((acceptItem) => {
    /**
     * 확장자 기준 검사입니다.
     * 예: .pdf, .docx
     */
    if (acceptItem.startsWith(".")) {
      return fileExtension === acceptItem;
    }

    /**
     * 와일드카드 MIME 타입 검사입니다.
     * 예: image/*
     */
    if (acceptItem.endsWith("/*")) {
      const baseType = acceptItem.replace("/*", "");

      return fileType.startsWith(`${baseType}/`);
    }

    /**
     * 정확한 MIME 타입 검사입니다.
     * 예: image/png, application/pdf
     */
    return fileType === acceptItem;
  });
};

/**
 * FileUploader class 목록입니다.
 */
const fileUploaderClassName = computed(() => {
  return [
    "file-uploader",
    isDragging.value && "file-uploader--dragging",
    props.disabled && "file-uploader--disabled",
    hasError.value && "file-uploader--error",
    props.class,
  ].filter(Boolean);
});

/**
 * 에러 상태 여부입니다.
 */
const hasError = computed(() => {
  return Boolean(props.error || internalError.value);
});

/**
 * dropzone 하단 안내 문구입니다.
 */
const metaText = computed(() => {
  const messages: string[] = [];

  if (props.accept) {
    messages.push(`허용 형식: ${props.accept}`);
  }

  if (props.maxSize) {
    messages.push(`최대 용량: ${formatFileSize(props.maxSize)}`);
  }

  return messages.join(" · ");
});

/**
 * 파일 선택 창을 엽니다.
 */
const openFileDialog = () => {
  if (props.disabled) return;

  inputRef.value?.click();
};

/**
 * crypto.randomUUID가 없는 환경까지 고려한 id 생성 함수입니다.
 */
const createId = (file: File) => {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  return `${file.name}-${file.size}-${file.lastModified}-${random}`;
};

/**
 * 다음 파일 목록을 부모로 전달합니다.
 */
const updateFiles = (files: FileUploaderItem[]) => {
  emit("update:modelValue", files);
  emit("change", files);
};

/**
 * 파일 목록을 검증하고 FileUploaderItem 형태로 변환합니다.
 */
const createFileItems = (fileList: FileList | File[]) => {
  const incomingFiles = Array.from(fileList);

  /**
   * 비활성화 상태에서는 아무 처리도 하지 않습니다.
   */
  if (props.disabled) return;

  internalError.value = "";

  /**
   * 현재 파일 목록과 새 파일 목록을 합칩니다.
   * multiple이 false이면 새 파일 하나만 사용합니다.
   */
  const baseFiles = props.multiple ? props.modelValue : [];
  const availableCount = resolvedMaxFiles.value - baseFiles.length;

  if (availableCount <= 0) {
    internalError.value = `최대 ${resolvedMaxFiles.value}개까지 업로드할 수 있습니다.`;
    return;
  }

  /**
   * 최대 개수를 넘는 파일은 잘라냅니다.
   */
  const limitedFiles = incomingFiles.slice(0, availableCount);

  /**
   * 사용자가 한 번에 너무 많은 파일을 넣은 경우 안내합니다.
   */
  if (incomingFiles.length > availableCount) {
    internalError.value = `최대 ${resolvedMaxFiles.value}개까지 업로드할 수 있습니다.`;
  }

  const nextItems = limitedFiles.map<FileUploaderItem>((file) => {
    /**
     * 파일별 에러 메시지를 생성합니다.
     */
    let fileError = "";

    if (!isAcceptedFile(file, props.accept)) {
      fileError = "허용되지 않는 파일 형식입니다.";
    }

    if (props.maxSize && file.size > props.maxSize) {
      fileError = `파일 용량은 ${formatFileSize(props.maxSize)} 이하만 가능합니다.`;
    }

    /**
     * 이미지 미리보기를 사용할 수 있는 경우 URL을 생성합니다.
     */
    const isImage = file.type.startsWith("image/");
    const previewUrl =
      props.preview && isImage ? URL.createObjectURL(file) : undefined;

    return {
      id: createId(file),
      file,
      previewUrl,
      error: fileError || undefined,
    };
  });

  /**
   * 에러가 있는 파일은 목록에 보여줄 수도 있고, 제외할 수도 있습니다.
   * 실무에서는 보통 사용자에게 어떤 파일이 실패했는지 보여주는 편이 좋습니다.
   */
  const nextValue = props.multiple
    ? [...props.modelValue, ...nextItems]
    : nextItems.slice(0, 1);

  updateFiles(nextValue);

  /**
   * 같은 파일을 다시 선택할 수 있도록 input value를 초기화합니다.
   */
  if (inputRef.value) {
    inputRef.value.value = "";
  }
};

/**
 * input 파일 변경 이벤트입니다.
 */
const handleInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files) return;

  createFileItems(files);
};

/**
 * 드래그가 업로드 영역 안으로 들어왔을 때 실행됩니다.
 */
const handleDragEnter = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();

  if (props.disabled) return;

  isDragging.value = true;
};

/**
 * 드래그가 업로드 영역 위에 있을 때 실행됩니다.
 */
const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();

  if (props.disabled) return;

  isDragging.value = true;
};

/**
 * 드래그가 업로드 영역 밖으로 나갔을 때 실행됩니다.
 */
const handleDragLeave = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();

  isDragging.value = false;
};

/**
 * 파일을 드롭했을 때 실행됩니다.
 */
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();

  isDragging.value = false;

  if (props.disabled) return;

  const files = event.dataTransfer?.files;

  if (!files) return;

  createFileItems(files);
};

/**
 * 키보드로 파일 선택 창을 열 수 있게 처리합니다.
 */
const handleDropzoneKeyDown = (event: KeyboardEvent) => {
  if (event.key !== "Enter" && event.key !== " ") return;

  event.preventDefault();
  openFileDialog();
};

/**
 * 선택된 파일을 삭제합니다.
 */
const handleRemove = (targetId: string) => {
  if (props.disabled) return;

  const targetItem = props.modelValue.find((item) => item.id === targetId);

  /**
   * 생성한 미리보기 URL은 메모리 누수를 막기 위해 해제합니다.
   */
  if (targetItem?.previewUrl) {
    URL.revokeObjectURL(targetItem.previewUrl);
  }

  updateFiles(props.modelValue.filter((item) => item.id !== targetId));
};

/**
 * 모든 파일을 삭제합니다.
 */
const handleClear = () => {
  if (props.disabled) return;

  /**
   * 생성한 모든 미리보기 URL을 해제합니다.
   */
  props.modelValue.forEach((item) => {
    if (item.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }
  });

  updateFiles([]);
  internalError.value = "";
};

/**
 * 컴포넌트가 제거될 때 생성한 previewUrl을 정리합니다.
 */
onBeforeUnmount(() => {
  props.modelValue.forEach((item) => {
    if (item.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }
  });
});
</script>

<template>
  <div :class="fileUploaderClassName">
    <div
      v-if="label || description"
      class="file-uploader__header"
    >
      <label
        v-if="label"
        class="file-uploader__label"
        :for="inputId"
      >
        {{ label }}

        <span
          v-if="required"
          class="file-uploader__required"
          aria-hidden="true"
        >
          *
        </span>
      </label>

      <p
        v-if="description"
        class="file-uploader__description"
      >
        {{ description }}
      </p>
    </div>

    <div
      class="file-uploader__dropzone"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-disabled="disabled"
      :aria-invalid="hasError || undefined"
      @click="openFileDialog"
      @keydown="handleDropzoneKeyDown"
      @dragenter="handleDragEnter"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <input
        ref="inputRef"
        :id="inputId"
        type="file"
        class="file-uploader__input"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        @change="handleInputChange"
      />

      <div class="file-uploader__placeholder">
        <strong>{{ placeholder }}</strong>

        <span v-if="metaText">
          {{ metaText }}
        </span>
      </div>

      <button
        type="button"
        class="file-uploader__button"
        :disabled="disabled"
        @click.stop="openFileDialog"
      >
        {{ buttonText }}
      </button>
    </div>

    <p
      v-if="error || internalError"
      class="file-uploader__error"
      role="alert"
    >
      {{ error || internalError }}
    </p>

    <div
      v-if="modelValue.length > 0"
      class="file-uploader__list"
    >
      <div class="file-uploader__list-header">
        <strong>선택된 파일 {{ modelValue.length }}개</strong>

        <button
          type="button"
          class="file-uploader__clear"
          :disabled="disabled"
          @click="handleClear"
        >
          전체 삭제
        </button>
      </div>

      <ul class="file-uploader__items">
        <li
          v-for="item in modelValue"
          :key="item.id"
          :class="[
            'file-uploader__item',
            item.error && 'file-uploader__item--error',
          ]"
        >
          <img
            v-if="preview && item.file.type.startsWith('image/') && item.previewUrl"
            :src="item.previewUrl"
            alt=""
            class="file-uploader__thumb"
          />

          <div
            v-else
            class="file-uploader__file-icon"
            aria-hidden="true"
          >
            📄
          </div>

          <div class="file-uploader__file-info">
            <strong class="file-uploader__file-name">
              {{ item.file.name }}
            </strong>

            <span class="file-uploader__file-size">
              {{ formatFileSize(item.file.size) }}
            </span>

            <span
              v-if="item.error"
              class="file-uploader__file-error"
            >
              {{ item.error }}
            </span>
          </div>

          <button
            type="button"
            class="file-uploader__remove"
            :aria-label="`${item.file.name} 삭제`"
            :disabled="disabled"
            @click="handleRemove(item.id)"
          >
            ×
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>