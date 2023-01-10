import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {fadeInAnimation} from '../../../../../app/mg-shared/animations/fadeInAnimation';
import {smoothHeight} from '../../../../../app/mg-shared/animations/smooth-height-anim.directive';
import {PageOptions} from '../../../../../app/models/page';
import {toSortOrder} from '../../../../../app/services/events-api.service';
import {finalize, tap} from 'rxjs';
import {ManageNewsApiService} from '../../../../services/manage-news-api.service';
import {AdminNewsVm} from '../../../../models/news.model';

@Component({
    selector: 'mg-manage-news-page',
    templateUrl: './manage-news-page.component.html',
    styleUrls: ['./manage-news-page.component.scss'],
    providers: [
      ManageNewsApiService
    ],
    animations: [
        fadeInAnimation,
        smoothHeight
    ],
})
export class ManageNewsPageComponent implements OnInit {

    filterText: string;
    filterDate: string;

    data: AdminNewsVm[];
    currentRowIndex: number = -1;

    asc: boolean = false;
    private readonly initialPageOptions = {
        count: 0,
        pageSize: 10,
        pageNumber: 0
    }
    pageOptions: PageOptions = {...this.initialPageOptions};
    loading = false;


    constructor(
        private readonly manageNewsApiService: ManageNewsApiService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {
    }


    ngOnInit(): void {
        this.refreshData();
    }

    refreshData() {
        this.loading = true;
        this.manageNewsApiService.getList({
            publishedDate: this.filterDate,
            filterText: this.filterText,
            pageNumber: this.pageOptions.pageNumber,
            pageSize: this.pageOptions.pageSize,
            sort: 'PublishedDate',
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
        this.filterDate = null;
        this.pageOptions = {...this.initialPageOptions};
        this.refreshData();
    }

    add() {
        this.router.navigate(['new'], {relativeTo: this.activatedRoute});
    }

    edit(id: string) {
        this.router.navigate([id], {relativeTo: this.activatedRoute})
    }
}
