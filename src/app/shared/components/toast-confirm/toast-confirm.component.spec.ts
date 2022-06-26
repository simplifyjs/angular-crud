import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastConfirmComponent } from './toast-confirm.component';

describe('ToastConfirmComponent', () => {
  let component: ToastConfirmComponent;
  let fixture: ComponentFixture<ToastConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
