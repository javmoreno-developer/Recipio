import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, reauthenticateWithCredential, updateCurrentUser, updateEmail, updatePassword, updateProfile, User, UserCredential } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { UserLogin, UserRegister,User as myuser } from '../models/user';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable();
  private _user = new BehaviorSubject<User>(null);
  public user$ = this._user.asObservable();
  public goTo = "main";
  //public goTo = "recipeContent";
  
  constructor(
    private firebase:FirebaseService,
    private router:Router
  ) {
    this.init();
    
  }

  private async init(){
    this.firebase.isLogged$.subscribe(async (logged)=>{
      if(logged){
        this._user.next((await this.firebase.getDocument('user', this.firebase.getUser().uid)).data as User);
        if (this.router.url == "/login") {
          this.router.navigate([this.goTo]);
        }
      }
      this._isLogged.next(logged);
    });
    
  }

  public login(credentials:UserLogin):Promise<string>{
    return new Promise<string>(async (resolve, reject)=>{
      if(!this._isLogged.value){
        try {
          await this.firebase.connectUserWithEmailAndPassword(credentials.identifier, credentials.password);
        } catch (error) {
          reject(error);
        }
      }
      else{
        reject('already connected');
      }
    });
    
  }

  signOut(){
    this.goTo = "main";
    this.firebase.signOut();
    this.router.navigate(['login']);
  }
  
  register(data:UserRegister){
    this.goTo = "tutorial";
    return new Promise<string>(async (resolve, reject)=>{
      if(!this._isLogged.value){
        try {
          var _user:UserCredential = (await this.firebase.createUserWithEmailAndPassword(data.email, data.password));
          await this.firebase.createDocumentWithId('user', 
            {
              uid:_user.user.uid,
              nickname:data.nickname, 
              picture:"",
              email:data.email,
              provider:'firebase',
              token:await _user.user.getIdToken(),
              surname:data.surname, 
              name:data.name
            }, _user.user.uid);
            await this.firebase.connectUserWithEmailAndPassword(data.email, data.password);
            //this.router.navigate(['tutorial']);
        } catch (error) {
          reject(error);
        }
      }
      else{
        reject('already connected');
      }
    });
  }

 async updateUser(user: myuser,picture: File) {

  // subimos la imagen
  if(picture) {
    var response = await this.uploadImage(picture);
    console.log(response.image);
    user["picture"] = response.image
  }

  // actualizamos el documento
  try {
    
    await this.firebase.updateDocument('user', user.uid, user);  
  } catch (error) {
    console.log(error);
  }
  
  // actualizamos el firebase auth
  const auth = getAuth();
  let actual = auth.currentUser
  
  
  updateEmail(actual,user.email).then(()=>{
    console.log("okey")
  }).catch((error)=>{
    console.log(error)
  });

 }
 
 uploadImage(file):Promise<any>{  
  return new Promise(async (resolve, reject)=>{
    try {
      const data = await this.firebase.imageUpload(file);  
      console.log("ok uploadImage")
      resolve(data);
    } catch (error) {
      console.log(error)
      resolve(error);
    }
  });
}

}
