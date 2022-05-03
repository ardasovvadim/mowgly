import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseApiUrl: string = environment.baseApiLinks;

  constructor(private httpClient: HttpClient) {

  }

  public get<T>(link: string): Observable<T> {
    return this.httpClient.get(`${this.baseApiUrl}/${link}`).pipe(map(obj => obj as T));
  }

  public post<T>(link: string, body: any): Observable<T> {
    return this.httpClient.post(`${this.baseApiUrl}/${link}`, body).pipe(map(obj => obj as T));
  }

  delete<T>(link: string): Observable<T> {
    return this.httpClient.delete(`${this.baseApiUrl}/${link}`).pipe(map(obj => obj as T));
  }
}
