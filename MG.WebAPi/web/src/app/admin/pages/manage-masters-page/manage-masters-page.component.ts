import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MasterVm} from '../../../models/masterVm';
import {ManageMasterService} from '../../services/manage-master.service';
import {ModalService} from '../../../services/modal.service';
import {ManageMasterModalComponent} from './manage-master-modal/manage-master-modal.component';
import {MasterEditModel} from '../../models/master-edit-model';
import {MasterSearchCriteria} from '../../../models/masters/master-search-criteria.request';
import {ActivatedRoute, Router} from '@angular/router';
import * as ClassicEditor from 'ckeditor/build/ckeditor';

@Component({
  selector: 'mg-manage-masters-page',
  templateUrl: './manage-masters-page.component.html',
  styleUrls: ['./manage-masters-page.component.scss'],
  providers: [ManageMasterService]
})
export class ManageMastersPageComponent implements OnInit, OnDestroy {

  public Editor = ClassicEditor;
  $masters: Observable<MasterVm[]>
  private modal: ManageMasterModalComponent | null = null;
  test: boolean = false;

  constructor(private manageMasterService: ManageMasterService,
              private modalService: ModalService,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute
              ) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        this.test = false;
        const request = new MasterSearchCriteria();
        this.$masters = this.manageMasterService.getCardMasters(request);
      }
      else {
        this.test = true;
      }
    });

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
    this.modal?.displayEditMaster({} as MasterEditModel, false);
  }

  goTest() {
    this.test = !this.test;
    if (this.test) {
      this.router.navigate(['admin', 'masters', '834df39b-0e2f-435b-9447-799c472612b1']);
    }
    else {
      this.router.navigate(['../']);
    }
  }
}
