import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableRecordModalComponent } from './timetable-record-modal.component';

describe('TimetableRecordModalComponent', () => {
  let component: TimetableRecordModalComponent;
  let fixture: ComponentFixture<TimetableRecordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableRecordModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableRecordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
