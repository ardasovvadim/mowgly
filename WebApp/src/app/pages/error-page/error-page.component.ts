import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'mg-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

    errors: MgError[] = [
        {code: '404', text: 'Страница не найдена = ('},
        {code: '403', text: 'Доступ запрещен = ('},
        {code: '???', text: 'Произошла ошибка = ('},
    ]

    error: MgError;

    constructor(
        private readonly activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        const code = this.activatedRoute.snapshot.data['code'];
        const error = this.errors.find(e => e.code == code);
        this.error = error ?? this.errors.find(e => e.code = '???');
    }

}

export interface MgError {
    code: string;
    text: string;
}
