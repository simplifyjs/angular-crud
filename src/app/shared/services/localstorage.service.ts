import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  public setLocal(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  public getLocal(key: string) {
    let localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : [];
  }
}
