import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ModalService} from '../../../app/services/modal.service';
import {SectionEditModel} from '../../../app/models/sections/section.view.model';
import {ManageSectionModalComponent} from './manage-section-modal/manage-section-modal.component';

@Component({
    selector: 'mg-manage-sections-page',
    templateUrl: './manage-sections-page.component.html',
    styleUrls: ['./manage-sections-page.component.scss']
})
export class ManageSectionsPageComponent implements OnInit, OnDestroy {

    data: SectionEditModel[];
    modal: ManageSectionModalComponent;
    nameFiltering: string;
    subscriptions: Subscription[] = [];

    constructor(
        private modalService: ModalService) {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
        if (this.modal != null)
            this.modalService.deleteModal(this.modal);
    }

    ngOnInit(): void {
        this.refreshData();
        this.createEditModal();
    }

    addNew() {
        this.modal?.show({} as SectionEditModel);
    }

    edit(obj: SectionEditModel) {
        this.modal?.show(obj);
    }

    private refreshData() {
        this.data = [
            {
                id: '1',
                name: 'Section 1',
                cardHeader: 'Header',
                cardDescription: 'cardDescription',
                cardOrder: 'cardOrder',
                cardColumn: 'cardColumn'
            } as SectionEditModel,
            {
                id: '2',
                name: 'Section 2',
            } as SectionEditModel,
            {
                id: '3',
                name: 'Section 3',
            } as SectionEditModel
        ];
    }

    private createEditModal() {
        this.modalService
            .createModal<ManageSectionModalComponent>({type: ManageSectionModalComponent})
            .subscribe(modal => {
                this.modal = modal;
                if (this.modal) {
                    const sub = this.modal.onSubmittedAndClosed.subscribe(_ => this.refreshData());
                    this.subscriptions.push(sub);
                    this.modal.close()
                }
            });
    }
}
