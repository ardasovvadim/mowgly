import {NgModule} from '@angular/core';

import {NewsRoutingModule} from './news-routing.module';
import {MgSharedModule} from "../../mg-shared/mg-shared.module";
import { NewsFeedComponent } from './pages/news-feed/news-feed.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';


@NgModule({
    declarations: [
        NewsFeedComponent,
        NewsDetailsComponent
    ],
    imports: [
        MgSharedModule,
        NewsRoutingModule
    ]
})
export class NewsModule {
}
