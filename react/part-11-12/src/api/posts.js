const BASE = 'https://jsonplaceholder.typicode.com';

export const PAGE_SIZE = 10;

const FORBIDDEN_WORDS = ['спам', 'spam'];

export class ApiError extends Error {
  constructor(message, { status, field } = {}) {
    super(message);
    this.status = status;
    this.field = field;
  }
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json; charset=UTF-8', ...options.headers },
  });
  if (!res.ok) {
    throw new ApiError(res.status === 404 ? 'Пост не найден' : `HTTP ${res.status}`, {
      status: res.status,
    });
  }
  return res;
}

function checkServerRules(data) {
  const title = (data.title || '').toLowerCase();
  if (FORBIDDEN_WORDS.some((word) => title.includes(word))) {
    throw new ApiError('Сервер отклонил заголовок: запрещённое слово', {
      status: 422,
      field: 'title',
    });
  }
}

export async function getPosts() {
  const res = await request(`/posts?_limit=${PAGE_SIZE}`);
  return res.json();
}

export async function getPostsPage(page) {
  const res = await request(`/posts?_page=${page}&_limit=${PAGE_SIZE}`);
  const total = Number(res.headers.get('x-total-count')) || 100;
  const posts = await res.json();
  return { posts, total, totalPages: Math.ceil(total / PAGE_SIZE) };
}

export async function getPost(id) {
  const res = await request(`/posts/${id}`);
  const post = await res.json();
  if (!post || !post.id) {
    throw new ApiError('Пост не найден', { status: 404 });
  }
  return post;
}

export async function createPost(data) {
  checkServerRules(data);
  const res = await request('/posts', { method: 'POST', body: JSON.stringify(data) });
  return res.json();
}

export async function updatePost(id, data) {
  checkServerRules(data);
  const res = await request(`/posts/${id}`, { method: 'PUT', body: JSON.stringify({ ...data, id }) });
  return res.json();
}

export async function deletePost(id) {
  await request(`/posts/${id}`, { method: 'DELETE' });
  return id;
}
