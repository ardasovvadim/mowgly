import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTextBlockComponent } from './news-text-block.component';

describe('NewsTextBlockComponent', () => {
  let component: NewsTextBlockComponent;
  let fixture: ComponentFixture<NewsTextBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsTextBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTextBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
