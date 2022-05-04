import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTournamentModalComponent } from './manage-tournament-modal.component';

describe('ManageTournamentModalComponent', () => {
  let component: ManageTournamentModalComponent;
  let fixture: ComponentFixture<ManageTournamentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTournamentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTournamentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
