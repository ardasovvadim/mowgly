import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTournamentResultModalComponent } from './manage-tournament-result-modal.component';

describe('ManageTournamentResultModalComponent', () => {
  let component: ManageTournamentResultModalComponent;
  let fixture: ComponentFixture<ManageTournamentResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTournamentResultModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTournamentResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
