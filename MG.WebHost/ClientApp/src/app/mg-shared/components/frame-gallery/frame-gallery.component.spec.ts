import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameGalleryComponent } from './frame-gallery.component';

describe('FrameGalleryComponent', () => {
  let component: FrameGalleryComponent;
  let fixture: ComponentFixture<FrameGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});