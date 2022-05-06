import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEventModalComponent } from './manage-event-modal.component';

describe('ManageEventModalComponent', () => {
  let component: ManageEventModalComponent;
  let fixture: ComponentFixture<ManageEventModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEventModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
