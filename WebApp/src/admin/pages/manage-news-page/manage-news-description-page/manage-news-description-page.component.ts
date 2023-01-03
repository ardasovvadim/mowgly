import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    NewsBlock,
    NewsBlockType,
    NewsDetailsVm
} from '../../../../app/pages/news-page/news-details/news-details.component';
import {NewsManageService} from '../../../services/news-manage.service';
import {filter, map, switchMap} from 'rxjs/operators';
import {
    ManageNewsImageCoverModalComponent
} from '../../../components/news/manage-news-image-cover-modal/manage-news-image-cover-modal.component';
import {
    ManageTextHtmlModalComponent
} from '../../../components/news/manage-text-html-modal/manage-text-html-modal.component';
import {
    ManageNewsVideoModalComponent
} from '../../../components/news/manage-news-video-modal/manage-news-video-modal.component';
import {mgConfirm, mgPrompt, mgSuccessNotification} from '../../../../app/utils/ui-kit';
import {ManageNewsApiService} from '../../../services/manage-news-api.service';
import {AddImageModalComponent} from '../../../../app/mg-shared/components/add-image-modal/add-image-modal.component';
import {
    ChooseOrCreateEventModalComponent
} from './componenets/choose-or-create-event-modal/choose-or-create-event-modal.component';

@Component({
    selector: 'mg-manage-news-description-page',
    templateUrl: './manage-news-description-page.component.html',
    styleUrls: ['./manage-news-description-page.component.scss'],
    providers: [
        ManageNewsApiService,
        NewsManageService,
    ]
})
export class ManageNewsDescriptionPageComponent implements OnInit, AfterViewInit, OnDestroy {

    data: NewsDetailsVm = {} as NewsDetailsVm;
    blockTypes = NewsBlockType;

    get isEditMode(): boolean {
        return !this.data?.id
    }

    @ViewChild('imageCoverModal') modalManageImage: ManageNewsImageCoverModalComponent;
    @ViewChild('textHtmlModal') modalManageTextHtml: ManageTextHtmlModalComponent;
    @ViewChild('videoModal') modalManageVideo: ManageNewsVideoModalComponent;
    @ViewChild('addImageModal') addImageModal: AddImageModalComponent;
    @ViewChild('addImageCoverModal') addImageCoverModal: AddImageModalComponent;
    @ViewChild('htmlElement') htmlElement: ElementRef;
    @ViewChild('createEventModal') createEventModal: ChooseOrCreateEventModalComponent;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly newsManageService: NewsManageService,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(
            map(params => params['id']),
            switchMap(id => this.newsManageService.getNews(id))
        )
            .subscribe({
                error: () => this.router.navigate(['/404'])
            });

        this.newsManageService.$data.subscribe(data => {
            // todo: delete
            console.log(data)
            this.data = data;
        });
    }

    ngAfterViewInit(): void {
        this.newsManageService.createEventModal = this.createEventModal;

        this.addImageCoverModal.onImageAdded.subscribe(imageDataUrl => {
            this.data.imageUrl = imageDataUrl;
            this.addImageCoverModal.close();
            this.saveResult();
        });

        this.modalManageImage.onImageSaved.subscribe(() => {
            this.saveResult();
            this.modalManageImage.close();
        });

        let tournamentId = null;
        this.createEventModal.onCreated
            .pipe(
                filter(id => !!id),
                switchMap(id => {
                    this.newsManageService.addTournamentTableBlock(id);
                    tournamentId = id;
                    return mgConfirm('Закрепить турнир за этой новостью?');
                })
            )
            .subscribe({
                next: () => {
                    this.data.tournamentId = tournamentId;
                    this.saveResult();
                },
                error: () => {}
            })
    }

    ngOnDestroy(): void {
        this.saveResult();
    }

    saveResult(): void {
        this.newsManageService.saveState();
    }

    reset() {
        this.newsManageService.reset();
    }

    editTextBlock(block: NewsBlock) {
        this.modalManageTextHtml.showTextHtml(block);
        const sub = this.modalManageTextHtml.onSubmittedAndClosed.subscribe(html => {
            if (html) {
                block.data = html;
                this.modalManageTextHtml.close();
            }

            this.saveResult();
            sub.unsubscribe();
        });
    }

    editImageCover() {
        this.addImageCoverModal.open()
    }

    editImageBlock(block: NewsBlock) {
        this.modalManageImage.showImageData(block);
    }

    editVideo(block: NewsBlock) {
        mgPrompt('Ссылка на видео', block.data)
            .subscribe(url => {
                if (url)
                    block.data = url;

                this.saveResult();
            });
    }

    publish() {
        mgConfirm('Опубликовать новость?')
            .pipe(
                switchMap(() => this.newsManageService.publish()),
            )
            .subscribe(data => {
                mgSuccessNotification(`<span uk-icon="check" class="uk-margin-small-right"></span> Новость была опубликована`)
                if (this.isEditMode)
                    this.router.navigate(['../', data.id], {relativeTo: this.route});
            })
    }

    delete() {
        mgConfirm('Вы уверены что хотите удалить новость?')
            .pipe(
                switchMap(() => this.newsManageService.deleteNews())
            )
            .subscribe({
                next: () => {
                    this.router.navigate(['../'], {relativeTo: this.route})
                },
                error: () => {}
            })
    }
}
