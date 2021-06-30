import {Injectable} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MgVariables} from '../utils/mgVariables';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  public isMatchedMinLgBreakpoint: boolean;
  public minLgBreakpoint$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMatchedMinLgBreakpoint = this.breakpointObserver.isMatched(this.getMinWidthQuery(MgVariables.LgBreakpoint));
    this.minLgBreakpoint$ = breakpointObserver.observe([this.getMinWidthQuery(MgVariables.LgBreakpoint)]).pipe(map((state) => state.matches));
  }

  private getMinWidthQuery = (breakpoint: number): string => `(min-width: ${MgVariables.LgBreakpoint}px)`;

}
