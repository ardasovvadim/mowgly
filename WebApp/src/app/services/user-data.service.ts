import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  getUserId(): string {
    return '8F256A33-E2BA-4FE1-860B-67947CDADAD8';
  }
}
