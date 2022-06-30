import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {BehaviorSubject, Observable, Subject, tap} from 'rxjs';
import {LoginRequest, LoginResponse, RegistrationModel, UserValidationResponse} from '../models/user.model';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private isAuthenticatedSub: BehaviorSubject<boolean>;
    isAuthenticated$: Observable<boolean>;

    private onLogoutSub: Subject<void> = new Subject<void>();
    onLogout$ = this.onLogoutSub.asObservable();

    get isAuthenticated(): boolean {
        return this.isAuthenticatedSub.value;
    }

    readonly servicePrefix = 'user'

    constructor(
        private readonly api: ApiService,
        private readonly storage: StorageService,
        private readonly router: Router
    ) {
        const token = this.storage.get('token');
        this.isAuthenticatedSub = new BehaviorSubject<boolean>(!!token);
        this.isAuthenticated$ = this.isAuthenticatedSub.asObservable();
    }

    register(request: RegistrationModel): Observable<UserValidationResponse> {
        return this.api.post(this.servicePrefix + '/registration', request);
    }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.obtainLoginResponse(this.api.post<LoginResponse>(this.servicePrefix + '/login', request))
    }

    logout() {
        this.storage.delete('token');
        this.isAuthenticatedSub.next(false);
        this.onLogoutSub.next();
        this.router.navigateByUrl('/login');
    }

    getToken(): string {
        return this.storage.get('token');
    }

    getRefreshToken(): string {
        return this.storage.get('refreshToken');
    }

    signInWithGoogle(response): Observable<LoginResponse> {
        return this.obtainLoginResponse(this.api.post(this.servicePrefix + '/signin-google', response));
    }

    private obtainLoginResponse(request: Observable<LoginResponse>): Observable<LoginResponse> {
        return request
            .pipe(
                tap(response => {
                    if (!response.isSuccess)
                        return;

                    this.storage.set('token', response.token);
                    this.storage.set('refreshToken', response.refreshToken);
                    this.isAuthenticatedSub.next(true);
                })
            );
    }

    signupWithGoogle(response: any): Observable<UserValidationResponse> {
        return this.api.post(this.servicePrefix + '/signup-google', response);
    }

    refreshToken(): Observable<LoginResponse> {
        return this.api.post<LoginResponse>(this.servicePrefix + '/refresh', {
            refreshToken: this.getRefreshToken(),
            accessToken: this.getToken()
        }).pipe(
            tap(response => {
                if (response.isSuccess) {
                    this.storage.set('token', response.token);
                    this.storage.set('refreshToken', response.refreshToken);
                }
            })
        );
    }
}
