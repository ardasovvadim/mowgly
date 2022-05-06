import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableSlotComponent } from './timetable-slot.component';

describe('TimetableSlotComponent', () => {
  let component: TimetableSlotComponent;
  let fixture: ComponentFixture<TimetableSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
