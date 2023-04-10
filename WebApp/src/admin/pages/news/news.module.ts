import {NgModule} from '@angular/core';

import {NewsRoutingModule} from './news-routing.module';
import {MgSharedModule} from "../../../app/mg-shared/mg-shared.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CkEditorComponent} from './components/ck-editor/ck-editor.component';
import {ManageNewsPageComponent} from "./pages/manage-news-page/manage-news-page.component";
import {
    ManageNewsDescriptionPageComponent
} from "./pages/manage-news-description-page/manage-news-description-page.component";
import {
    ManageNewsImageCoverModalComponent
} from "./components/manage-news-image-cover-modal/manage-news-image-cover-modal.component";
import {ManageNewsVideoModalComponent} from "./components/manage-news-video-modal/manage-news-video-modal.component";
import {ManageBlockComponent} from "./components/manage-block/manage-block.component";
import {SharedAdminModule} from "../../shared-admin/shared-admin.module";
import {UnsupportedTypePipe} from './pipes/unsupported-type.pipe';


@NgModule({
    declarations: [
        CkEditorComponent,
        ManageNewsPageComponent,
        ManageNewsDescriptionPageComponent,
        ManageNewsImageCoverModalComponent,
        ManageNewsVideoModalComponent,
        ManageBlockComponent,
        UnsupportedTypePipe
    ],
    imports: [
        NewsRoutingModule,
        MgSharedModule,
        SharedAdminModule,
        CKEditorModule,
    ]
})
export class NewsModule {
}
