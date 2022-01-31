import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedAccordionComponent } from './linked-accordion.component';

describe('LinkedAccordionComponent', () => {
  let component: LinkedAccordionComponent;
  let fixture: ComponentFixture<LinkedAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
