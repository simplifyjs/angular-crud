import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardWidgetComponent } from './components/card-widget/card-widget.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ToastConfirmComponent } from './components/toast-confirm/toast-confirm.component';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';

const PRIME_NG_MODULES = [
  CardModule,
  TableModule,
  ButtonModule,
  InputTextModule,
  MessagesModule,
  MessageModule,
  ToastModule,
  TagModule,
  CheckboxModule
];

@NgModule({
  declarations: [
    CardWidgetComponent,
    ToastConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...PRIME_NG_MODULES
  ],
  exports: [
    CardWidgetComponent,
    ToastConfirmComponent,
    ReactiveFormsModule,
    FormsModule,
    ...PRIME_NG_MODULES
  ]
})
export class SharedModule { }
