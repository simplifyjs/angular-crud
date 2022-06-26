import { Category } from './../../../models/category.model';
import { Product } from './../../../models/product.model';
import { ProductsService } from './../../../shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<Product>;
  categories: Category[] = [];

  constructor (
    private activateRoute: ActivatedRoute,
    private productSvc: ProductsService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      this.product$ = this.productSvc.getProduct(params.id);
    });
  }

}
