import { TestBed } from '@angular/core/testing';

import { BreakpointService } from './breakpoint.service';

describe('BreakpointServiceService', () => {
  let service: BreakpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
