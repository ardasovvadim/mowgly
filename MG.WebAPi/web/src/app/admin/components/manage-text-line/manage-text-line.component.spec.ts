import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTextLineComponent } from './manage-text-line.component';

describe('ManageTextLineComponent', () => {
  let component: ManageTextLineComponent;
  let fixture: ComponentFixture<ManageTextLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTextLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTextLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
