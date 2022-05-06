import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableRecordTableComponent } from './timetable-record-table.component';

describe('TimetableRecordTableComponent', () => {
  let component: TimetableRecordTableComponent;
  let fixture: ComponentFixture<TimetableRecordTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableRecordTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
