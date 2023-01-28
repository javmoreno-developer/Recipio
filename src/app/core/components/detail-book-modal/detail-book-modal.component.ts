import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-detail-book-modal',
  templateUrl: './detail-book-modal.component.html',
  styleUrls: ['./detail-book-modal.component.scss'],
})
export class DetailBookModalComponent implements OnInit {

  data: Book | undefined;

  @Input("book") set book(n: Book) {
    this.data = n;
  }
  constructor() { }

  ngOnInit() {}

}
