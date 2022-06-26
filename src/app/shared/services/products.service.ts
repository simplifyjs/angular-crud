import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRequest } from './../../enum/api.enum';
import { environment } from './../../../environments/environment.prod';
import { Product } from './../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private requestUrl = `${environment.endpoint}/${ApiRequest.PRODUCTS}`;

  private readonly _productOneSource = new Subject<Product>();
  readonly productSingle$ = this._productOneSource.asObservable();

  private readonly _productSource = new BehaviorSubject<Product[]>([]);
  public productObs$ = this._productSource.asObservable();

  private _products: Product[] = [];
  constructor (
    private http: HttpClient
  ) { }

  public addProduct(newItem: any) {
    return this.http.post<Product>(this.requestUrl, newItem)
      .pipe(
        tap((product) => {
          this._products = this._products.concat(product);
          this._productSource.next(this._products);
        })
      );
  }
  public editProduct(id: number, newItem: any) {
    return this.http.put<Product>(`${this.requestUrl}/${id}`, newItem);
  }

  public deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.requestUrl}/${id}`)
      .pipe(
        tap(() => {
          const filteredProd = this._products.filter(product => {
            return product.id !== id;
          });
          this._productSource.next(filteredProd);
        })
      );
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.requestUrl}/${id}`)
      .pipe(
        tap((product) => {
          this._productOneSource.next(product);
        })
      );
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.requestUrl)
      .pipe(
        tap((products: Product[]) => {
          this._products = products.slice();
          this._productSource.next(this._products);
        })
      );
  }

}
