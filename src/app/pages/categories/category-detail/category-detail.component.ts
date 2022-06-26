import { Product } from './../../../models/product.model';
import { ProductsService } from './../../../shared/services/products.service';
import { Category } from './../../../models/category.model';
import { CategoriesApiService } from './../../../shared/services/categories-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  categorySub!: Subscription;
  category$!: Observable<Category>;
  categoryID!: number;
  products$!: Observable<Product[]>;

  constructor (
    private activateRoute: ActivatedRoute,
    private categorySvc: CategoriesApiService,
    private productSvc: ProductsService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      this.categoryID = parseInt(params.id);
      this.category$ = this.categorySvc.getCategory(params.id);
      this.setProductsFromCategory();
    });
  }

  private setProductsFromCategory() {
    this.products$ = this.productSvc.getProducts()
      .pipe(
        switchMap((products: Product[]) => {
          const filteredProd = products.filter((prod: any) => {
            const catIds = prod.categories.map((item: any) => item.id);
            if (catIds.includes(this.categoryID)) return prod;

          });
          return of(filteredProd);
        })
      );
  }

}
