import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
      private readonly router: Router,
      private readonly authService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
        .pipe(
            catchError((error: HttpErrorResponse) => {
              this.handleError(error);
              return throwError(() => error);
            })
        )
  }

  private handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 404:
        this.handleNotFound(error);
        break;
      case 400:
        this.handleBadRequest(error);
        break;
      case 401:
        this.handleUnauthorized(error);
        break;
    }
  }

  private handleNotFound = (error: HttpErrorResponse) => {
  }

  private handleBadRequest = (error: HttpErrorResponse) => {

  }

  private handleUnauthorized(error: HttpErrorResponse) {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
