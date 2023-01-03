import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {map} from 'rxjs/operators';
import {LocationStrategy} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizeGuard implements CanActivate {

    constructor(
        private readonly authService: AuthenticationService,
        private readonly location: LocationStrategy
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.isAuthenticated$.pipe(
            map(isAuthenticated => {
                if (isAuthenticated)
                    this.location.back();
                return !isAuthenticated;
            })
        );
    }

}
