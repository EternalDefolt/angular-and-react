import { HttpErrorResponse } from '@angular/common/http';

export function errorMessage(err: unknown, fallback: string): string {
  if (err instanceof HttpErrorResponse) {
    return err.error?.message ?? `HTTP ${err.status}`;
  }
  return fallback;
}
