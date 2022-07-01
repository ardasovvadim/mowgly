import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import * as moment from 'moment';
import {
    NewsBlock,
    NewsBlockType,
    NewsDetailsVm,
    NewsImageBlock
} from '../../app/pages/news-page/news-details/news-details.component';
import {StorageService} from '../../app/services/storage.service';
import {
    ChooseOrCreateEventModalComponent
} from '../pages/manage-news-page/manage-news-description-page/componenets/choose-or-create-event-modal/choose-or-create-event-modal.component';
import {ManageNewsApiService} from './manage-news-api.service';
import {mgSuccessNotification} from '../../app/utils/ui-kit';

@Injectable()
export class NewsManageService {

    private readonly newsDataSub: BehaviorSubject<NewsDetailsVm> = new BehaviorSubject<NewsDetailsVm>({} as NewsDetailsVm);

    get $data(): Observable<NewsDetailsVm> {
        return this.newsDataSub.asObservable();
    }

    private get data(): NewsDetailsVm {
        return this.newsDataSub.value;
    }

    private get blocks(): NewsBlock[] {
        return this.data?.blocks;
    }

    private get isPublished(): boolean {
        return !!this.newsDataSub.value.id;
    }

    private get isEditMode(): boolean {
        return !this.data?.id;
    }

    private readonly saveKey = 'unsaved-article';

    createEventModal: ChooseOrCreateEventModalComponent;
    private savedBlockPosition = -1;

    constructor(
        private readonly storageService: StorageService,
        private readonly newsApiService: ManageNewsApiService
    ) {
    }

    blockUp(block: NewsBlock) {
        const currentIndex = this.blocks.indexOf(block);
        if (currentIndex == 0)
            return;
        this.blocks[currentIndex] = this.blocks[currentIndex - 1];
        this.blocks[currentIndex - 1] = block;

        this.saveState();
    }

    blockDown(block: NewsBlock) {
        const currentIndex = this.blocks.indexOf(block);
        if (currentIndex == this.blocks.length - 1)
            return;
        this.blocks[currentIndex] = this.blocks[currentIndex + 1];
        this.blocks[currentIndex + 1] = block;

        this.saveState();
    }

    deleteBlock(block: NewsBlock) {
        const index = this.blocks.indexOf(block);
        this.blocks.splice(index, 1);

        this.saveState();
    }

    // todo: animation in a future?
    addBlock(block: NewsBlock, type: NewsBlockType) {
        if (!this.blocks) {
            this.data.blocks = [];
        }

        const newBlock = {type, order: 0} as NewsBlock;
        const index = block ? this.blocks.indexOf(block) : -1;

        switch (type) {
            case NewsBlockType.Image: {
                const defaultImageBlockData = {
                    url: 'https://autosdutriomphe.fr/wp-content/uploads/2018/04/default-image.webp',
                    caption: 'Підпис'
                } as NewsImageBlock;
                newBlock.data = JSON.stringify(defaultImageBlockData);
                break;
            }
            case NewsBlockType.Text: {
                newBlock.data = `<p>Текст...</p>`
                break;
            }
            case NewsBlockType.Video: {
                newBlock.data = 'https://www.youtube.com/embed/bfoGTrtFc5g'
                break;
            }
            case NewsBlockType.TournamentResultsTable: {
                this.createEventModal.chooseEvent();
                this.savedBlockPosition = index;
                return;
            }
        }

        this.blocks.splice(index + 1, 0, newBlock);
        this.saveState();
    }

    getNews(id: string): Observable<NewsDetailsVm> {
        const data = id == 'new'
            ? of(this.storageService.get<NewsDetailsVm>(this.saveKey) ?? this.newData())
            : this.newsApiService.getNewsDetails(id)

        return data.pipe(
            tap(data => this.newsDataSub.next(data))
        )
    }

    saveState() {
        if (this.isEditMode) {
            this.storageService.set(this.saveKey, this.data);
            mgSuccessNotification(`<span uk-icon="check" class="uk-margin-small-right"></span> Дані збережені`);
        }
    }

    reset() {
        const data = this.newData();
        this.newsDataSub.next(data);
        this.saveState();
    }

    private newData = (): NewsDetailsVm => {
        return {
            title: 'Заголовок',
            description: 'Опис',
            // todo: not sure
            createdDate: moment().toISOString(),
        } as NewsDetailsVm;
    }

    addTournamentTableBlock(id: string) {
        if (!id)
            return;

        const index = this.savedBlockPosition == -1 ? -1 : this.savedBlockPosition;
        const newBlock = {type: NewsBlockType.TournamentResultsTable, order: 0, data: id} as NewsBlock;
        if (index == -1)
            this.blocks.push(newBlock);
        else
            this.blocks.splice(index + 1, 0, newBlock);

        this.saveState();
    }

    publish() {
        return this.newsApiService.addNews(this.data)
            .pipe(
                tap(() => {
                    if (this.isEditMode)
                        this.reset();
                })
            );
    }

    deleteNews() {
        return this.newsApiService.deleteNews(this.data.id);
    }
}
