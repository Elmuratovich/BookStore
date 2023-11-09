import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { BookDto, BookService } from '@proxy/books';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [ListService]
})
export class BookComponent implements OnInit {
  book = { items: [], totalCount: 0 } as PagedResultDto<BookDto>;

  constructor(public readonly list: ListService, private bookService: BookService){}

  ngOnInit() {
    const bookStreamCreator = (query) => this.bookService.getList(query);
   
    this.list.hookToQuery(bookStreamCreator).subscribe((responce) => {
      this.book = responce;
    });
  }
}