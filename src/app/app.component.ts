import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    public user:UserService,
    private router:Router
  ) {
    this.translate.setDefaultLang("es");
  }

  signOut(){
    this.user.signOut();
    this.router.navigate(['login']);
  }
}
