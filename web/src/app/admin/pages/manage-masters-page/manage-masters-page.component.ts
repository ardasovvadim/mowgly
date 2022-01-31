import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MasterVm} from '../../../models/masterVm';
import {ManageMasterService} from '../../services/manage-master.service';
import {ModalService} from '../../../services/modal.service';
import {ManageMasterModalComponent} from './manage-master-modal/manage-master-modal.component';
import {MasterEditModel} from '../../models/master-edit-model';
import {MasterSearchCriteria} from '../../../models/masters/master-search-criteria.request';

@Component({
  selector: 'mg-manage-masters-page',
  templateUrl: './manage-masters-page.component.html',
  styleUrls: ['./manage-masters-page.component.scss'],
  providers: [ManageMasterService]
})
export class ManageMastersPageComponent implements OnInit, OnDestroy {

  $masters: Observable<MasterVm[]>
  private modal: ManageMasterModalComponent | null = null;

  constructor(private manageMasterService: ManageMasterService,
              private modalService: ModalService) {
    const request = new MasterSearchCriteria();
    this.$masters = manageMasterService.getCardMasters(request);
  }

  ngOnInit(): void {
    this.modalService
      .createModal<ManageMasterModalComponent>({type: ManageMasterModalComponent})
      .subscribe(modal => {
        this.modal = modal;
        // const master = new MasterVm();
        // master.id = 'C904A5E6-5057-4E8E-9FB0-12FD80211CB9';
        // this.openEditDialog(master);
      });
  }

  openEditDialog(master: MasterVm) {
    this.manageMasterService
      .getEditModel(master.id)
      .subscribe(master => {
        if (this.modal != null) {
          this.modal.displayEditMaster(master);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.modal != null)
      this.modalService.deleteModal(this.modal);
  }

  addNew() {
    this.modal?.displayEditMaster(new MasterEditModel(), false);
  }
}
