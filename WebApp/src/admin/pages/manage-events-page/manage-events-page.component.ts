import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EventVm} from '../../../app/models/events/event-vm';
import {ManageEventsApiService} from '../../services/manage-events-api.service';
import {ManageEventModalComponent} from './manage-event-modal/manage-event-modal.component';
import {toSortOrder} from '../../../app/services/events-api.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'mg-manage-events-page',
    templateUrl: './manage-events-page.component.html',
    styleUrls: ['./manage-events-page.component.scss'],
    providers: [
        ManageEventsApiService
    ]
})
export class ManageEventsPageComponent implements OnInit, AfterViewInit {

    @ViewChild('manageModal') manageModal: ManageEventModalComponent;

    filterText: string;
    filterDate: string;
    isDesc: boolean = true;
    data: EventVm[];
    currentRowIndex: number = -1;

    constructor(
        private readonly eventsApiService: ManageEventsApiService,
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
        this.manageModal.manageEvent(event);
    }

    refreshData() {
        this.eventsApiService.getList({
            actionDate: this.filterDate,
            filterText: this.filterText,
            pageNumber: 0,
            pageSize: 10,
            sort: 'CreatedDate',
            sortOrder: toSortOrder(this.isDesc)
        }).subscribe(data => this.data = data.elements);
    }

    ngAfterViewInit(): void {
        this.manageModal.onSubmittedAndClosed
            .pipe(
                untilDestroyed(this)
            )
            .subscribe(_ => {
                this.refreshData();
            })
    }
}
