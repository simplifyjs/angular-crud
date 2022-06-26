import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from './../../../shared/services/products.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  public title = "Product";
  public formType: string = 'Add';
  public isSubmitted: boolean = false;
  public productForm!: FormGroup;
  public categoriesOpt: any[] = [];
  private submitSub!: Subscription;
  private productSub!: Subscription;
  public categoryBox = [];
  public defaultCategoryOpt: any[] = [];
  public existingCategories: any[] = [];

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    private productSvc: ProductsService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activateRoute.params.subscribe((params: any) => {
      const { categoryOptions } = this.activateRoute.snapshot.data;
      this.defaultCategoryOpt = categoryOptions;
      this.categoriesOpt = categoryOptions;

      if (!params || !params.id) return;
      this.getExistingData(params.id);
    });
  }

  public initForm() {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d+(\.\d+)?$/)
        ]),
      ],
      categories: this.fb.array([])
    });
  }

  public isRequiredDirty(key: string, validate: string) {
    return this.productForm.get(key)?.hasError(validate) && (this.productForm.get(key)?.dirty);
  }

  public isRequiredSubmitted(key: string, validate: string) {
    return this.isSubmitted && this.productForm.get(key)?.hasError(validate);
  }

  public onCheckboxChange(target: any) {
    const checkArray: FormArray = this.productForm.get('categories') as FormArray;

    if (!target.selected) {
      const optValue = { id: target.id, name: target.name };
      checkArray.push(new FormControl(optValue));
    } else {
      checkArray.controls.forEach((item, index) => {
        if (item.value.id === target.id) {
          checkArray.removeAt(index);
        }
      });
    }
    this.changeSelectedState(target);
  }

  private changeSelectedState(target: any) {
    this.categoriesOpt = this.categoriesOpt.map(item => {
      if (item.id === target.id) return { ...item, selected: !target.selected };
      return item;
    });
  }

  public getExistingData(id: number) {
    this.productSub = this.productSvc.getProduct(id)
      .subscribe((product: Product) => {
        this.existingCategories = product.categories.slice();
        const categoriesIds = this.existingCategories.map(category => category.id);
        this.mappedExistingCategories(categoriesIds);

        this.formType = 'Edit';
        this.patchForm(product);
      });
  }

  private mappedExistingCategories(categoriesIds: number[]): void {
    this.categoriesOpt = this.defaultCategoryOpt.map(category => {
      if (categoriesIds.includes(category.id)) {
        return { ...category, selected: true };
      }
      return { ...category, selected: false };
    });
  }

  private patchForm(product: Product): void {
    this.productForm.patchValue(product);
    this.checkboxPatchValue();
  }

  private checkboxPatchValue(): void {
    let checkArray = this.productForm.get('categories') as FormArray;
    this.existingCategories.forEach((category: any, index) => {
      if (category) {
        checkArray.push(new FormControl(category));
      }
    });
  }

  public onSubmit(): void {
    this.isSubmitted = true;
    if (this.productForm.invalid) return;

    const submittedVal = this.productForm.value;
    this.saveSubmission(submittedVal);
  }

  private saveSubmission(submittedVal: any): void {
    let formObs$: Observable<Product>;
    if (this.formType === 'Add') {
      formObs$ = this.productSvc.addProduct(submittedVal);
    } else {
      formObs$ = this.productSvc.editProduct(submittedVal.id, submittedVal);
    }

    formObs$
      .subscribe(() => {
        this.productForm.reset();
        this.isSubmitted = false;
        this.router.navigate(['/products']);
      });
  }

  ngOnDestroy(): void {
    if (this.submitSub) this.submitSub.unsubscribe();
  }

}
