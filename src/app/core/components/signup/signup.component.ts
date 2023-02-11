import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PasswordValidation } from '../../utils/password-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form:FormGroup;

  @Output() onSignup = new EventEmitter();
  @Output() onRegister = new EventEmitter()

  constructor(
    private formBuilder:FormBuilder,
    private modalCtrl:ModalController,
  ) { 

    this.form = this.formBuilder.group({
      email:["", [Validators.required, Validators.email]],
      surname:["", Validators.required],
      name:["", Validators.required],
      nickname:["", Validators.required],
      password:["", Validators.required],
      confirmPassword:["", Validators.required],
    },{validator:[PasswordValidation.passwordMatch, PasswordValidation.passwordProto]});

  }

  ngOnInit() {}

  onSubmit() {
    this.onSignup.emit(this.form.value);
  }

  toRegister() {
    this.onRegister.emit(false);
  }

  hasFormError(error){
    return this.form?.errors && Object.keys(this.form.errors).filter(e=>e==error).length==1;
  }
  
  errorsToArray(errors){
   
    if(errors && !('required' in errors))
      return [Object.keys(errors)[0]];
    else
      return [];
  } 

}
