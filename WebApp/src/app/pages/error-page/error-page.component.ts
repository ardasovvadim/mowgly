import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterState, RouterStateSnapshot} from '@angular/router';

@Component({
    selector: 'mg-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

    errors: MgError[] = [
        {code: '404', text: 'Сторінка не знайдена = ('},
        {code: '403', text: 'Доступ заборонено = ('},
        {code: '???', text: 'Виникла невідома помилка = ('},
    ]

    error: MgError;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) {
        const mgError = this.router.getCurrentNavigation()?.extras?.state as MgError;
        if (mgError && mgError.text && mgError.code) {
            this.error = mgError;
        }
    }

    ngOnInit(): void {
        if (!this.error) {
            this.activatedRoute.data.subscribe(data => {
                const code = data['code'];
                const error = this.errors.find(e => e.code == code);
                this.error = error ?? this.errors.find(e => e.code == '???');
            });
        }
    }

}

export interface MgError {
    code: string;
    text: string;
}
