<template>
  <section class="page-header">
    <p class="eyebrow">Latest posts</p>
    <h1>Read recent articles</h1>
  </section>

  <section v-if="isLoading" class="state-panel" aria-live="polite">
    <p class="eyebrow">Loading</p>
    <h2>Fetching posts...</h2>
  </section>

  <section v-else-if="error" class="state-panel" role="alert">
    <p class="eyebrow">Network error</p>
    <h2>Posts could not be loaded.</h2>
    <p>{{ error }}</p>
    <button class="button" type="button" @click="loadPosts">Try again</button>
  </section>

  <section v-else-if="posts.length" class="post-list" aria-label="Blog posts">
    <article v-for="post in posts" :key="post.id" class="post-card">
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
      <RouterLink class="text-link" :to="{ name: 'post-detail', params: { id: post.id } }">
        Read full post
      </RouterLink>
    </article>
  </section>

  <section v-else class="state-panel">
    <p class="eyebrow">No posts</p>
    <h2>No blog posts are available.</h2>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { fetchPosts } from '../services/posts';

const posts = ref([]);
const error = ref('');
const isLoading = ref(true);

async function loadPosts() {
  isLoading.value = true;
  error.value = '';

  try {
    posts.value = await fetchPosts();
  } catch (caughtError) {
    error.value = caughtError.message || 'Please try again later.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadPosts);
</script>
