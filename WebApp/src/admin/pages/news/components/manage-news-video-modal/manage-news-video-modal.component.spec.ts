import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNewsVideoModalComponent } from './manage-news-video-modal.component';

describe('ManageNewsVideoModalComponent', () => {
  let component: ManageNewsVideoModalComponent;
  let fixture: ComponentFixture<ManageNewsVideoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNewsVideoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNewsVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
