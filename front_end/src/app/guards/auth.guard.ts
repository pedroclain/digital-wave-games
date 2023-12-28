import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = () => {
  const userService = inject(AuthService);
  const router = inject(Router);

  return userService.isLoggedIn() ? true : router.createUrlTree(['/login']);
}
