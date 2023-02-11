import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Book } from '../../models/book';

@Component({
  selector: 'app-modal-book',
  templateUrl: './modal-book.component.html',
  styleUrls: ['./modal-book.component.scss'],
})
export class ModalBookComponent implements OnInit {

  form : FormGroup;
  actBook: String = "crear";
  actObject: Book;

  @Input("act") set act(n: Book) {
    if(n) {
      this.form.controls["docId"].setValue(n.docId)
      this.form.controls["title"].setValue(n.title)
      this.form.controls["description"].setValue(n.description)
      this.actBook = "actualizar";
    }
  }

  constructor(private fb:FormBuilder,private modal:ModalController) {
    this.form = this.fb.group({
      docId: [null],
      title: ["", Validators.required],
      description: ["",Validators.required],
    });
   }

  ngOnInit() {}

  onDismiss(){
    this.modal.dismiss(null, 'cancel');
  }
  onSubmit() {
    this.modal.dismiss({mode: this.actBook, book: this.form.value},'ok')
  }
}
