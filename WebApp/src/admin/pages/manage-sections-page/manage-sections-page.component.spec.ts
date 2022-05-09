import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSectionsPageComponent } from './manage-sections-page.component';

describe('ManageSectionsPageComponent', () => {
  let component: ManageSectionsPageComponent;
  let fixture: ComponentFixture<ManageSectionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSectionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSectionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
