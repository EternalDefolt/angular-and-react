const BASE = 'https://jsonplaceholder.typicode.com';

export interface ApiTask {
  userId: number;
  id: number;
  title: string;
  body?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: { city: string; street: string };
  company: { name: string };
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      message = res.statusText || message;
    }
    throw new Error(message);
  }

  if (res.status === 204) return null as T;
  return res.json() as Promise<T>;
}

export function getTasks(): Promise<ApiTask[]> {
  return request<ApiTask[]>('/todos?_limit=20');
}

export function getTask(id: string): Promise<ApiTask> {
  return request<ApiTask>(`/todos/${id}`);
}

export function createTask(data: Omit<ApiTask, 'id'>): Promise<ApiTask> {
  return request<ApiTask>('/todos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateTask({ id, ...data }: ApiTask): Promise<ApiTask> {
  return request<ApiTask>(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTask(id: number): Promise<void> {
  await request<unknown>(`/todos/${id}`, { method: 'DELETE' });
}

export function getUsers(): Promise<ApiUser[]> {
  return request<ApiUser[]>('/users');
}

export function getUser(id: string): Promise<ApiUser> {
  return request<ApiUser>(`/users/${id}`);
}
