import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
  },
  {
    path: 'new',
    loadChildren: () => import('./category-form/category-form.module').then(m => m.CategoryFormModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./category-detail/category-detail.module').then(m => m.CategoryDetailModule)
  },
  {
    path: ':id/edit',
    loadChildren: () => import('./category-form/category-form.module').then(m => m.CategoryFormModule)
  },

];

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
  providers: [MessageService]
})
export class CategoriesModule { }
