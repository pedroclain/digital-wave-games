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
import { LoadingService } from '../services/loading.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loadingService = inject(LoadingService);

  const accessToken = authService.getAccessToken();
  const newReq = req.clone({
    url: `${environment.apiUrl}/${req.url}`,
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!newReq.url.includes("/auth") && error.status === HttpStatusCode.Unauthorized) {
        loadingService.closeLoading();
        authService.logout();
        router.navigate(['/login'], { queryParams: {expire: true}})

        return of();
      }

      return throwError(() => error)
    })
  );
};
