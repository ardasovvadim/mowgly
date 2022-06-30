import {Component, ViewChild} from '@angular/core';
import {finalize, tap} from 'rxjs';
import {ManageMasterApiService} from '../../services/manage-master-api.service';
import {AdminMasterVm} from '../../models/master-edit-model';
import {toSortOrder} from '../../../app/services/events-api.service';
import {PaginationComponent} from '../../../app/mg-shared/components/pagination/pagination.component';
import {PageOptions} from '../../../app/models/page';
import {UntilDestroy} from '@ngneat/until-destroy';
import {fadeInAnimation} from '../../../app/mg-shared/animations/fadeInAnimation';
import {smoothHeight} from '../../../app/mg-shared/animations/smooth-height-anim.directive';
import {OptionsApiService} from '../../../app/services/options-api.service';
import {IdName} from '../../../app/models/timetable-records/timetable-record.view.model';

@UntilDestroy()
@Component({
    selector: 'mg-manage-masters-page',
    templateUrl: './manage-masters-page.component.html',
    styleUrls: ['./manage-masters-page.component.scss'],
    animations: [
        fadeInAnimation,
        smoothHeight
    ],
    providers: [
        ManageMasterApiService,
        OptionsApiService
    ]
})
export class ManageMastersPageComponent {

    @ViewChild('pagination') pagination: PaginationComponent;

    filterText: any;
    data: AdminMasterVm[];
    currentRowIndex: number;

    asc: boolean = false;
    private readonly initialPageOptions = {
        count: 0,
        pageSize: 10,
        pageNumber: 0
    }
    pageOptions: PageOptions = {...this.initialPageOptions};
    sectionFilter: string = null;
    sections: IdName[] = [];
    loading = false;

    constructor(
        private manageMasterService: ManageMasterApiService,
        private readonly optionsApiService: OptionsApiService,
    ) {
        this.refreshData();
        this.optionsApiService
            .getSectionOptions(null)
            .subscribe(data => this.sections = data);
    }

    refreshData() {
        this.loading = true;
        this.manageMasterService.getList({
            filterText: this.filterText,
            sectionId: this.sectionFilter,
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
            });
    }

    reset() {
        this.filterText = null;
        this.sectionFilter = null;
        this.pageOptions = {...this.initialPageOptions};
        this.refreshData();
    }
}
