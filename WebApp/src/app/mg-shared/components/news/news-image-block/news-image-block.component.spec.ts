import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsImageBlockComponent } from './news-image-block.component';

describe('NewsImageBlockComponent', () => {
  let component: NewsImageBlockComponent;
  let fixture: ComponentFixture<NewsImageBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsImageBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsImageBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
