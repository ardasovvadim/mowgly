import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScheduleRoutingModule} from './schedule-routing.module';
import {ScheduleComponent} from './schedule.component';
import {SharedAdminModule} from "../../shared-admin/shared-admin.module";
import {ManageTimeslotModalComponent} from "./components/manage-timeslot-modal/manage-timeslot-modal.component";
import {MgSharedModule} from "../../../app/mg-shared/mg-shared.module";
import { ScheduleBoardViewComponent } from './components/schedule-board-view/schedule-board-view.component';


@NgModule({
    declarations: [
        ScheduleComponent,
        ManageTimeslotModalComponent,
        ScheduleBoardViewComponent
    ],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        MgSharedModule,
        SharedAdminModule,
    ]
})
export class ScheduleModule {
}
