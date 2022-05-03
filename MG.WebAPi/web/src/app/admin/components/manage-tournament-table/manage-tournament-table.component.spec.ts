import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTournamentTableComponent } from './manage-tournament-table.component';

describe('ManageTournamentTableComponent', () => {
  let component: ManageTournamentTableComponent;
  let fixture: ComponentFixture<ManageTournamentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTournamentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTournamentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
