import { CategoryCheckResolver } from './../../shared/resolver/category-check.resolver';
import { MessageService } from 'primeng/api';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'new',
    loadChildren: () => import('./product-form/product-form.module').then(m => m.ProductFormModule),
    resolve: {
      categoryOptions: CategoryCheckResolver
    }
  },
  {
    path: ':id',
    loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailModule),
  },
  {
    path: ':id/edit',
    loadChildren: () => import('./product-form/product-form.module').then(m => m.ProductFormModule),
    resolve: {
      categoryOptions: CategoryCheckResolver
    }
  },
];

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  exports: [RouterModule],
  providers: [MessageService]
})
export class ProductsModule { }
