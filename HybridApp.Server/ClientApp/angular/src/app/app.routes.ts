import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './auth.guard';
import { LoginPage } from './login.page';
import { NotesPage } from './notes.page';

export const routes: Routes = [
  { path: '', component: NotesPage, canActivate: [authGuard] },
  { path: 'login', component: LoginPage, canActivate: [guestGuard] },
  { path: '**', redirectTo: '' },
];
