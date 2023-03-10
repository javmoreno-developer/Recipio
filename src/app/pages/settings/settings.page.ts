import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models/user';
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
  
  constructor(private userSvc: UserService,private fb:FormBuilder,private photoSvc: PhotoService,private cdr:ChangeDetectorRef) {
    this.form = fb.group({
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
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
    
    
    // actualizamos los datos del usuario

    this.userSvc.updateUser(this.user,this.form.value["pictureFile"]);
  }

  async changePic(fileLoader:HTMLInputElement, mode:'library' | 'file'){
    var item:PhotoItem = await this.photoSvc.getPicture(mode, fileLoader);
    this.currentImage.next(item.base64);
    this.cdr.detectChanges();
    this.form.controls["pictureFile"].setValue(item.blob);
  }
}
