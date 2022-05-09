import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLocationsPageComponent } from './manage-locations-page.component';

describe('ManageLocationsPageComponent', () => {
  let component: ManageLocationsPageComponent;
  let fixture: ComponentFixture<ManageLocationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLocationsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLocationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
