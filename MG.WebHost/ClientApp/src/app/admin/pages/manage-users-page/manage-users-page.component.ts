import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserEditModel} from '../../models/user-edit-model';
import {ModalService} from '../../../services/modal.service';
import {ManageUserModalComponent} from './manage-user-modal/manage-user-modal.component';

@Component({
  selector: 'mg-manage-users-page',
  templateUrl: './manage-users-page.component.html',
  styleUrls: ['./manage-users-page.component.scss']
})
export class ManageUsersPageComponent implements OnInit, OnDestroy {

  nameFiltering: string;

  data: UserEditModel[] = [
    {
      firstName: 'A',
      lastName: 'B',
      middleName: 'C',
      birthday: '10.07.2000',
      email: 'ardasovvadim@gmail.com',
      id: '1',
      phone: '+380951026860'
    },
    {
      id: '2',
      firstName: 'A2',
      lastName: 'B2',
      middleName: 'C2',
      birthday: '24.01.1998',
      email: 'testmail@gmail.com',
      phone: '+380576728765'
    }
  ];

  private modal: ManageUserModalComponent;

  constructor(
    private readonly modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.initializeModal();
  }

  addUser() {
    this.modal?.open();
  }

  refresh() {

  }

  private initializeModal() {
    this.modalService
      .createModal<ManageUserModalComponent>({type: ManageUserModalComponent})
      .subscribe(modal => {
        this.modal = modal;
        if (this.modal != null) {
          // const sub = this.modal.submittedAndClosed.subscribe(_ => this.refreshLocations());
          // this.subscriptions.push(sub);
          // this.modal.close()
        }
      });
  }

  ngOnDestroy(): void {
    this.modalService.deleteModal(this.modal);
  }
}
