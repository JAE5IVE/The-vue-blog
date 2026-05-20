<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/">Vue Blog</RouterLink>
      <nav aria-label="Primary navigation">
        <RouterLink to="/">Home</RouterLink>
      </nav>
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
import { RouterLink, RouterView } from 'vue-router';
import ErrorBoundary from './components/ErrorBoundary.vue';
import PageLoader from './components/PageLoader.vue';
</script>
