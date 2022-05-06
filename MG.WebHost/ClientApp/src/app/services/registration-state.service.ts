import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {RegistrationStateModel} from '../models/registration/registration.state.model';
import * as moment from 'moment';

@Injectable()
export class RegistrationStateService {

  private readonly stateKey: string = 'registration-state';
  private readonly expiration: number = 15;

  constructor(private storage: StorageService) { }

  public getState(): RegistrationStateModel {
    let state = this.storage.get<RegistrationStateModel>(this.stateKey) ?? new RegistrationStateModel();

    if (moment.duration(moment(state.expirationDate).diff(moment())).asMinutes() > this.expiration) {
      state = new RegistrationStateModel();
      this.updateState(state);
      return state;
    }

    return state;
  }

  public updateState(state: RegistrationStateModel): void {
    this.storage.set(this.stateKey, state);
  }
}
