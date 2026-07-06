<script setup lang="ts">
    import { ref } from "vue";
    
    import {
      Dropdown,
      DropdownTrigger,
      DropdownMenu,
      DropdownItem,
      DropdownSeparator,
      DropdownLabel,
    } from "/src/components/dropdown";
    
    const controlledOpen = ref(false);
    
    const selectedFilters = ref<string[]>([]);
    
    const menuItems = [
      {
        label: "상세 보기",
        action: () => console.log("상세 보기"),
      },
      {
        label: "수정",
        action: () => console.log("수정"),
      },
      {
        label: "복사",
        action: () => console.log("복사"),
      },
      {
        label: "삭제",
        action: () => console.log("삭제"),
      },
    ];
    
    const toggleFilter = (value: string) => {
      if (selectedFilters.value.includes(value)) {
        selectedFilters.value = selectedFilters.value.filter((item) => {
          return item !== value;
        });
    
        return;
      }
    
      selectedFilters.value = [...selectedFilters.value, value];
    };
    
    const handleEdit = () => {
      console.log("수정");
    };
    
    const handleCopy = () => {
      console.log("복사");
    };
    
    const handleDelete = () => {
      console.log("삭제");
    };
    
    const handleDetail = () => {
      console.log("상세 보기");
    };
    
    const goProfile = () => {
      console.log("프로필 이동");
    };
    
    const goSetting = () => {
      console.log("설정 이동");
    };
    
    const logout = () => {
      console.log("로그아웃");
    };
    </script>
    
    <template>
      <main class="dropdown-page">
        <header class="dropdown-page__header">
          <p class="dropdown-page__eyebrow">Vue 3 Dropdown</p>
    
          <h1>Dropdown 통합 예제</h1>
    
          <p>
            기본 Dropdown, 더보기 메뉴, 프로필 메뉴, 아이콘/단축키,
            외부 제어, 위치 변경, 배열 렌더링, 화면 가장자리 자동 반전까지
            한 화면에서 확인할 수 있습니다.
          </p>
        </header>
    
        <section class="example-section">
          <h2>기본 사용</h2>
    
          <div class="example-card">
            <div class="example-card__content">
              <h3>기본 액션 메뉴</h3>
              <p>
                메뉴 아이템을 선택하면 기본적으로 Dropdown이 자동으로 닫힙니다.
              </p>
            </div>
    
            <Dropdown>
              <DropdownTrigger>
                메뉴 열기
              </DropdownTrigger>
    
              <DropdownMenu>
                <DropdownItem @select="handleEdit">
                  수정
                </DropdownItem>
    
                <DropdownItem @select="handleCopy">
                  복사
                </DropdownItem>
    
                <DropdownItem @select="handleDelete">
                  삭제
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </section>
    
        <section class="example-section">
          <h2>더보기 버튼 Dropdown</h2>
    
          <div class="example-card">
            <div class="example-card__content">
              <h3>카드 / 테이블 액션 메뉴</h3>
              <p>
                카드, 게시글 목록, 테이블 행 오른쪽에서 자주 사용하는 더보기 메뉴입니다.
              </p>
            </div>
    
            <Dropdown>
              <DropdownTrigger aria-label="더보기">
                ⋯
              </DropdownTrigger>
    
              <DropdownMenu placement="bottom-right">
                <DropdownItem @select="handleDetail">
                  상세 보기
                </DropdownItem>
    
                <DropdownItem @select="handleEdit">
                  수정
                </DropdownItem>
    
                <DropdownSeparator />
    
                <DropdownItem @select="handleDelete">
                  삭제
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </section>
    
        <section class="example-section">
          <h2>프로필 메뉴</h2>
    
          <div class="example-card">
            <div class="example-card__content">
              <h3>계정 Dropdown</h3>
              <p>
                사용자명 버튼을 누르면 계정 관련 메뉴가 열리는 구조입니다.
              </p>
            </div>
    
            <Dropdown>
              <DropdownTrigger>
                <span>홍길동</span>
                <span aria-hidden="true">⌄</span>
              </DropdownTrigger>
    
              <DropdownMenu placement="bottom-right">
                <DropdownLabel>
                  내 계정
                </DropdownLabel>
    
                <DropdownItem @select="goProfile">
                  프로필
                </DropdownItem>
    
                <DropdownItem @select="goSetting">
                  설정
                </DropdownItem>
    
                <DropdownSeparator />
    
                <DropdownItem @select="logout">
                  로그아웃
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </section>
    
        <section class="example-section">
          <h2>아이콘과 단축키 표시</h2>
    
          <div class="example-card">
            <div class="example-card__content">
              <h3>icon / suffix slot 사용</h3>
              <p>
                아이콘은 왼쪽에, 단축키나 보조 정보는 오른쪽에 표시할 수 있습니다.
              </p>
            </div>
    
            <Dropdown>
              <DropdownTrigger>
                작업
              </DropdownTrigger>
    
              <DropdownMenu>
                <DropdownItem @select="handleEdit">
                  <template #icon>
                    ✏️
                  </template>
    
                  수정
    
                  <template #suffix>
                    Ctrl+E
                  </template>
                </DropdownItem>
    
                <DropdownItem @select="handleCopy">
                  <template #icon>
                    📄
                  </template>
    
                  복사
    
                  <template #suffix>
                    Ctrl+C
                  </template>
                </DropdownItem>
    
                <DropdownItem @select="handleDelete">
                  <template #icon>
                    🗑️
                  </template>
    
                  삭제
    
                  <template #suffix>
                    Del
                  </template>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </section>
    
        <section class="example-section">
          <h2>메뉴 선택 후 닫히지 않게 하기</h2>
    
          <div class="example-card">
            <div class="example-card__content">
              <h3>필터형 Dropdown</h3>
              <p>
                체크형 필터처럼 여러 항목을 연속으로 선택해야 하는 경우
                <code>:close-on-select="false"</code>를 사용합니다.
              </p>
    
              <p class="selected-text">
                선택된 필터:
                <strong>
                  {{ selectedFilters.length ? selectedFilters.join(", ") : "없음" }}
                </strong>
              </p>
            </div>
    
            <Dropdown :close-on-select="false">
              <DropdownTrigger>
                필터
              </DropdownTrigger>
    
              <DropdownMenu>
                <DropdownLabel>
                  정렬
                </DropdownLabel>
    
                <DropdownItem @select="toggleFilter('최신순')">
                  <template #icon>
                    {{ selectedFilters.includes("최신순") ? "✓" : "" }}
                  </template>
    
                  최신순
                </DropdownItem>
    
                <DropdownItem @select="toggleFilter('인기순')">
                  <template #icon>
                    {{ selectedFilters.includes("인기순") ? "✓" : "" }}
                  </template>
    
                  인기순
                </DropdownItem>
    
                <DropdownItem @select="toggleFilter('낮은 가격순')">
                  <template #icon>
                    {{ selectedFilters.includes("낮은 가격순") ? "✓" : "" }}
                  </template>
    
                  낮은 가격순
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </section>
    
        <section class="example-section">
          <h2>v-model:open 외부 제어</h2>
    
          <div class="example-card">
            <div class="example-card__content">
              <h3>외부 버튼으로 열림 상태 제어</h3>
              <p>
                Dropdown 내부 트리거뿐 아니라 외부 버튼에서도 열림 상태를 제어할 수 있습니다.
              </p>
    
              <p class="selected-text">
                현재 상태:
                <strong>{{ controlledOpen ? "열림" : "닫힘" }}</strong>
              </p>
            </div>
    
            <div class="control-group">
              <button
                type="button"
                class="example-button"
                @click="controlledOpen = !controlledOpen"
              >
                외부 버튼으로 토글
              </button>
    
              <Dropdown v-model:open="controlledOpen">
                <DropdownTrigger>
                  내부 트리거
                </DropdownTrigger>
    
                <DropdownMenu>
                  <DropdownItem @select="() => console.log('메뉴 항목')">
                    메뉴 항목
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </section>
    
        <section class="example-section">
          <h2>placement 위치 변경</h2>
    
          <div class="placement-grid">
            <article class="placement-card">
              <h3>bottom-left</h3>
    
              <Dropdown>
                <DropdownTrigger>
                  열기
                </DropdownTrigger>
    
                <DropdownMenu placement="bottom-left">
                  <DropdownItem>메뉴 1</DropdownItem>
                  <DropdownItem>메뉴 2</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </article>
    
            <article class="placement-card">
              <h3>bottom-right</h3>
    
              <Dropdown>
                <DropdownTrigger>
                  열기
                </DropdownTrigger>
    
                <DropdownMenu placement="bottom-right">
                  <DropdownItem>메뉴 1</DropdownItem>
                  <DropdownItem>메뉴 2</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </article>
    
            <article class="placement-card">
              <h3>top-left</h3>
    
              <Dropdown>
                <DropdownTrigger>
                  열기
                </DropdownTrigger>
    
                <DropdownMenu placement="top-left">
                  <DropdownItem>메뉴 1</DropdownItem>
                  <DropdownItem>메뉴 2</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </article>
    
            <article class="placement-card">
              <h3>top-right</h3>
    
              <Dropdown>
                <DropdownTrigger>
                  열기
                </DropdownTrigger>
    
                <DropdownMenu placement="top-right">
                  <DropdownItem>메뉴 1</DropdownItem>
                  <DropdownItem>메뉴 2</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </article>
          </div>
        </section>
    
        <section class="example-section">
          <h2>브라우저 가장자리 자동 반전</h2>
    
          <p class="section-description">
            아래 예제는 화면 상하좌우에 가까운 위치에서 열었을 때
            메뉴가 잘리지 않도록 자동으로 반대 방향으로 바뀌는지 확인하는 영역입니다.
          </p>
    
          <div class="collision-demo">
            <div class="collision-demo__row collision-demo__row--top">
              <Dropdown>
                <DropdownTrigger>
                  왼쪽 위
                </DropdownTrigger>
    
                <DropdownMenu
                  placement="top-left"
                  :auto-flip="true"
                >
                  <DropdownLabel>
                    autoFlip true
                  </DropdownLabel>
                  <DropdownItem>메뉴 1</DropdownItem>
                  <DropdownItem>메뉴 2</DropdownItem>
                  <DropdownItem>메뉴 3</DropdownItem>
                </DropdownMenu>
              </Dropdown>
    
              <Dropdown>
                <DropdownTrigger>
                  오른쪽 위
                </DropdownTrigger>
    
                <DropdownMenu
                  placement="top-right"
                  :auto-flip="true"
                >
                  <DropdownLabel>
                    autoFlip true
                  </DropdownLabel>
                  <DropdownItem>메뉴 1</DropdownItem>
                  <DropdownItem>메뉴 2</DropdownItem>
                  <DropdownItem>메뉴 3</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
    
            <div class="collision-demo__center">
              <Dropdown>
                <DropdownTrigger>
                  자동 반전 꺼짐
                </DropdownTrigger>
    
                <DropdownMenu
                  placement="bottom-right"
                  :auto-flip="false"
                >
                  <DropdownLabel>
                    autoFlip false
                  </DropdownLabel>
                  <DropdownItem>지정한 위치 유지</DropdownItem>
                  <DropdownItem>화면 밖으로 나갈 수 있음</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
    
            <div class="collision-demo__row collision-demo__row--bottom">
              <Dropdown>
                <DropdownTrigger>
                  왼쪽 아래
                </DropdownTrigger>
    
                <DropdownMenu
                  placement="bottom-left"
                  :auto-flip="true"
                >
                  <DropdownLabel>
                    autoFlip true
                  </DropdownLabel>
                  <DropdownItem>메뉴 1</DropdownItem>
                  <DropdownItem>메뉴 2</DropdownItem>
                  <DropdownItem>메뉴 3</DropdownItem>
                </DropdownMenu>
              </Dropdown>
    
              <Dropdown>
                <DropdownTrigger>
                  오른쪽 아래
                </DropdownTrigger>
    
                <DropdownMenu
                  placement="bottom-right"
                  :auto-flip="true"
                >
                  <DropdownLabel>
                    autoFlip true
                  </DropdownLabel>
                  <DropdownItem>메뉴 1</DropdownItem>
                  <DropdownItem>메뉴 2</DropdownItem>
                  <DropdownItem>메뉴 3</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </section>
    
        <section class="example-section">
          <h2>배열 데이터로 렌더링</h2>
    
          <div class="example-card">
            <div class="example-card__content">
              <h3>메뉴 데이터를 배열로 관리</h3>
              <p>
                메뉴 항목이 반복되거나 서버 데이터 기반으로 구성될 때 사용할 수 있습니다.
              </p>
            </div>
    
            <Dropdown>
              <DropdownTrigger>
                배열 메뉴
              </DropdownTrigger>
    
              <DropdownMenu placement="bottom-right">
                <DropdownItem
                  v-for="item in menuItems"
                  :key="item.label"
                  @select="item.action"
                >
                  {{ item.label }}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </section>
      </main>
    </template>
    
    <style scoped>
    .dropdown-page {
      max-width: 1080px;
      margin: 0 auto;
      padding: 40px 24px 80px;
    
      color: #111827;
    }
    
    .dropdown-page__header {
      margin-bottom: 40px;
    }
    
    .dropdown-page__eyebrow {
      margin: 0 0 8px;
    
      color: #2563eb;
    
      font-size: 14px;
      font-weight: 700;
    }
    
    .dropdown-page__header h1 {
      margin: 0;
    
      font-size: 36px;
      line-height: 1.25;
    }
    
    .dropdown-page__header p {
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
    
    .section-description {
      max-width: 720px;
      margin: 0 0 16px;
    
      color: #6b7280;
    
      font-size: 14px;
      line-height: 1.7;
    }
    
    .example-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    
      padding: 24px;
    
      border: 1px solid #e5e7eb;
      border-radius: 16px;
    
      background: #ffffff;
    
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
    }
    
    .example-card__content {
      min-width: 0;
    }
    
    .example-card h3,
    .placement-card h3 {
      margin: 0;
    
      font-size: 18px;
      line-height: 1.4;
    }
    
    .example-card p {
      margin: 8px 0 0;
    
      color: #6b7280;
    
      font-size: 14px;
      line-height: 1.6;
    }
    
    .example-card code {
      padding: 2px 6px;
    
      border-radius: 6px;
    
      background: #f3f4f6;
      color: #111827;
    
      font-size: 13px;
    }
    
    .selected-text {
      margin-top: 12px;
    }
    
    .selected-text strong {
      color: #111827;
    }
    
    .control-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .example-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    
      min-height: 38px;
      padding: 0 14px;
    
      border: 1px solid #d1d5db;
      border-radius: 8px;
    
      background: #ffffff;
      color: #111827;
    
      font-size: 14px;
      font-weight: 600;
    
      cursor: pointer;
    }
    
    .example-button:hover {
      background: #f9fafb;
    }
    
    .example-button:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }
    
    .placement-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
    
      padding-top: 120px;
    }
    
    .placement-card {
      display: grid;
      justify-items: start;
      gap: 16px;
    
      min-height: 140px;
      padding: 24px;
    
      border: 1px solid #e5e7eb;
      border-radius: 16px;
    
      background: #ffffff;
    
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
    }
    
    /* =========================
       화면 가장자리 자동 반전 데모
    ========================= */
    
    .collision-demo {
      position: relative;
    
      min-height: 520px;
      padding: 24px;
    
      border: 1px dashed #cbd5e1;
      border-radius: 20px;
    
      background:
        linear-gradient(90deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px),
        linear-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px);
      background-size: 24px 24px;
    }
    
    .collision-demo__row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
    
    .collision-demo__row--top {
      position: absolute;
      top: 24px;
      left: 24px;
      right: 24px;
    }
    
    .collision-demo__row--bottom {
      position: absolute;
      right: 24px;
      bottom: 24px;
      left: 24px;
    }
    
    .collision-demo__center {
      position: absolute;
      top: 50%;
      left: 50%;
    
      transform: translate(-50%, -50%);
    }
    
    @media (max-width: 900px) {
      .placement-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    
    @media (max-width: 768px) {
      .dropdown-page {
        padding: 28px 16px 64px;
      }
    
      .dropdown-page__header h1 {
        font-size: 28px;
      }
    
      .example-card {
        align-items: stretch;
        flex-direction: column;
      }
    
      .control-group {
        align-items: stretch;
        flex-direction: column;
      }
    
      .collision-demo {
        min-height: 640px;
      }
    
      .collision-demo__row {
        align-items: flex-start;
        flex-direction: column;
      }
    
      .collision-demo__row--top,
      .collision-demo__row--bottom {
        right: 16px;
        left: 16px;
      }
    }
    
    @media (max-width: 520px) {
      .placement-grid {
        grid-template-columns: 1fr;
      }
    }
    </style>