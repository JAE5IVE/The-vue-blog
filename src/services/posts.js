const API_URL = 'https://api.oluwasetemi.dev/posts?all=true&status=PUBLISHED';

let cachedPosts;

function stripHtml(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function pickText(post, keys) {
  for (const key of keys) {
    if (post?.[key]) {
      return stripHtml(post[key]);
    }
  }

  return '';
}

function normalizePost(post, index) {
  const id = String(post?.id ?? post?._id ?? post?.slug ?? index + 1);
  const title = pickText(post, ['title', 'name', 'headline']) || `Blog Post ${index + 1}`;
  const content = pickText(post, ['content', 'body', 'description', 'text']) || generateContent(title);
  const excerptSource = pickText(post, ['excerpt', 'summary', 'description']) || content;
  const excerpt = excerptSource.length > 150 ? `${excerptSource.slice(0, 147)}...` : excerptSource;

  return {
    id,
    title,
    excerpt,
    content,
  };
}

function extractPosts(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.posts)) {
    return payload.posts;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}

export function generateContent(title) {
  return [
    `${title} explores a focused idea from a practical angle, giving readers a clear starting point and enough context to keep going.`,
    'The full post expands on the core topic with examples, observations, and takeaways that make the subject easier to apply.',
    'Use this detail view as the complete article experience for posts where the API only provides a short summary.',
  ].join('\n\n');
}

export async function fetchPosts() {
  if (cachedPosts) {
    return cachedPosts;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Unable to load posts. The API returned ${response.status}.`);
  }

  const payload = await response.json();
  cachedPosts = extractPosts(payload).map(normalizePost);

  return cachedPosts;
}

export async function fetchPostById(id) {
  const posts = await fetchPosts();
  return posts.find((post) => post.id === String(id));
}
