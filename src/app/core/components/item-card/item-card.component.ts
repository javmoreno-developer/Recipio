import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {

  data: any = {}
  recipe = false;
  @Output() onDetail = new EventEmitter();

  @Input("item") set item(n: any) {
    if("book" in n) {
      this.data = n.book;
      this.recipe = false;
    } else {
      this.data = n.recipe
      this.recipe = true;
    }
  }


  constructor() { }

  ngOnInit() {}

  callDetail() {
    this.onDetail.next(this.data);
  }

}
