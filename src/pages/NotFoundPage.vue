<template>
  <section class="state-panel">
    <p class="eyebrow">404</p>
    <h1>Page not found</h1>
    <p>The page you requested does not exist.</p>
    <div class="detail-actions compact">
      <button class="button secondary" type="button" @click="goBack">Back</button>
      <RouterLink class="button" to="/">Home</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  if (window.history.length > 1) {
    router.back();
    return;
  }

  router.push({ name: 'home' });
}
</script>
