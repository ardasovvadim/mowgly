import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminUserVm, UserType, userTypes} from '../../models/user.model';
import {ModalService} from '../../../app/services/modal.service';
import {fadeInAnimation} from '../../../app/mg-shared/animations/fadeInAnimation';
import {smoothHeight} from '../../../app/mg-shared/animations/smooth-height-anim.directive';
import {PaginationComponent} from '../../../app/mg-shared/components/pagination/pagination.component';
import {PageOptions} from '../../../app/models/page';
import {toSortOrder} from '../../../app/services/events-api.service';
import {tap} from 'rxjs';
import {ManageUserApiService} from '../../services/manage-user-api.service';
import {ManageUserModalComponent} from './manage-user-modal/manage-user-modal.component';

@Component({
    selector: 'mg-manage-users-page',
    templateUrl: './manage-users-page.component.html',
    styleUrls: ['./manage-users-page.component.scss'],
    animations: [
        fadeInAnimation,
        smoothHeight
    ],
    providers: [
        ManageUserApiService
    ]
})
export class ManageUsersPageComponent implements OnInit {

    userTypes = userTypes;

    @ViewChild('modal') modal: ManageUserModalComponent;
    @ViewChild('pagination') pagination: PaginationComponent;

    filterText: string;
    filterDate: string;
    data: AdminUserVm[];
    currentRowIndex: number = -1;

    asc: boolean = false;
    private readonly initialPageOptions = {
        count: 0,
        pageSize: 10,
        pageNumber: 0
    }
    pageOptions: PageOptions = {...this.initialPageOptions};
    userType: UserType = null;

    constructor(
        private readonly modalService: ModalService,
        private readonly userApiService: ManageUserApiService
    ) {
    }

    ngOnInit(): void {
        this.refreshData();
    }

    refreshData() {
        this.userApiService.getList({
            userType: +this.userType,
            filterText: this.filterText,
            pageNumber: this.pageOptions.pageNumber,
            pageSize: this.pageOptions.pageSize,
            sort: 'NormalizedName',
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
        this.modal.onSubmittedAndClosed.subscribe(() => this.refreshData());
    }

}
