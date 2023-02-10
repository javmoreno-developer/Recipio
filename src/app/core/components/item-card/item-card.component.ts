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
   
    /*if("name" in n) {
      this.data = n;
    } else {
      this.recipe = true;
      this.data = n; 
    }

    console.log(n);
    console.log(this.recipe);*/
    //console.log(n);
    this.data = n.book;
    //console.log(this.data);
    this.recipe = n.recipe
  }


  constructor() { }

  ngOnInit() {}

  callDetail() {
    this.onDetail.next(this.data);
  }

}
