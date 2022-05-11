import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EventVm} from '../../../app/models/events/event-vm';
import {ManageEventsApiService} from '../../services/manage-events-api.service';
import {ManageEventModalComponent} from './manage-event-modal/manage-event-modal.component';
import {toSortOrder} from '../../../app/services/events-api.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {PaginationComponent} from '../../../app/mg-shared/components/pagination/pagination.component';
import {PageOptions} from '../../../app/models/page';
import {tap} from 'rxjs';
import {fadeInAnimation} from '../../../app/mg-shared/animations/fadeInAnimation';
import {smoothHeight} from '../../../app/mg-shared/animations/smooth-height-anim.directive';

@UntilDestroy()
@Component({
    selector: 'mg-manage-events-page',
    templateUrl: './manage-events-page.component.html',
    styleUrls: ['./manage-events-page.component.scss'],
    animations: [
        fadeInAnimation,
        smoothHeight
    ],
    providers: [
        ManageEventsApiService
    ]
})
export class ManageEventsPageComponent implements OnInit, AfterViewInit {

    @ViewChild('manageModal') manageModal: ManageEventModalComponent;

    filterText: string;
    filterDate: string;
    asc: boolean = false;
    data: EventVm[];

    @ViewChild('pagination') pagination: PaginationComponent;

    private readonly initialPageOptions = {
        count: 0,
        pageSize: 10,
        pageNumber: 0
    }

    pageOptions: PageOptions = {...this.initialPageOptions};
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
            pageNumber: this.pageOptions.pageNumber,
            pageSize: this.pageOptions.pageSize,
            sort: 'ActionDate',
            sortOrder: toSortOrder(this.asc)
        })
            .pipe(
                tap(data => {
                    if (!data) {
                        this.pageOptions = null;
                        return
                    }

                    this.pageOptions = {
                        pageNumber: data.pageNumber,
                        pageSize: data.pageSize,
                        count: data.count
                    }
                }),
            )
            .subscribe(data => {
                this.data = data.elements;
            });
    }

    reset() {
        this.filterText = null;
        this.filterDate = null;
        this.pageOptions = {...this.initialPageOptions};
        this.refreshData();
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
