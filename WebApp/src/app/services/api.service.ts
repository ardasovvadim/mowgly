import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  get baseApiUrl() {
    return this.baseUrl + 'api'
  }

  constructor(
    private readonly httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {

  }

  public get<T>(link: string, queryParams: HttpParams = null): Observable<T> {
    return this.httpClient.get(
        `${this.baseApiUrl}/${link}`,
        {
          params: queryParams
        }
    ).pipe(map(obj => obj as T));
  }

  public post<T>(link: string, body: any): Observable<T> {
    return this.httpClient.post(`${this.baseApiUrl}/${link}`, body).pipe(map(obj => obj as T));
  }

  delete<T>(link: string): Observable<T> {
    return this.httpClient.delete(`${this.baseApiUrl}/${link}`).pipe(map(obj => obj as T));
  }
}
