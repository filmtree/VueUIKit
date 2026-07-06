<script setup lang="ts">
import { computed, ref } from "vue";

import {
  FileUploader,
  type FileUploaderItem,
} from "/src/components/file-uploader";

/**
 * 기본 첨부파일 예제 상태입니다.
 */
const basicFiles = ref<FileUploaderItem[]>([]);

/**
 * 이미지 업로드 예제 상태입니다.
 */
const imageFiles = ref<FileUploaderItem[]>([]);

/**
 * 단일 파일 업로드 예제 상태입니다.
 */
const singleFile = ref<FileUploaderItem[]>([]);

/**
 * PDF 전용 업로드 예제 상태입니다.
 */
const pdfFiles = ref<FileUploaderItem[]>([]);

/**
 * 용량 제한 예제 상태입니다.
 */
const sizeLimitFiles = ref<FileUploaderItem[]>([]);

/**
 * 개수 제한 예제 상태입니다.
 */
const countLimitFiles = ref<FileUploaderItem[]>([]);

/**
 * 미리보기 없는 업로드 예제 상태입니다.
 */
const noPreviewFiles = ref<FileUploaderItem[]>([]);

/**
 * 외부 에러 표시 예제 상태입니다.
 */
const errorFiles = ref<FileUploaderItem[]>([]);

/**
 * 서버 업로드 예제 상태입니다.
 */
const uploadFiles = ref<FileUploaderItem[]>([]);

/**
 * 서버 업로드 진행 상태입니다.
 */
const isSubmitting = ref(false);

/**
 * 업로드 가능한 파일인지 확인합니다.
 *
 * FileUploader 내부 검증에서 에러가 들어간 파일이 있으면
 * 서버 업로드를 막기 위해 사용합니다.
 */
const hasInvalidUploadFile = computed(() => {
  return uploadFiles.value.some((item) => {
    return Boolean(item.error);
  });
});

/**
 * 서버 업로드 예제 함수입니다.
 *
 * 실제 프로젝트에서는 /api/upload 주소를
 * 프로젝트의 업로드 API 주소로 변경해서 사용합니다.
 */
const handleSubmit = async () => {
  if (uploadFiles.value.length === 0) {
    alert("업로드할 파일을 선택해주세요.");
    return;
  }

  if (hasInvalidUploadFile.value) {
    alert("업로드할 수 없는 파일이 포함되어 있습니다.");
    return;
  }

  const formData = new FormData();

  /**
   * FileUploaderItem 안의 실제 File 객체만 FormData에 담습니다.
   */
  uploadFiles.value.forEach((item) => {
    formData.append("files", item.file);
  });

  try {
    isSubmitting.value = true;

    /**
     * 실제 서버 연동 시 아래 fetch 주소를 수정합니다.
     */
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("업로드 실패");
    }

    alert("업로드가 완료되었습니다.");

    /**
     * 업로드 완료 후 선택된 파일을 초기화합니다.
     */
    uploadFiles.value = [];
  } catch (error) {
    console.error(error);
    alert("파일 업로드 중 문제가 발생했습니다.");
  } finally {
    isSubmitting.value = false;
  }
};

/**
 * 선택 파일 목록을 콘솔에서 확인하는 예제 함수입니다.
 */
const handleLogFiles = (files: FileUploaderItem[]) => {
  console.log(
    files.map((item) => {
      return {
        name: item.file.name,
        size: item.file.size,
        type: item.file.type,
        error: item.error,
      };
    })
  );
};
</script>

<template>
  <main class="file-uploader-page">
    <header class="file-uploader-page__header">
      <p class="file-uploader-page__eyebrow">Vue 3 FileUploader</p>

      <h1>FileUploader 통합 예제</h1>

      <p>
        단일 업로드, 다중 업로드, 드래그 앤 드롭, 파일 타입 제한,
        용량 제한, 개수 제한, 이미지 미리보기, 삭제, 에러 표시,
        서버 업로드 예제를 한 화면에서 확인할 수 있습니다.
      </p>
    </header>

    <section class="example-section">
      <h2>기본 다중 파일 업로드</h2>

      <div class="example-card">
        <FileUploader
          v-model="basicFiles"
          label="첨부파일"
          description="이미지 또는 PDF 파일을 업로드할 수 있습니다."
          multiple
          accept="image/*,.pdf"
          :max-files="5"
          :max-size="5 * 1024 * 1024"
          @change="handleLogFiles"
        />

        <div class="example-info">
          <strong>현재 선택된 파일</strong>
          <span>{{ basicFiles.length }}개</span>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2>이미지 업로드 전용</h2>

      <div class="example-card">
        <FileUploader
          v-model="imageFiles"
          label="상품 이미지"
          description="이미지만 업로드할 수 있습니다. 최대 3장, 파일당 2MB 이하입니다."
          multiple
          accept="image/*"
          :max-files="3"
          :max-size="2 * 1024 * 1024"
          preview
          placeholder="상품 이미지를 드래그하거나 클릭해서 업로드하세요."
          button-text="이미지 선택"
        />

        <div class="example-info">
          <strong>사용 옵션</strong>
          <span>accept="image/*", preview, maxFiles 3</span>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2>단일 파일 업로드</h2>

      <div class="example-card">
        <FileUploader
          v-model="singleFile"
          label="사업자등록증"
          description="PDF 또는 이미지 파일 1개만 업로드할 수 있습니다."
          accept="image/*,.pdf"
          :max-files="1"
          :max-size="10 * 1024 * 1024"
          placeholder="사업자등록증 파일을 선택하세요."
          button-text="파일 선택"
        />

        <div class="example-info">
          <strong>현재 선택된 파일</strong>
          <span>{{ singleFile.length ? singleFile[0].file.name : "없음" }}</span>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2>PDF 파일만 허용</h2>

      <div class="example-card">
        <FileUploader
          v-model="pdfFiles"
          label="계약서"
          description="PDF 파일만 업로드할 수 있습니다."
          multiple
          accept=".pdf"
          :max-files="3"
          :max-size="10 * 1024 * 1024"
          :preview="false"
          placeholder="PDF 파일을 드래그하거나 클릭해서 업로드하세요."
          button-text="PDF 선택"
        />

        <div class="example-info">
          <strong>사용 옵션</strong>
          <span>accept=".pdf", preview false</span>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2>파일 용량 제한</h2>

      <div class="example-card">
        <FileUploader
          v-model="sizeLimitFiles"
          label="작은 이미지"
          description="파일당 500KB 이하만 업로드할 수 있습니다."
          multiple
          accept="image/*"
          :max-files="5"
          :max-size="500 * 1024"
          placeholder="500KB 이하의 이미지를 업로드하세요."
        />

        <div class="example-info">
          <strong>테스트 방법</strong>
          <span>500KB보다 큰 파일을 넣으면 파일별 에러가 표시됩니다.</span>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2>파일 개수 제한</h2>

      <div class="example-card">
        <FileUploader
          v-model="countLimitFiles"
          label="최대 2개 업로드"
          description="파일을 최대 2개까지만 업로드할 수 있습니다."
          multiple
          accept="image/*,.pdf"
          :max-files="2"
          :max-size="5 * 1024 * 1024"
        />

        <div class="example-info">
          <strong>현재 선택된 파일</strong>
          <span>{{ countLimitFiles.length }} / 2개</span>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2>미리보기 없는 파일 업로드</h2>

      <div class="example-card">
        <FileUploader
          v-model="noPreviewFiles"
          label="일반 첨부파일"
          description="이미지 파일이어도 썸네일을 보여주지 않는 예제입니다."
          multiple
          accept="image/*,.pdf,.doc,.docx"
          :max-files="5"
          :max-size="5 * 1024 * 1024"
          :preview="false"
        />

        <div class="example-info">
          <strong>사용 옵션</strong>
          <span>:preview="false"</span>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2>외부 에러 메시지 표시</h2>

      <div class="example-card">
        <FileUploader
          v-model="errorFiles"
          label="필수 첨부파일"
          description="폼 검증 결과를 외부 error props로 표시하는 예제입니다."
          accept="image/*,.pdf"
          :max-files="1"
          :max-size="5 * 1024 * 1024"
          required
          error="첨부파일은 필수입니다."
        />

        <div class="example-info">
          <strong>사용 옵션</strong>
          <span>required, error</span>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2>비활성화 상태</h2>

      <div class="example-card">
        <FileUploader
          :model-value="[]"
          label="비활성화 업로드"
          description="disabled 상태에서는 클릭, 키보드, 드래그 앤 드롭 업로드가 동작하지 않습니다."
          multiple
          accept="image/*,.pdf"
          disabled
        />

        <div class="example-info">
          <strong>사용 옵션</strong>
          <span>disabled</span>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2>서버 업로드 예제</h2>

      <div class="example-card">
        <FileUploader
          v-model="uploadFiles"
          label="서버로 업로드할 파일"
          description="선택한 파일을 FormData에 담아 서버로 전송하는 예제입니다."
          multiple
          accept="image/*,.pdf"
          :max-files="5"
          :max-size="5 * 1024 * 1024"
          :disabled="isSubmitting"
        />

        <div class="upload-actions">
          <button
            type="button"
            class="submit-button"
            :disabled="isSubmitting || uploadFiles.length === 0"
            @click="handleSubmit"
          >
            {{ isSubmitting ? "업로드 중..." : "업로드" }}
          </button>

          <p>
            실제 사용 시 <code>/api/upload</code> 주소를 프로젝트 API 주소로 변경하면 됩니다.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.file-uploader-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px 80px;

  color: #111827;
}

.file-uploader-page__header {
  margin-bottom: 40px;
}

.file-uploader-page__eyebrow {
  margin: 0 0 8px;

  color: #2563eb;

  font-size: 14px;
  font-weight: 700;
}

.file-uploader-page__header h1 {
  margin: 0;

  font-size: 36px;
  line-height: 1.25;
}

.file-uploader-page__header p {
  max-width: 720px;
  margin: 16px 0 0;

  color: #6b7280;

  font-size: 16px;
  line-height: 1.7;
}

.example-section {
  margin-top: 32px;
}

.example-section h2 {
  margin: 0 0 16px;

  font-size: 24px;
  line-height: 1.35;
}

.example-card {
  display: grid;
  gap: 16px;

  padding: 24px;

  border: 1px solid #e5e7eb;
  border-radius: 16px;

  background: #ffffff;

  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.example-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 12px 14px;

  border-radius: 10px;

  background: #f9fafb;

  color: #374151;

  font-size: 14px;
}

.example-info strong {
  color: #111827;
}

.example-info span {
  text-align: right;
}

.upload-actions {
  display: grid;
  gap: 10px;
  justify-items: start;
}

.upload-actions p {
  margin: 0;

  color: #6b7280;

  font-size: 13px;
  line-height: 1.6;
}

.upload-actions code {
  padding: 2px 6px;

  border-radius: 6px;

  background: #f3f4f6;
  color: #111827;

  font-size: 13px;
}

.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 40px;
  padding: 0 18px;

  border: 0;
  border-radius: 10px;

  background: #111827;
  color: #ffffff;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;
}

.submit-button:hover {
  background: #374151;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-button:focus-visible {
  outline: 2px solid #111827;
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .file-uploader-page {
    padding: 28px 16px 64px;
  }

  .file-uploader-page__header h1 {
    font-size: 28px;
  }

  .example-card {
    padding: 18px;
  }

  .example-info {
    align-items: flex-start;
    flex-direction: column;
  }

  .example-info span {
    text-align: left;
  }

  .submit-button {
    width: 100%;
  }
}
</style>