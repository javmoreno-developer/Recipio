import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { recipeBlock } from '../../models/recipe-block';

@Component({
  selector: 'app-recipe-block',
  templateUrl: './recipe-block.component.html',
  styleUrls: ['./recipe-block.component.scss'],
})
export class RecipeBlockComponent implements OnInit {

  item:recipeBlock = {
    blockId: 0,
    title: "Escribe un titulo",
    content: {
      text: ""
    }
  };
  position;


  @Input("item") set data(n: recipeBlock) {
    this.item = n;
  }

  @Input("position") set pos(n: number) {
    this.position = n;
  }


  @Output("onDeleteItem") onDeleteItem = new EventEmitter;
  @Output("onUpdateItem") onUpdateItem = new EventEmitter;
  @Output("onExpandItem") onExpandItem = new EventEmitter;
  
  constructor() { }

  ngOnInit() {}

  onDelete(param) {
    this.onDeleteItem.emit(param);
  }

  stopExpand(input,text) {
    this.onExpandItem.emit({state: true})
    this.changeItem(input,text);
  }

  startExpand() {
    this.onExpandItem.emit({state: false})
  }

  changeItem(input,text) {

    this.item.title = input.value
    this.item.content.text = text.value;
    this.item.content.image = "";
    this.onUpdateItem.emit({"item":this.item})
    //this.startExpand(accordion)
    //filtramos y ponemos el titulo
   
  }
}
