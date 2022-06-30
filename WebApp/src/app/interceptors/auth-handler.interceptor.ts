import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class AuthHandlerInterceptor implements HttpInterceptor {

    constructor(
        private readonly authService: AuthenticationService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.authService.isAuthenticated) {
            request = this.getAuthRequest(request)
        }

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    return this.authService.refreshToken().pipe(
                        switchMap(() => next.handle(this.getAuthRequest(request)))
                    )
                }

                return throwError(() => err);
            })
        );
    }

    private getAuthRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        })
    }

}
