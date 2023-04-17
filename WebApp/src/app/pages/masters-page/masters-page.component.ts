import {Component, OnInit, ViewChild} from '@angular/core';
import {fadeInAnimation} from '../../mg-shared/animations/fadeInAnimation';
import {smoothHeight} from '../../mg-shared/animations/smooth-height-anim.directive';
import {EventsApiService, toSortOrder} from '../../services/events-api.service';
import {EventVm} from '../../models/events/event-vm';
import {PaginationComponent} from '../../mg-shared/components/pagination/pagination.component';
import {PageOptions} from '../../models/page';
import {Router} from '@angular/router';
import {delay, finalize, tap} from 'rxjs';
import {MasterApiService} from '../../services/master-api.service';
import {MasterSearchCriteria} from '../../models/masters/master-search-criteria.request';
import {MasterVm} from '../../models/masterVm';
import {MgOptions, OptionsApiService} from '../../services/options-api.service';

@Component({
    selector: 'mg-masters-page',
    templateUrl: './masters-page.component.html',
    styleUrls: ['./masters-page.component.scss'],
    animations: [
        fadeInAnimation,
        smoothHeight
    ],
    providers: [
        MasterApiService,
        OptionsApiService
    ]
})
export class MastersPageComponent implements OnInit {


    filterText: string;
    asc: boolean = false;
    data: MasterVm[];

    @ViewChild('pagination') pagination: PaginationComponent;

    private readonly initialPageOptions = {
        count: 0,
        pageSize: 9,
        pageNumber: 0
    }

    pageOptions: PageOptions = {...this.initialPageOptions};
    loading: boolean = false;
    filteringCity: string = null;
    filteringSection: string = null;
    options: MgOptions = null;

    constructor(
        private readonly apiService: MasterApiService,
        private readonly router: Router,
        private readonly optionsApiService: OptionsApiService
    ) {
    }

    ngOnInit(): void {
        this.refreshData();

        this.optionsApiService.getOptions({
            cities: true,
            sections: true
        }).subscribe(options => this.options = options);
    }

    refreshData() {
        this.loading = true;
        this.apiService.getCardMastersPage({
            filterText: this.filterText,
            city: this.filteringCity,
            section: this.filteringSection,
            pageNumber: this.pageOptions.pageNumber,
            pageSize: this.pageOptions.pageSize,
            sort: 'NormalizedName',
            sortOrder: toSortOrder(this.asc)
        } as MasterSearchCriteria)
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
        this.filteringCity = null;
        this.filteringSection = null;
        this.pageOptions = {...this.initialPageOptions};
        this.refreshData();
    }
    
}
