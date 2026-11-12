import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './models';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>('/api/notes');
  }

  add(text: string): Observable<Note> {
    return this.http.post<Note>('/api/notes', { text, client: 'angular' });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`/api/notes/${id}`);
  }
}
