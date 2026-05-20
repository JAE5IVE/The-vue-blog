<template>
  <div class="app-shell" :data-theme="theme">
    <header class="site-header">
      <RouterLink class="brand" to="/">Echo Journal</RouterLink>
      <div class="header-actions">
        <nav aria-label="Primary navigation">
          <RouterLink to="/">Home</RouterLink>
        </nav>
        <button class="theme-toggle" type="button" :aria-label="themeLabel" @click="toggleTheme">
          <span>{{ themeLabel }}</span>
        </button>
      </div>
    </header>

    <main class="page-frame">
      <ErrorBoundary>
        <RouterView v-slot="{ Component }">
          <Suspense>
            <component :is="Component" />
            <template #fallback>
              <PageLoader />
            </template>
          </Suspense>
        </RouterView>
      </ErrorBoundary>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import ErrorBoundary from './components/ErrorBoundary.vue';
import PageLoader from './components/PageLoader.vue';

const theme = ref('light');

const themeLabel = computed(() => (theme.value === 'dark' ? 'Light mode' : 'Dark mode'));

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}

onMounted(() => {
  const savedTheme = localStorage.getItem('blog-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  theme.value = savedTheme || (prefersDark ? 'dark' : 'light');
});

watch(theme, (nextTheme) => {
  localStorage.setItem('blog-theme', nextTheme);
});
</script>
