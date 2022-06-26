import { SharedModule } from './../../../shared/shared.module';
import { ProductFormComponent } from './product-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductFormComponent
  }
];

@NgModule({
  declarations: [ProductFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
})
export class ProductFormModule { }
