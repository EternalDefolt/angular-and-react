const BASE = 'https://jsonplaceholder.typicode.com';

export async function request(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res;
}

export async function apiFetch(path, options = {}) {
  const res = await request(`${BASE}${path}`, options);
  return res.json();
}

export function getUsers(signal) {
  return apiFetch('/users', { signal });
}

export function getUserById(id, signal) {
  return apiFetch(`/users/${id}`, { signal });
}

export async function getPostsPage(page, limit, signal) {
  const res = await request(`${BASE}/posts?_page=${page}&_limit=${limit}`, { signal });
  const total = Number(res.headers.get('x-total-count')) || 100;
  const posts = await res.json();
  return { posts, total };
}

export function searchPosts(query, signal) {
  return apiFetch(`/posts?q=${encodeURIComponent(query)}`, { signal });
}

export async function getCatFact(signal) {
  const res = await request('https://catfact.ninja/fact', { signal });
  return res.json();
}

export async function findCity(name, signal) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=ru&format=json`;
  const res = await request(url, { signal });
  const data = await res.json();
  return data.results?.[0] || null;
}

export async function getCurrentWeather(lat, lon, signal) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&timezone=auto`;
  const res = await request(url, { signal });
  const data = await res.json();
  return data.current;
}
