export interface User {
  userName: string
  displayName: string
  role: string
}

export interface Note {
  id: number
  text: string
  author: string
  client: string
  createdAt: string
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(path, {
    credentials: 'include',
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })

  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch {
      message = res.statusText || message
    }
    throw new ApiError(res.status, message)
  }

  if (res.status === 204) {
    return undefined as T
  }

  return res.json() as Promise<T>
}

export const api = {
  me: () => request<User>('/api/auth/me'),
  login: (userName: string, password: string) =>
    request<User>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
    }),
  logout: () => request<void>('/api/auth/logout', { method: 'POST' }),
  getNotes: () => request<Note[]>('/api/notes'),
  addNote: (text: string) =>
    request<Note>('/api/notes', {
      method: 'POST',
      body: JSON.stringify({ text, client: 'react' }),
    }),
  deleteNote: (id: number) => request<void>(`/api/notes/${id}`, { method: 'DELETE' }),
}

export const angularUrl = import.meta.env.DEV ? 'http://localhost:4200/' : '/angular/'
