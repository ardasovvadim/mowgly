import {Component, OnInit, ViewChild} from '@angular/core';
import {EventVm} from '../../models/events/event-vm';
import {EventsApiService, toSortOrder} from '../../services/events-api.service';
import {PaginationComponent} from '../../mg-shared/components/pagination/pagination.component';
import {PageOptions} from '../../models/page';
import {delay, finalize, tap} from 'rxjs';
import {fadeInAnimation} from '../../mg-shared/animations/fadeInAnimation';
import {smoothHeight} from '../../mg-shared/animations/smooth-height-anim.directive';
import {Router} from '@angular/router';

@Component({
    selector: 'mg-events-page',
    templateUrl: './events-page.component.html',
    styleUrls: ['./events-page.component.scss'],
    animations: [
        fadeInAnimation,
        smoothHeight
    ],
    providers: [
        EventsApiService
    ]
})
export class EventsPageComponent implements OnInit {

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
    loading: boolean = false;

    constructor(
        private readonly eventsApiService: EventsApiService,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
        this.refreshData();
    }

    refreshData() {
        this.loading = true;
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
                finalize(() => {
                    this.loading = false;
                })
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

    goToNews(newsId: string) {
        this.router.navigate(['/news/' + newsId]);
    }
}
