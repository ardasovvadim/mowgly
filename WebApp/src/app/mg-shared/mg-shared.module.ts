import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {FrameGalleryComponent} from './components/frame-gallery/frame-gallery.component';
import {HeaderComponent} from './components/header/header.component';
import {IconComponent} from './components/icon/icon.component';
import {ImageGalleryComponent} from './components/image-gallery/image-gallery.component';
import {LinkedAccordionComponent} from './components/linked-accordion/linked-accordion.component';
import {MasterCardComponent} from './components/master-card/master-card.component';
import {MasterSliderComponent} from './components/master-slider/master-slider.component';
import {MessageModalComponent} from './components/message-modal/message-modal.component';
import {ModalWrapperComponent} from './components/modal-wrapper/modal-wrapper.component';
import {TimetableRecordModalComponent} from './components/timetable-record-modal/timetable-record-modal.component';
import {ModalWrapperDirective} from './directives/modal-wrapper.directive';
import {SettingValuePipe} from './pipes/setting-value.pipe';
import {InterpolationPipe} from './pipes/interpolation.pipe';
import {ImagePipe} from './pipes/image.pipe';
import {ContainsSettingPipe} from './pipes/setting-contains.pipe';
import {LocationCardComponent} from './components/location-card/location-card.component';
import {PxPipe} from './pipes/px.pipe';
import {FioPipe} from './pipes/fio.pipe';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {FastCallComponent} from './components/fast-call/fast-call.component';
import {FastCallModalComponent} from './components/fast-call/fast-call-modal/fast-call-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TimetableRecordTableComponent} from './components/timetable-record-table/timetable-record-table.component';
import {NewsTextBlockComponent} from './components/news/news-text-block/news-text-block.component';
import {SafeUrlPipe} from './pipes/safe-url.pipe';
import {SortedPipe} from './pipes/sorted.pipe';
import {NewsTournamentTableComponent} from './components/news/news-tournament-table/news-tournament-table.component';
import {NewsImageBlockComponent} from './components/news/news-image-block/news-image-block.component';
import {BgComponent} from './components/bg/bg.component';
import {RouterModule} from '@angular/router';
import {NewsPageComponent} from '../pages/news-page/news-page.component';
import {AutocompleteInputComponent} from './components/autocomplete-input/autocomplete-input.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {LoadingDirective} from './directives/loading.directive';
import {PaginationComponent} from './components/pagination/pagination.component';
import {SmoothHeightAnimDirective} from './animations/smooth-height-anim.directive';
import {ListPipe} from './pipes/list.pipe';
import {HasErrorPipe} from './pipes/has-error.pipe';
import {UserAvatarComponent} from './components/user-avatar/user-avatar.component';
import {GoogleLoginComponent} from './components/google-login/google-login.component';
import {ToUtcPipe} from './pipes/to-utc.pipe';
import {AngularCropperjsModule} from 'angular-cropperjs';
import {ImageCroppModalComponent} from './components/image-cropp-modal/image-cropp-modal.component';
import {ListErrorsComponent} from './components/list-errors/list-errors.component';
import {LoaderComponent} from './components/loader/loader.component';
import {AddImageModalComponent} from './components/add-image-modal/add-image-modal.component';
import {QuillEditorComponent} from './components/quill-editor/quill-editor.component';
import { FooterContactsComponent } from './components/footer-contacts/footer-contacts.component';

const components: any[] = [
    FooterComponent,
    FrameGalleryComponent,
    HeaderComponent,
    IconComponent,
    ImageGalleryComponent,
    LinkedAccordionComponent,
    MasterCardComponent,
    MasterSliderComponent,
    MessageModalComponent,
    ModalWrapperComponent,
    TimetableRecordModalComponent,
    ModalWrapperDirective,
    SettingValuePipe,
    InterpolationPipe,
    ImagePipe,
    ContainsSettingPipe,
    LocationCardComponent,
    BgComponent,
    NewsPageComponent,
    ImageCroppModalComponent,
    LoadingDirective,
    AddImageModalComponent,
    QuillEditorComponent
];

@NgModule({
    declarations: [
        ...components,
        PxPipe,
        FioPipe,
        SafeHtmlPipe,
        FastCallComponent,
        FastCallModalComponent,
        TimetableRecordTableComponent,
        NewsTextBlockComponent,
        SafeUrlPipe,
        SortedPipe,
        NewsTournamentTableComponent,
        NewsImageBlockComponent,
        AutocompleteInputComponent,
        ConfirmDialogComponent,
        PaginationComponent,
        SmoothHeightAnimDirective,
        ListPipe,
        HasErrorPipe,
        UserAvatarComponent,
        GoogleLoginComponent,
        ToUtcPipe,
        ListErrorsComponent,
        LoaderComponent,
        FooterContactsComponent,
    ],
    exports: [
        // ---
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        AngularCropperjsModule,
        // ---
        ...components,
        PxPipe,
        FioPipe,
        FastCallComponent,
        TimetableRecordTableComponent,
        SafeHtmlPipe,
        SafeUrlPipe,
        SortedPipe,
        NewsTournamentTableComponent,
        NewsImageBlockComponent,
        AutocompleteInputComponent,
        PaginationComponent,
        SmoothHeightAnimDirective,
        ListPipe,
        HasErrorPipe,
        GoogleLoginComponent,
        ToUtcPipe,
        AngularCropperjsModule,
        ListErrorsComponent,
        UserAvatarComponent,
        FooterContactsComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        AngularCropperjsModule,
    ]
})
export class MgSharedModule {
}
