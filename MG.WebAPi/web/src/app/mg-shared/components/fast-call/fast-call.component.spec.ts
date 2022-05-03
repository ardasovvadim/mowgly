import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastCallComponent } from './fast-call.component';

describe('FastCallComponent', () => {
  let component: FastCallComponent;
  let fixture: ComponentFixture<FastCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
