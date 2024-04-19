import {NgModule} from '@angular/core';
import {MgSharedModule} from "../../app/mg-shared/mg-shared.module";
import {
    ChooseOrCreateEventModalComponent
} from "./components/choose-or-create-event-modal/choose-or-create-event-modal.component";
import {ManageTextHtmlModalComponent} from "./components/manage-text-html-modal/manage-text-html-modal.component";
import {ManageTextLineComponent} from "./components/manage-text-line/manage-text-line.component";
import {ManageTournamentModalComponent} from "./components/manage-tournament-modal/manage-tournament-modal.component";
import {
    ManageTournamentResultModalComponent
} from "./components/manage-tournament-result-modal/manage-tournament-result-modal.component";
import {ManageTournamentTableComponent} from "./components/manage-tournament-table/manage-tournament-table.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {TimetableSlotComponent} from "./components/timetable-slot/timetable-slot.component";
import {ManageModalComponent} from "./components/manage-modal/manage-modal.component";
import {ManageEventModalComponent} from "./components/manage-event-modal/manage-event-modal.component";
import {MgIfPermDirective} from "./directives/mg-if-perm.directive";
import {ConcatUserTypesPipe} from "./pipes/concat-user-types.pipe";
import {HasFlagPipe} from "./pipes/has-flag.pipe";
import { RibbonToolbarComponent } from './components/ribbon-toolbar/ribbon-toolbar.component';

const declarations = [
    ChooseOrCreateEventModalComponent,
    ManageModalComponent,
    ManageTextHtmlModalComponent,
    ManageTextLineComponent,
    ManageTournamentModalComponent,
    ManageTournamentResultModalComponent,
    ManageTournamentTableComponent,
    NavigationComponent,
    TimetableSlotComponent,
    ManageEventModalComponent,
    MgIfPermDirective,
    ConcatUserTypesPipe,
    HasFlagPipe
];

@NgModule({
    declarations: [
        ...declarations,
        RibbonToolbarComponent
    ],
    imports: [
        MgSharedModule
    ],
    exports: [
        ...declarations,
        RibbonToolbarComponent
    ]
})
export class SharedAdminModule {
}
