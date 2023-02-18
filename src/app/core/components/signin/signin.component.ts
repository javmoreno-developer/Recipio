import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form:FormGroup;

  @Output() onSignin = new EventEmitter();
  @Output() onRegister = new EventEmitter()

  constructor(
    private formBuilder:FormBuilder,
  ) { 

    this.form = this.formBuilder.group({
      identifier:["", [Validators.required, Validators.email]],
      password:["", Validators.required]
    });

  }

  ngOnInit() {}

  onSubmit() {
    this.onSignin.emit(this.form.value);
  }

  toRegister() {
    this.onRegister.emit(true);
  }

}
