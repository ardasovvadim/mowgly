import { TestBed } from '@angular/core/testing';

import { ManageMasterService } from './manage-master.service';

describe('ManageMasterService', () => {
  let service: ManageMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
