import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-book',
  templateUrl: './modal-book.component.html',
  styleUrls: ['./modal-book.component.scss'],
})
export class ModalBookComponent implements OnInit {

  form : FormGroup;
  actBook: String = "crear";

  constructor(private fb:FormBuilder,private modal:ModalController) {
    this.form = this.fb.group({
      id: [null],
      name: ["", Validators.required],
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
