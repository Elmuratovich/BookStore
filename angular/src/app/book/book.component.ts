import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { BookDto, BookService, bookTypeOptions } from '@proxy/books';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap'; // add this line
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [
    ListService,
    { provide:NgbDateAdapter, useClass: NgbDateNativeAdapter } // add this line
  ],
})
export class BookComponent implements OnInit {
  book = { items: [], totalCount: 0 } as PagedResultDto<BookDto>;

  selectedBook = {} as BookDto; // declare selected

  form: FormGroup; // add this line

  // add bookTypes as a list of BookType enum members
  bookTypes = bookTypeOptions;

  isModalOpen = false;

  constructor(
    public readonly list: ListService, 
    private bookService: BookService,
    private fb: FormBuilder, // inject FormBuilder
    private confirmation: ConfirmationService // inject the ConfirmationService
    ){}

  ngOnInit() {
    const bookStreamCreator = (query) => this.bookService.getList(query);
   
    this.list.hookToQuery(bookStreamCreator).subscribe((responce) => {
      this.book = responce;
    });
  }

  // add new method
  createBook() {
    this.selectedBook = {} as BookDto;
    this.buildForm(); // add this line
    this.isModalOpen = true;
  }

  // add a delete method
  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
      if(status === Confirmation.Status.confirm){
        this.bookService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  // Add editBook method
  editBook(id: string){
    this.bookService.get(id).subscribe((book) => {
      this.selectedBook = book;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  // add buildForm method
  buildForm(){
    this.form = this.fb.group({
      name: [this.selectedBook.name || '', Validators.required],
      type: [this.selectedBook.type || null, Validators.required],
      publishDate: [
        this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null, 
        Validators.required
      ],
      price: [this.selectedBook.price || null, Validators.required]
    });
  }

  // add save method
  save() {
    if(this.form.invalid){
      return;
    }

    const request = this.selectedBook.id
      ? this.bookService.update(this.selectedBook.id, this.form.value)
      : this.bookService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }
}
