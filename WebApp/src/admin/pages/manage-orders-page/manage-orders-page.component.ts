import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {EventVm} from '../../../app/models/events/event-vm';
import {ManageEventsApiService} from '../../services/manage-events-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ManageEventModalComponent} from '../manage-events-page/manage-event-modal/manage-event-modal.component';
import {PaginationComponent} from '../../../app/mg-shared/components/pagination/pagination.component';
import {PageOptions} from '../../../app/models/page';
import {toSortOrder} from '../../../app/services/events-api.service';
import {delay, finalize, tap} from 'rxjs';
import {untilDestroyed} from '@ngneat/until-destroy';
import {fadeInAnimation} from '../../../app/mg-shared/animations/fadeInAnimation';
import {smoothHeight} from '../../../app/mg-shared/animations/smooth-height-anim.directive';
import {ManageOrderApiService} from '../../services/manage-order-api.service';
import {OrderVm} from '../../models/order.model';
import {OrderDetailsModalComponent} from './order-details-modal/order-details-modal.component';
import {TelegramApiService} from '../../services/telegram-api.service';
import {goToExternalLink} from '../../../app/utils/utils';
import {mgSuccessNotification} from '../../../app/utils/ui-kit';

@Component({
    selector: 'mg-manage-orders-page',
    templateUrl: './manage-orders-page.component.html',
    styleUrls: ['./manage-orders-page.component.scss'],
    animations: [
        fadeInAnimation,
        smoothHeight
    ],
    providers: [
        ManageOrderApiService,
        TelegramApiService
    ]
})
export class ManageOrdersPageComponent implements AfterViewInit {

    @ViewChild('modal') modal: OrderDetailsModalComponent;
    @ViewChild('pagination') pagination: PaginationComponent;

    filterText: string;
    filterDate: string;
    data: OrderVm[];
    currentRowIndex: number = -1;
    processed: boolean = null;
    private orderIdDetails: string;
    private initial: boolean = true;


    asc: boolean = false;
    private readonly initialPageOptions = {
        count: 0,
        pageSize: 10,
        pageNumber: 0
    }
    pageOptions: PageOptions = {...this.initialPageOptions};
    loading = false;

    constructor(
        private readonly orderApiService: ManageOrderApiService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly telegramApi: TelegramApiService
    ) {
    }

    ngOnInit(): void {
        this.refreshData();
    }

    refreshData() {
        this.loading = true;
        this.orderApiService.getList({
            createdDate: this.filterDate,
            processed: this.processed,
            filterText: this.filterText,
            pageNumber: this.pageOptions.pageNumber,
            pageSize: this.pageOptions.pageSize,
            sort: 'CreatedDate',
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
                finalize(() => this.loading = false)
            )
            .subscribe(data => {
                this.data = data.elements;

                if (this.initial) {
                    this.openDetails(this.orderIdDetails);
                    this.initial = false;
                }
            });
    }

    reset() {
        this.filterText = null;
        this.filterDate = null;
        this.processed = null;
        this.pageOptions = {...this.initialPageOptions};
        this.refreshData();
    }

    ngAfterViewInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            const orderId = params['order']
            this.orderIdDetails = orderId;
            this.openDetails(orderId);
        })
    }

    private openDetails(id: string) {
        const order = this.data?.find(o => o.id == id);
        if (order) {
            this.modal.displayDetails(order);
        }
    }

    details(item: OrderVm) {
        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: { order: item.id },
                queryParamsHandling: 'merge'
            });
    }

    onCloseModal() {
        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: {
                    order: null
                },
                queryParamsHandling: 'merge'
            });
    }

    generateTelegramLink() {
        this.telegramApi.generateLink()
            .pipe(
                tap(() => mgSuccessNotification('Ссылка будет действительна 5 минут')),
                delay(2000)
            )
            .subscribe(response => goToExternalLink(response.token));
    }
}
