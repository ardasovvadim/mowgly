import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSettingsPageComponent } from './manage-settings-page.component';

describe('ManageSettingsPageComponent', () => {
  let component: ManageSettingsPageComponent;
  let fixture: ComponentFixture<ManageSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSettingsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
