import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSectionModalComponent } from './manage-section-modal.component';

describe('ManageSectionModalComponent', () => {
  let component: ManageSectionModalComponent;
  let fixture: ComponentFixture<ManageSectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSectionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
