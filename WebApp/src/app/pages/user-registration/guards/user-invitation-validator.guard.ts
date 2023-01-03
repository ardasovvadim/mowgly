import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, Observable, of} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {map} from 'rxjs/operators';
import {MgError} from '../../error-page/error-page.component';

@Injectable()
export class UserInvitationValidatorGuard implements CanActivate {

    constructor(
        private readonly userService: UserService,
        private readonly router: Router
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = route.queryParamMap.get('token');

        if (!token)
            return true;

        return this.userService.getInvitation(token)
            .pipe(
                map(invite => {
                    debugger;
                    route.data = {
                        invite: invite
                    };

                    return true;
                }),
                catchError(err => {
                    debugger;
                    route.data = {
                        error: err
                    };

                    this.router.navigate(['/400'], {
                        state: {
                            code: '400',
                            text: 'Неправильне посилання на запрошення або час запрошення минув'
                        } as MgError
                    });
                    return of(true);
                }),
            );
    }

}
