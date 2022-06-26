import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesApiService } from 'src/app/shared/services/categories-api.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  public title = "Category";
  public formType: string = 'Add';
  public category$!: Observable<Category>;
  public categoryForm!: FormGroup;
  public isSubmitted: boolean = false;
  private submitSub!: Subscription;
  private categorySub!: Subscription;

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private categorySvc: CategoriesApiService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activateRoute.params.subscribe((params: any) => {
      if (!params || !params.id) return;
      this.getExistingData(params.id);
    });
  }

  public initForm(): void {
    this.categoryForm = this.fb.group({
      'id': [null],
      'name': ['', Validators.required]
    });
  }

  public getExistingData(id: number): void {
    this.categorySub = this.categorySvc.getCategory(id)
      .subscribe((category: Category) => {
        this.formType = 'Edit';
        this.patchForm(category);
      });
  }

  public controlCheck(key: string) {
    return this.categoryForm.controls[key];
  }

  private patchForm(category: Category): void {
    this.categoryForm.patchValue(category);
  }

  public onSubmit(): void {
    this.isSubmitted = true;

    if (this.categoryForm.invalid) return;
    this.saveSubmitedVal(this.categoryForm.value);
  }

  private saveSubmitedVal(submittedVal: any) {
    let formObs$: Observable<Category>;
    if (this.formType === 'Add') {
      formObs$ = this.categorySvc.addCategory(submittedVal);
    } else {
      formObs$ = this.categorySvc.editCategory(submittedVal.id, submittedVal);
    }

    formObs$.subscribe(() => {
      this.categoryForm.reset();
      this.router.navigate(['/categories']);
    });
  }

  ngOnDestroy(): void {
    if (this.submitSub) this.submitSub.unsubscribe();
    if (this.categorySub) this.categorySub.unsubscribe();
  }

}
