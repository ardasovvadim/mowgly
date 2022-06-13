import { Injectable } from '@angular/core';
import {ApiService} from '../../app/services/api.service';
import {Observable} from 'rxjs';
import {GetTelegramTokenResponse, TelegramStatus} from '../models/telegram.model';

@Injectable()
export class TelegramApiService {

  private readonly servicePrefix: string = 'telegram';

  constructor(
      private readonly api: ApiService
  ) {}

  generateLink(): Observable<GetTelegramTokenResponse> {
    return this.api.get(this.servicePrefix + '/token');
  }

  getStatus(): Observable<TelegramStatus> {
    return this.api.get(this.servicePrefix + '/state')
  }

  reset(): Observable<void> {
    return this.api.post(this.servicePrefix + '/configure', {});
  }
}
