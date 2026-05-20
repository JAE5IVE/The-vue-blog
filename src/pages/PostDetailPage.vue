<template>
  <article v-if="post" class="detail-page">
    <div class="detail-actions">
      <button class="button secondary" type="button" @click="goBack">Back</button>
      <RouterLink class="button" to="/">Home</RouterLink>
    </div>

    <p class="eyebrow">Article</p>
    <h1>{{ post.title }}</h1>
    <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
  </article>

  <section v-else-if="isLoading" class="state-panel" aria-live="polite">
    <p class="eyebrow">Loading</p>
    <h1>Fetching post...</h1>
  </section>

  <section v-else class="state-panel">
    <p class="eyebrow">Missing post</p>
    <h1>This post does not exist.</h1>
    <p>The post may have been removed or the link may be incorrect.</p>
    <div class="detail-actions compact">
      <button class="button secondary" type="button" @click="goBack">Back</button>
      <RouterLink class="button" to="/">Home</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { fetchPostById } from '../services/posts';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const post = ref(null);
const isLoading = ref(true);

const paragraphs = computed(() => {
  return String(post.value?.content || '')
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
});

function goBack() {
  if (window.history.length > 1) {
    router.back();
    return;
  }

  router.push({ name: 'home' });
}

onMounted(async () => {
  try {
    post.value = await fetchPostById(props.id);
  } finally {
    isLoading.value = false;
  }
});
</script>
