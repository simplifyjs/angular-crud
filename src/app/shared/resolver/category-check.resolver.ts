import { LocalstorageService } from './../services/localstorage.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryCheckResolver implements Resolve<boolean> {
  constructor (
    private localStorageSvc: LocalstorageService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const localItems = this.localStorageSvc.getLocal('categories');
    return of(localItems);
  }
}
