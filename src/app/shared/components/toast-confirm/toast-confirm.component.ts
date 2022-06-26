import { ProductsService } from './../../services/products.service';
import { CategoriesApiService } from 'src/app/shared/services/categories-api.service';
import { MessageService } from 'primeng/api';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast-confirm',
  templateUrl: './toast-confirm.component.html',
  styleUrls: ['./toast-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastConfirmComponent {
  @Input() message: any;
  @Input() id!: number;
  @Input() listName: string = 'Categories';
  private requestObs!: Observable<any>;

  constructor (
    private messageService: MessageService,
    private categorySvc: CategoriesApiService,
    private productSvc: ProductsService
  ) { }

  onReject() {
    this.messageService.clear('c');
    console.log('reject');
  }

  onConfirm() {
    console.log('confirm ', this.id);

    if (this.listName === 'Categories') {
      this.requestObs = this.categorySvc.deleteCategory(this.id);
    } else {
      this.requestObs = this.productSvc.deleteProduct(this.id);
    }
    this.requestObs.subscribe();
    this.messageService.clear('c');
  }
}
