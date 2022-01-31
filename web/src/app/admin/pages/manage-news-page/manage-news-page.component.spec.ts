import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNewsPageComponent } from './manage-news-page.component';

describe('ManageNewsPageComponent', () => {
  let component: ManageNewsPageComponent;
  let fixture: ComponentFixture<ManageNewsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNewsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
