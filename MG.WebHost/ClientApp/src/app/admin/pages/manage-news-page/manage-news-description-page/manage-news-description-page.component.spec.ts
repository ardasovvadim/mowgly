import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNewsDescriptionPageComponent } from './manage-news-description-page.component';

describe('ManageNewsDescriptionPageComponent', () => {
  let component: ManageNewsDescriptionPageComponent;
  let fixture: ComponentFixture<ManageNewsDescriptionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNewsDescriptionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNewsDescriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
