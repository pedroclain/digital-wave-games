import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = authService.getAccessToken();
  const newUrl = new URL(`${environment.apiUrl}/${req.url}`);
  const newReq = req.clone({
    url: newUrl.toString(),
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        !newReq.url.includes('/auth') &&
        error.status === HttpStatusCode.Unauthorized
      ) {
        authService.logout();
        router.navigate(['/login'], { queryParams: { expire: true } });

        return of();
      }

      return throwError(() => error);
    }),
  );
};
