import {Injectable} from '@angular/core';
import {ApiService} from '../../app/services/api.service';
import {Observable} from 'rxjs';
import {IdName} from '../../app/models/timetable-records/timetable-record.view.model';
import {TournamentEditModel, TournamentResult} from '../../app/pages/news-page/news-details/news-details.component';
import {TournamentApiService} from '../../app/services/tournament-api.service';

@Injectable({
    providedIn: 'root'
})
export class ManageTournamentApiService extends TournamentApiService {

    constructor(
        protected readonly api: ApiService
    ) {
        super(api);
    }


    getStudents(request: TournamentStudentRequest): Observable<IdName[]> {
        return this.api.post<IdName[]>(this.serviceUrl + '/students', request);
    }

    addResult(id: string, request: TournamentResult) {
        return this.api.post<IdName[]>(this.serviceUrl + `/${id}` + '/result', request);
    }

    deleteResult(tournamentId: string, tournamentResultId: string) {
        return this.api.delete(this.serviceUrl + `/${tournamentId}/result/${tournamentResultId}`);
    }

    addTournament(request: TournamentEditModel): Observable<TournamentEditModel> {
        return this.api.post<TournamentEditModel>(this.serviceUrl, request);
    }

    deleteTournament(id: string) {
        return this.api.delete(this.serviceUrl + `/${id}`);
    }
}

interface TournamentStudentRequest {
    except: string[];
    filterText: string;
}
