import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegCompletedModalComponent } from './reg-completed-modal.component';

describe('RegCompletedModalComponent', () => {
  let component: RegCompletedModalComponent;
  let fixture: ComponentFixture<RegCompletedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegCompletedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegCompletedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
