import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private loading: Promise<User | null> | null = null;

  readonly user = signal<User | null>(null);
  readonly isLoggedIn = computed(() => this.user() !== null);

  ensureLoaded(): Promise<User | null> {
    if (!this.loading) {
      this.loading = firstValueFrom(this.http.get<User>('/api/auth/me'))
        .then((user) => {
          this.user.set(user);
          return user;
        })
        .catch(() => {
          this.user.set(null);
          return null;
        });
    }
    return this.loading;
  }

  async login(userName: string, password: string): Promise<User> {
    const user = await firstValueFrom(
      this.http.post<User>('/api/auth/login', { userName, password })
    );
    this.user.set(user);
    this.loading = Promise.resolve(user);
    return user;
  }

  async logout(): Promise<void> {
    await firstValueFrom(this.http.post('/api/auth/logout', {}));
    this.user.set(null);
    this.loading = Promise.resolve(null);
  }

  canDelete(author: string): boolean {
    const user = this.user();
    return !!user && (user.userName === author || user.role === 'Admin');
  }
}
