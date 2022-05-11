import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageOptions} from '../../../models/page';

@Component({
    selector: 'mg-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    options2: PageOptions = null;

    @Input() set pageOptions(value: PageOptions) {
        this.options2 = {...value};
    }

    @Output() onPageChanged: EventEmitter<PageOptions> = new EventEmitter<PageOptions>();

    get pages(): number[] {
        if (this.options2 == null)
            return [];

        return new Array(this.pagesAmount).fill(0).map((_, i) => i + 1);
    }

    get pagesAmount(): number {
        if (this.options2 == null)
            return 0;

        return this.options2.pageSize > 0
            ? Math.ceil(this.options2.count / this.options2.pageSize)
            : 0;
    }

    get isNextPageAvailable(): boolean {
        if (this.options2 == null)
            return false;

        return (this.options2.pageNumber * this.options2.pageSize) + this.options2.pageSize < this.options2.count
    }

    get isPreviousPageAvailable(): boolean {
        if (this.options2 == null)
            return false;

        return this.options2.pageNumber > 0;
    }

    constructor() {
    }

    ngOnInit(): void {
    }

    nextPage() {
        if (this.isNextPageAvailable)
            this.onPageChanged.emit({...this.options2, pageNumber: ++this.options2.pageNumber})
    }

    previousPage() {
        if (this.isPreviousPageAvailable)
            this.onPageChanged.emit({...this.options2, pageNumber: --this.options2.pageNumber})
    }

    toPage(page: number) {
        this.onPageChanged.emit({...this.options2, pageNumber: page-1})
    }
}
