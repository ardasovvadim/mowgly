import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTextHtmlModalComponent } from './manage-text-html-modal.component';

describe('ManageTextHtmlModalComponent', () => {
  let component: ManageTextHtmlModalComponent;
  let fixture: ComponentFixture<ManageTextHtmlModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTextHtmlModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTextHtmlModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
