import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../../app/mg-shared/animations/fadeInAnimation';
import {smoothHeight} from '../../../app/mg-shared/animations/smooth-height-anim.directive';
import {ManageRoleApiService} from '../../services/manage-role-api.service';
import {GetRolesResponse, RoleDto} from '../../models/role.model';
import {IdName} from '../../../app/models/timetable-records/timetable-record.view.model';
import {UserService} from '../../../app/services/user.service';

@Component({
  selector: 'mg-manage-permissions-page',
  templateUrl: './manage-permissions-page.component.html',
  styleUrls: ['./manage-permissions-page.component.scss'],
  animations: [
    fadeInAnimation,
    smoothHeight
  ],
  providers: [
    ManageRoleApiService
  ]
})
export class ManagePermissionsPageComponent implements OnInit {

  data: GetRolesResponse;
  currentRowIndex: number = -1;
  hasEditPerm: boolean = true;

  constructor(
      private readonly roleApiService: ManageRoleApiService,
      private readonly userService: UserService
  ) {
  }


  ngOnInit(): void {
    this.refreshData();
    this.userService.hasPermission('Permission.Role.Create').subscribe(hasPerm => this.hasEditPerm = hasPerm);
  }

  refreshData() {
    this.roleApiService.get().subscribe(data => this.data = data);
  }

  save() {
    this.roleApiService.save(this.data.roles)
        .pipe()
        .subscribe(() => {
          this.refreshData();
          this.userService.refreshProfile();
        });
  }

  changePermission(perm: IdName, role: RoleDto) {
    if (this.hasEditPerm) {
      if (role.permissions.includes(perm.id)) {
        role.permissions = role.permissions.filter(p => p != perm.id);
      } else {
        role.permissions.push(perm.id);
      }
    }

  }
}
