import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {tap} from 'rxjs';
import {ManageSectionModalComponent} from './manage-section-modal/manage-section-modal.component';
import {PageOptions} from '../../../app/models/page';
import {toSortOrder} from '../../../app/services/events-api.service';
import {ManageSectionApiService} from '../../services/manage-section-api.service';
import {AdminSectionVm} from '../../models/section.model';
import {fadeInAnimation} from '../../../app/mg-shared/animations/fadeInAnimation';
import {smoothHeight} from '../../../app/mg-shared/animations/smooth-height-anim.directive';
import {SectionVm} from '../../../app/models/sections/section.view.model';

@Component({
    selector: 'mg-manage-sections-page',
    templateUrl: './manage-sections-page.component.html',
    styleUrls: ['./manage-sections-page.component.scss'],
    providers: [
        ManageSectionApiService
    ],
    animations: [
        fadeInAnimation,
        smoothHeight
    ]
})
export class ManageSectionsPageComponent implements OnInit, AfterViewInit {

    @ViewChild('modal') modal: ManageSectionModalComponent;

    data: AdminSectionVm[];
    filterText: string;
    currentRowIndex: number = -1;

    asc: boolean = false;
    private readonly initialPageOptions = {
        count: 0,
        pageSize: 10,
        pageNumber: 0
    }
    pageOptions: PageOptions = {...this.initialPageOptions};

    constructor(
        private readonly sectionApi: ManageSectionApiService) {
    }

    ngOnInit(): void {
        this.refreshData();
    }

    create() {
        this.modal.show({} as SectionVm);
    }

    edit(obj: AdminSectionVm) {
        this.sectionApi.getById(obj.id)
            .subscribe(data => this.modal.show(data))
    }

    refreshData() {
        this.sectionApi.getList({
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
            )
            .subscribe(data => {
                this.data = data.elements;
            });
    }

    ngAfterViewInit(): void {
        this.modal.onClosed.subscribe(_ => this.refreshData());
    }
}
