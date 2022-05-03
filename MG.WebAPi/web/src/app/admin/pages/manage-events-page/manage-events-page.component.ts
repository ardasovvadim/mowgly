import {Component, OnInit} from '@angular/core';
import {EventVm} from '../../../models/events/event-vm';
import {ManageEventsApiService} from '../../services/manage-events-api.service';
import {ModalService} from '../../../services/modal.service';
import {Observable, of} from 'rxjs';
import {ManageEventModalComponent} from './manage-event-modal/manage-event-modal.component';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'mg-manage-events-page',
  templateUrl: './manage-events-page.component.html',
  styleUrls: ['./manage-events-page.component.scss'],
  providers: [
    ManageEventsApiService
  ]
})
export class ManageEventsPageComponent implements OnInit {

  filterText: string;
  filterDate: string;
  isDesc: boolean = true;
  data: EventVm[];

  get manageModal(): Observable<ManageEventModalComponent> {
    if (this._manageModal)
      return of(this._manageModal);

    return this.modalService.createModal<ManageEventModalComponent>({type: ManageEventModalComponent})
      .pipe(
        filter(modal => !!modal),
        tap(modal => this._manageModal = modal)
      )
  }

  private _manageModal: ManageEventModalComponent;

  constructor(
    private readonly eventsApiService: ManageEventsApiService,
    private readonly modalService: ModalService
  ) {
  }


  ngOnInit(): void {
    this.refreshData();
  }

  add() {
    this.manage({} as EventVm);
  }

  edit(event: EventVm) {
    this.manage(event);
  }

  private manage(event: EventVm) {
    this.manageModal.subscribe(modal => {
      modal.manageEvent(event);
      const sub = modal.onSubmittedAndClosed.subscribe(_ => {
        this.refreshData();
        sub.unsubscribe();
      })
    })
  }

  refreshData() {
    this.eventsApiService.getList({
      actionDate: this.filterDate,
      filterText: this.filterText,
      pageNumber: 0,
      pageSize: 10,
      sort: this.isDesc ? 'desc' : 'asc'
    }).subscribe(data => this.data = data.elements);

  }
}
