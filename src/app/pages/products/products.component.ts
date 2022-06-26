import { MessageService } from 'primeng/api';
import { ProductsService } from './../../shared/services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public title: string = 'Products';
  public confirmMessage: any = {};
  public deleteId!: number;
  public products: Product[] = [];
  public products$: Observable<Product[]> = of([]);
  private productSub!: Subscription;

  constructor (
    private productSvc: ProductsService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initList();
    this.checkState();
  }
  public initList(): void {
    this.productSub = this.productSvc.getProducts()
      .subscribe(productResult => {
        this.products = productResult;
      });
  }

  public checkState(): void {
    this.products$ = this.productSvc.productObs$;
  }

  public onEdit(id: number): void {
    this.router.navigate(['/products', id, 'edit']);
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
    if (this.productSub) this.productSub.unsubscribe();
  }

}
