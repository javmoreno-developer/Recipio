import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

  data: any = {}

  @Input("book") set book(n: any) {
    this.data = n;
  }
  constructor() { }

  ngOnInit() {}

}
