import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderVm} from '../../../models/order.model';
import {FormBuilder} from '@angular/forms';
import {mgConfirm, mgOnEvent, mgSuccessNotification, UiKit} from '../../../../app/utils/ui-kit';
import {DatePipe} from '@angular/common';
import {ManageOrderApiService} from '../../../services/manage-order-api.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'mg-order-details-modal',
    templateUrl: './order-details-modal.component.html',
    styleUrls: ['./order-details-modal.component.scss'],
    providers: [
        DatePipe,
        ManageOrderApiService
    ]
})
export class OrderDetailsModalComponent implements OnInit, AfterViewInit {

    readonly id: string = 'order-details-modal';
    form = this.fb.group({
        'id': [''],
        'name': [''],
        'phoneNumber': [''],
        'email': [''],
        'isParent': [''],
        'createdTime': [''],
        'processed': [''],
        'location': [''],
        'section': [''],
        'master': [''],
    });
    private modal: any;

    @Output() onChanged: EventEmitter<void> = new EventEmitter<void>();
    @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
    isEditMode: boolean = false;

    constructor(
        private readonly fb: FormBuilder,
        private readonly datePipe: DatePipe,
        private readonly orderService: ManageOrderApiService
    ) {
    }

    displayDetails(order: OrderVm) {
        this.form.reset({
            ...order,
            createdTime: this.datePipe.transform(order.createdTime + 'Z', 'dd-MM-yyyy HH:mm')
        } as OrderVm);
        this.isEditMode = !!this.form.value.id;
        this.modal.show();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.modal = UiKit.modal('#' + this.id);
        mgOnEvent('#' + this.id, 'hidden').subscribe(() => {
            this.onClose.emit();
        })
    }

    closeOrder() {
        this.orderService.markAsProcessed(this.form.value.id)
            .subscribe(() => {
                mgSuccessNotification(`<span uk-icon="check" class="uk-margin-small-right"></span> Форма оброблена`);
                this.onChanged.emit();
                this.close();
            });
    }

    close() {
        this.modal.hide();
    }

    delete() {
        mgConfirm('Видалити форму?')
            .pipe(
                switchMap(() => this.orderService.delete(this.form.value.id))
            )
            .subscribe(() => {
                mgSuccessNotification(`<span uk-icon="check" class="uk-margin-small-right"></span> Форма видалена`);
                this.onChanged.emit();
                this.close();
            });
    }
}
