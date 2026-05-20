<template>
  <section v-if="error" class="state-panel" role="alert">
    <p class="eyebrow">Something went wrong</p>
    <h1>We could not render this page.</h1>
    <p>{{ error.message }}</p>
    <button class="button" type="button" @click="reset">Try again</button>
  </section>
  <slot v-else />
</template>

<script>
export default {
  name: 'ErrorBoundary',
  data() {
    return {
      error: null,
    };
  },
  errorCaptured(error) {
    this.error = error;
    return false;
  },
  methods: {
    reset() {
      this.error = null;
    },
  },
};
</script>
