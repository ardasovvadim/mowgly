import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNewsImageCoverModalComponent } from './manage-news-image-cover-modal.component';

describe('ManageNewsImageCoverModalComponent', () => {
  let component: ManageNewsImageCoverModalComponent;
  let fixture: ComponentFixture<ManageNewsImageCoverModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNewsImageCoverModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNewsImageCoverModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
