import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRequest } from './../../enum/api.enum';
import { environment } from './../../../environments/environment';
import { Category } from './../../models/category.model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {
  private requestUrl = `${environment.endpoint}/${ApiRequest.CATEGORIES}`;

  private readonly _categoriesOneSource = new Subject<Category>();
  public categoriesSingle$ = this._categoriesOneSource.asObservable();

  private readonly _categoriesSource = new BehaviorSubject<Category[]>([]);
  public categoriesObs$ = this._categoriesSource.asObservable();

  private _categories: Category[] = [];

  constructor (
    private http: HttpClient,
    private localStorageSvc: LocalstorageService
  ) { }

  public addCategory(newItem: any) {
    return this.http.post<Category>(this.requestUrl, newItem)
      .pipe(
        tap((category) => {
          this._categories = this._categories.concat(category);
          this._categoriesSource.next(this._categories);
        })
      );
  }

  public editCategory(id: number, newItem: any) {
    return this.http.put<Category>(`${this.requestUrl}/${id}`, newItem)
      .pipe(
        tap((category) => {
          this._categoriesOneSource.next(category);
        })
      );
  }

  public deleteCategory(id: number) {
    return this.http.delete<Category>(`${this.requestUrl}/${id}`)
      .pipe(
        tap(() => {
          const filterCategories = this._categories.filter(category => category.id !== id);
          this._categoriesSource.next(filterCategories);
        })
      );
  }

  public getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.requestUrl}/${id}`)
      .pipe(
        tap((category) => {
          this._categoriesOneSource.next(category);
        })
      );
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.requestUrl)
      .pipe(
        tap((categories: Category[]) => {
          this.localStorageSvc.setLocal('categories', categories);
          this._categories = categories.slice();
          this._categoriesSource.next(this._categories);
        })
      );
  }

  public getCategoriesByRef(categories: number[]): Observable<Category[]> {
    const categoryObservable = categories.map((id: any) => this.getCategory(id));
    return forkJoin(categoryObservable);
  }

}
