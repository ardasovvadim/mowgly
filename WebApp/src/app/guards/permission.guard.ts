import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
      private readonly authService: AuthenticationService,
      private readonly userService: UserService,
      private readonly router: Router
  ) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
      return false;
    }

    const permissions = route.data['permissions'] as string[]
    if (!permissions?.length)
      return true;

    return this.userService.isPermissions(permissions).pipe(
        tap(isGranted => {
          if (!isGranted)
            this.router.navigateByUrl('/403');
        })
    );
  }
  
}
