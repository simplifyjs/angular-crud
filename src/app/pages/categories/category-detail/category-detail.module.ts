import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryDetailComponent } from './category-detail.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    component: CategoryDetailComponent
  }
];

@NgModule({
  declarations: [
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
  ],
  exports: [RouterModule],
})
export class CategoryDetailModule { }
