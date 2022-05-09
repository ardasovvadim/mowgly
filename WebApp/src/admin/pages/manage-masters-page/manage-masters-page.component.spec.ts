import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMastersPageComponent } from './manage-masters-page.component';

describe('ManageMastersPageComponent', () => {
  let component: ManageMastersPageComponent;
  let fixture: ComponentFixture<ManageMastersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMastersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMastersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
