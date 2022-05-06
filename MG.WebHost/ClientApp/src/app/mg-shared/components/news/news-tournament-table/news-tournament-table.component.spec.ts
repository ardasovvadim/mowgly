import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTournamentTableComponent } from './news-tournament-table.component';

describe('NewsTournamentTableComponent', () => {
  let component: NewsTournamentTableComponent;
  let fixture: ComponentFixture<NewsTournamentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsTournamentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTournamentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
