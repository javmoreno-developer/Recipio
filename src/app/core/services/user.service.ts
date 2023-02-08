import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserCredential } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { UserLogin, UserRegister } from '../models/user';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable();
  private _user = new BehaviorSubject<User>(null);
  public user$ = this._user.asObservable();
  constructor(
    private firebase:FirebaseService,
    private router:Router
  ) {
    this.init();
    
  }

  private async init(){
    this.firebase.isLogged$.subscribe(async (logged)=>{
      if(logged){
        this._user.next((await this.firebase.getDocument('users', this.firebase.getUser().uid)).data as User);
        this.router.navigate(['main']);
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
    this.firebase.signOut();
    this.router.navigate(['login']);
  }
  
  register(data:UserRegister){
    return new Promise<string>(async (resolve, reject)=>{
      if(!this._isLogged.value){
        try {
          var _user:UserCredential = (await this.firebase.createUserWithEmailAndPassword(data.email, data.password));
          await this.firebase.createDocumentWithId('users', 
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
        } catch (error) {
          reject(error);
        }
      }
      else{
        reject('already connected');
      }
    });
  }

}
