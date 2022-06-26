import { CategoriesApiService } from './../../shared/services/categories-api.service';
import { Category } from './../../models/category.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  title = 'Categories';
  categories$: Observable<Category[]> = of([]);
  categories: Category[] = [];
  categorySub!: Subscription;
  confirmMessage = {};
  deleteId!: number;

  constructor (
    private categorySvc: CategoriesApiService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initList();
    this.checkState();
  }

  public initList() {
    this.categorySub = this.categorySvc.getCategories()
      .subscribe(categoriesResult => {
        this.categories = categoriesResult;
      });
  }

  public checkState() {
    this.categories$ = this.categorySvc.categoriesObs$;
  }

  public onEdit(id: number): void {
    this.router.navigate(['/categories', id, 'edit']);
  }

  public onDelete(id: number): void {
    this.deleteId = id;
    this.showConfirm();
  }

  public showConfirm(): void {
    this.messageService.clear();
    this.confirmMessage = {
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure you want to delete this?',
      detail: 'Confirm to proceed'
    };
    this.messageService.add(this.confirmMessage);
  }

  ngOnDestroy(): void {
    if (this.categorySub) this.categorySub.unsubscribe();
  }


}
