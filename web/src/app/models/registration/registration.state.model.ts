import {RegistrationState} from './registration.state';
import * as moment from 'moment';

export class RegistrationStateModel {
  currentStep: RegistrationState = RegistrationState.Location;
  selectedLocation: string | null = null;
  selectedSection: string | null = null;
  selectedMaster: string | null = null;
  expirationDate: string = moment().add(15, 'minutes').format();
}
