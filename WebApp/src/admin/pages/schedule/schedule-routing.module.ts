import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
import {AuthorizeGuard} from "../../../app/guards/authorize.guard";
import {PermissionGuard} from "../../../app/guards/permission.guard";

const routes: Routes = [
    {
      path: '',
      component: ScheduleComponent,
      canActivate: [AuthorizeGuard, PermissionGuard],
      data: {permissions: ['Permission.TimetableRecord.Get']}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
