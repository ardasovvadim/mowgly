import {Component, OnInit} from '@angular/core';
import {EventVm} from '../../models/events/event-vm';
import {EventsApiService} from '../../services/events-api.service';

@Component({
  selector: 'mg-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
  providers: [
    EventsApiService
  ]
})
export class EventsPageComponent implements OnInit {
  filterText: string;
  filterDate: string;
  isDesc: boolean = true;
  data: EventVm[];

  constructor(
    private readonly eventsApiService: EventsApiService
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  add() {

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
