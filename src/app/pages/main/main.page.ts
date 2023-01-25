import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/core/models/book';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  list: Book[] = [];

  constructor(private bookSvc: BookService) {
    this.list = this.bookSvc.book_list
   }

  ngOnInit() {
  }

}
