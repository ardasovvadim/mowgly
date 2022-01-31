import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSchedulePageComponent } from './manage-schedule-page.component';

describe('ManageSchedulePageComponent', () => {
  let component: ManageSchedulePageComponent;
  let fixture: ComponentFixture<ManageSchedulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSchedulePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
