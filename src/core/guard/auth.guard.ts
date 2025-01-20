import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  try {
    if (typeof localStorage === 'undefined') {
      router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user) {
      router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['roles'] as Array<string> | undefined;

    if (allowedRoles && allowedRoles.includes(user.role)) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } catch (error) {
    router.navigate(['/login']);
    return false;
  }
};
