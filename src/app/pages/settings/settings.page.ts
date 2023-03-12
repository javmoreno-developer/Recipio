import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { LocaleService } from 'src/app/core/services/locale.service';
import { PhotoItem, PhotoService } from 'src/app/core/services/photo.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  form:FormGroup;
  mode:"New" | "Edit" = "New";

  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();

  user: User;

  count: number = 0;
  imagen = "reino-unido.png"
  
  constructor(private ctr:ChangeDetectorRef, private userSvc: UserService,private fb:FormBuilder,private photoSvc: PhotoService,private cdr:ChangeDetectorRef, private translate: TranslateService,private locale:LocaleService) {
    this.form = fb.group({
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      nickname:['', [Validators.required]],
      email:['', [Validators.required]],
      pictureFile: [null]
      
    });

    // obtenemos el usuario logueado
    this.getMyData()
  }
  
  async getMyData() {

  

    this.userSvc.user$.subscribe(item => {
      if (item) {
        console.log(item);
        this.user = item as unknown as User;
        //item = item as User
        // obtengo los datos
        this.form.controls["name"].setValue(item["name"]);
        this.form.controls["surname"].setValue(item["surname"]);
        this.form.controls["email"].setValue(item["email"]);
        this.form.controls["nickname"].setValue(item["nickname"]);
        this.currentImage.next(item["picture"])

      }
    });
    

  }

  ngOnInit() {
  }

  signOut() {
    this.userSvc.signOut();
  }

  onSubmit() {
    console.log(this.form.value)
    this.user["name"] = this.form.value["name"]
    this.user["surname"] = this.form.value["surname"]
    this.user["email"] = this.form.value["email"]
    this.user["nickname"] = this.form.value["nickname"]
    
    
    // actualizamos los datos del usuario

    this.userSvc.updateUser(this.user,this.form.value["pictureFile"]);
  }

  async changePic(fileLoader:HTMLInputElement, mode:'library' | 'file'){
    var item:PhotoItem = await this.photoSvc.getPicture(mode, fileLoader);
    this.currentImage.next(item.base64);
    this.cdr.detectChanges();
    this.form.controls["pictureFile"].setValue(item.blob);
  }

  changeIdiom() {
    if(this.count % 2 == 0) {
      this.translate.setDefaultLang("en");
      this.locale.registerCulture("en");
      this.imagen = "espana.png"
      this.ctr.detectChanges()
    } else {
      this.translate.setDefaultLang("es");
      this.locale.registerCulture("es");
      this.imagen = "reino-unido.png"
      this.ctr.detectChanges()
    }
    this.count++;
  }
}
