import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTimeslotModalComponent } from './manage-timeslot-modal.component';

describe('ManageTimeslotModalComponent', () => {
  let component: ManageTimeslotModalComponent;
  let fixture: ComponentFixture<ManageTimeslotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTimeslotModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTimeslotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
