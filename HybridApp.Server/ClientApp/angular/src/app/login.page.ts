import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { errorMessage } from './error-message';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  template: `
    <form class="card form" (ngSubmit)="submit()">
      <h2>Вход</h2>
      <input name="userName" placeholder="Логин" [(ngModel)]="userName" autofocus />
      <input name="password" type="password" placeholder="Пароль" [(ngModel)]="password" />
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      <button type="submit" class="primary" [disabled]="loading() || !userName || !password">
        {{ loading() ? 'Входим...' : 'Войти' }}
      </button>
      <p class="muted">Тестовые пользователи: admin / admin123, student / student123</p>
    </form>
  `,
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  userName = '';
  password = '';
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  async submit(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await this.auth.login(this.userName, this.password);
      await this.router.navigateByUrl('/');
    } catch (err) {
      this.error.set(errorMessage(err, 'Ошибка входа'));
    } finally {
      this.loading.set(false);
    }
  }
}
