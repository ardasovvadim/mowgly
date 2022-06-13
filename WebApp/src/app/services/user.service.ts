import { Injectable } from '@angular/core';
import {
  CachedItem,
  ChangePasswordRequest,
  UserEditProfile,
  UserProfile,
  UserValidationResponse
} from '../models/user.model';
import * as moment from 'moment/moment';
import {StorageService} from './storage.service';
import {AuthenticationService} from './authentication.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiService} from './api.service';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly profileSub: BehaviorSubject<UserProfile> = new BehaviorSubject<UserProfile>(null);

  private readonly servicePrefix: string = 'user';

  profile$: Observable<UserProfile> = this.profileSub.asObservable();

  hasPermission(permission: string): Observable<boolean> {
    return this.profile$.pipe(
        map(profile => {
          return profile?.permissions?.includes(permission) ?? false
        })
    )
  }

  constructor(
      private readonly storage: StorageService,
      private readonly authService: AuthenticationService,
      private readonly api: ApiService
  ) {
    this.authService.isAuthenticated$.subscribe(isAuthenticated =>{
      if (isAuthenticated) {
        const profile = this.storage.get<CachedItem<UserProfile>>('profile');
        if (profile) {
          this.profileSub.next(profile.item);
        }
        if (profile == null || moment().isAfter(moment(profile.time))) {
          this.refreshProfile();
        }
      } else {
        this.clearProfile();
      }
    });
  }

  refreshProfile() {
    this.getProfile().subscribe(data => {
      this.storage.set('profile', {
        time: moment().add(15, 'minutes').format(),
        item: data
      } as CachedItem<UserProfile>);

      this.profileSub.next(data);
    })
  }

  private clearProfile() {
    this.storage.delete('profile');
    this.profileSub?.next(null);
  }

  getProfile(): Observable<UserProfile> {
    return this.api.get('user/profile');
  }

  getEditProfile(): Observable<UserEditProfile> {
    return this.api.get('user/edit-profile');
  }

  isPermissions(permissions: string[]): Observable<boolean> {
    return this.profile$.pipe(
        filter(profile => profile != null),
        map(profile => {
          return profile.permissions?.filter(p => permissions.includes(p))?.length == permissions.length;
        })
    )
  }

  updateUserData(request: UserEditProfile) {
    return this.api.post<UserValidationResponse>('user/profile', request);
  }

  changePassword(request: ChangePasswordRequest): Observable<UserValidationResponse> {
    return this.api.post(this.servicePrefix + '/change-password', request);
  }
}
