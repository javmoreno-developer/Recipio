import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Book } from '../../models/book';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-detail-item-modal',
  templateUrl: './detail-item-modal.component.html',
  styleUrls: ['./detail-item-modal.component.scss'],
})
export class DetailItemModalComponent implements OnInit {

  data: any | undefined;
  recipeInput: Boolean = false


  @Input("book") set book(n: Book) {
    this.data = n;
  }

  @Input("recipe") set recipe(n: Recipe) {
    this.data = n;
    this.recipeInput = true;
  }




  constructor(private modal: ModalController) { }

  ngOnInit() { }

  modalOperation(param: string) {

    this.modal.dismiss({ item: this.data }, param)

  }

  closeModal() {
    this.modal.dismiss({});
  }



}
