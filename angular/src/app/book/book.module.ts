import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';


@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
