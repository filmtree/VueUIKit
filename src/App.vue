<template>
  <div class="app-layout">
    <aside class="app-sidebar">
      <h1 class="app-logo">UI Docs</h1>

      <nav class="app-nav" aria-label="컴포넌트 문서 메뉴">
        <RouterLink
          v-for="menu in routerMenus"
          :key="menu.path"
          :to="menu.path"
          class="app-nav__link"
        >
          {{ menu.label }}
        </RouterLink>
      </nav>
    </aside>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { routerMenus } from './router/menu'
</script>

<style scoped>

</style>