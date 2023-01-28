import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

  data: any = {}
  @Output() onDetail = new EventEmitter();

  @Input("book") set book(n: Book) {
    this.data = n;
  }
  constructor() { }

  ngOnInit() {}

  callDetail() {
    this.onDetail.next(this.data);
  }
}
