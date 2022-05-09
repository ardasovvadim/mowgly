import {Injectable} from '@angular/core';
import {MgOptions, OptionsApiService} from '../../app/services/options-api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {IdName} from '../../app/models/timetable-records/timetable-record.view.model';
import {map} from 'rxjs/operators';

@Injectable()
export class OptionsStorageService {

    private readonly _options: BehaviorSubject<MgOptions> = new BehaviorSubject<MgOptions>({})

    constructor(
        private readonly optionsApi: OptionsApiService
    ) {
        optionsApi
            .getOptions({sections: true, cities: true, locations: true})
            .subscribe(d => this._options.next(d));
    }

    get location(): Observable<IdName[]> {
        return this._options.asObservable().pipe(map(o => o?.locations ?? []));
    }

    get sections(): Observable<IdName[]> {
        return this._options.asObservable().pipe(map(o => o?.sections ?? []));
    }

    get cities(): Observable<IdName[]> {
        return this._options.asObservable().pipe(map(o => o?.cities ?? []));
    }

}
