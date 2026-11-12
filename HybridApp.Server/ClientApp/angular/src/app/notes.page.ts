import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { errorMessage } from './error-message';
import { Note } from './models';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes-page',
  imports: [FormsModule, DatePipe],
  template: `
    <section class="card">
      <div class="row">
        <h2 class="grow">Общие заметки</h2>
        <button (click)="load()">Обновить</button>
      </div>

      <form class="row" (ngSubmit)="add()">
        <input
          class="grow"
          name="text"
          placeholder="Новая заметка"
          maxlength="500"
          [(ngModel)]="text"
        />
        <button type="submit" class="primary" [disabled]="!text.trim()">Добавить</button>
      </form>

      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      @if (loading()) {
        <p class="muted">Загрузка...</p>
      } @else if (notes().length === 0) {
        <p class="muted">Заметок нет</p>
      }

      <ul class="list">
        @for (note of notes(); track note.id) {
          <li>
            <span [class]="'tag tag--' + note.client">{{ note.client }}</span>
            <span class="grow">
              {{ note.text }}
              <br />
              <small class="muted">{{ note.author }} · {{ note.createdAt | date: 'dd.MM.yyyy, HH:mm:ss' }}</small>
            </span>
            @if (auth.canDelete(note.author)) {
              <button (click)="remove(note.id)">✕</button>
            }
          </li>
        }
      </ul>
    </section>
  `,
})
export class NotesPage implements OnInit {
  protected readonly auth = inject(AuthService);
  private readonly notesService = inject(NotesService);

  text = '';
  readonly notes = signal<Note[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.error.set(null);
    this.notesService.getAll().subscribe({
      next: (notes) => {
        this.notes.set(notes);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(errorMessage(err, 'Ошибка загрузки'));
        this.loading.set(false);
      },
    });
  }

  add(): void {
    const trimmed = this.text.trim();
    if (!trimmed) return;
    this.notesService.add(trimmed).subscribe({
      next: (note) => {
        this.notes.update((prev) => [note, ...prev]);
        this.text = '';
      },
      error: (err) => this.error.set(errorMessage(err, 'Ошибка сохранения')),
    });
  }

  remove(id: number): void {
    this.notesService.remove(id).subscribe({
      next: () => this.notes.update((prev) => prev.filter((n) => n.id !== id)),
      error: (err) => this.error.set(errorMessage(err, 'Ошибка удаления')),
    });
  }
}
