import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMasterModalComponent } from './manage-master-modal.component';

describe('ManageMasterModalComponent', () => {
  let component: ManageMasterModalComponent;
  let fixture: ComponentFixture<ManageMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
