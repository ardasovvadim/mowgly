import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MgComponentService {

  private readonly componentStateSub: BehaviorSubject<ComponentState> = new BehaviorSubject<ComponentState>({
    isBottomMap: true
  });

  componentState$: Observable<ComponentState> = this.componentStateSub.asObservable();

  constructor() { }

  changeState(newState: ComponentState) {
    this.componentStateSub.next({...this.componentStateSub.value, ...newState});
  }
}

export interface ComponentState {
  isBottomMap: boolean;
}
