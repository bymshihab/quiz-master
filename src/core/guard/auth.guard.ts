import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    if (user && user.role) {
      // Check if the route's data contains the allowed role
      if (route.data['roles'] && route.data['roles'].includes(user.role)) {
        return true;
      }
      // Redirect to a not authorized page or home if the role is not allowed
      this.router.navigate(['/']);
      return false;
    }

    // Redirect to login if the user is not authenticated
    this.router.navigate(['/auth']);
    return false;
  }
}
