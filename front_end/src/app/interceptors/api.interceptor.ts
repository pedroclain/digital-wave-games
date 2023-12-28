import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  const newReq = req.clone({
    url: `${environment.apiUrl}/${req.url}`,
    setHeaders: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  return next(newReq);
};
