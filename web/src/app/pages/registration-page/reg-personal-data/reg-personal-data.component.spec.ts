import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPersonalDataComponent } from './reg-personal-data.component';

describe('RegPersonalDataComponent', () => {
  let component: RegPersonalDataComponent;
  let fixture: ComponentFixture<RegPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegPersonalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
