import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastCallModalComponent } from './fast-call-modal.component';

describe('FastCallModalComponent', () => {
  let component: FastCallModalComponent;
  let fixture: ComponentFixture<FastCallModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastCallModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastCallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
