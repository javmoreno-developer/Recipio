import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserLogin } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  register: Boolean = false;
  constructor(
    private user:UserService,
    private router: Router
  ) { 
   
  }

  changeRegister(param) {
    this.register = param;
  }

  // registro
  async signUp(param){
    await this.user.register(param);

  } 
  

  ngOnInit() {
  }

  async signIn(param: UserLogin){
    try {
      await this.user.login(param);
      this.router.navigate(['main'], {replaceUrl:true});
      console.log("logueado");
    } catch (error) {
      console.log(error);

    }
    
  }

}
