import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; // add this line

@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    BookRoutingModule,
    NgbDatepickerModule
  ]
})
export class BookModule { }
