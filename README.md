# Echo Journal

A simple blog application built with Vue 3, Vite, and Vue Router. The app fetches published posts from `https://api.oluwasetemi.dev/`, displays a short list of unique blog posts, and lets users open each post on a detail page.

## Live Site

[https://vuebblogg.netlify.app/](https://vuebblogg.netlify.app/)

## Features

- Home page with fetched blog posts
- Post detail pages with dynamic routing
- Duplicate post filtering and a smaller curated post list
- 404 fallback page for unknown routes
- Back and Home navigation
- Lazy-loaded route pages
- Suspense loading fallback
- Error boundary UI
- Dark and light mode toggle with saved preference
- Responsive styling

## Tech Stack

- Vue 3
- Vue Router
- Vite
- CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://127.0.0.1:5173/
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Netlify Deployment

Use these settings when importing the GitHub repository into Netlify:

```text
Build command: npm run build
Publish directory: dist
```

Because this app uses Vue Router history mode, add a redirect file at `public/_redirects`:

```text
/* /index.html 200
```

Then commit and push the file before deploying.

## Project Structure

```text
src/
  components/
    ErrorBoundary.vue
    PageLoader.vue
  pages/
    HomePage.vue
    PostDetailPage.vue
    NotFoundPage.vue
  router/
    index.js
  services/
    posts.js
  App.vue
  main.js
  styles.css
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```
