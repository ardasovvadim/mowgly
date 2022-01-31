import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public set(key: string, object: any) {
    const json = JSON.stringify(object);
    localStorage.setItem(key, json);
  }

  public get<T>(key: string): T {
    const item = localStorage.getItem(key) as string;
    return JSON.parse(item) as T;
  }

  public delete(key: string): void {
    localStorage.removeItem(key);
  }
}
