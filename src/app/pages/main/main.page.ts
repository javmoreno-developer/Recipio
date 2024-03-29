import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { DetailItemModalComponent } from 'src/app/core/components/detail-item-modal/detail-item-modal.component';
import { ModalBookComponent } from 'src/app/core/components/modal-book/modal-book.component';
import { Book } from 'src/app/core/models/book';
import { BookService } from 'src/app/core/services/book.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {

  //list: BehaviorSubject = new Observable<Book[]>;
  //mylistSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(this.list);
  //mylist$ = this.mylistSubject.asObservable()
  private _listCopy: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  private _listOriginal: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  list$ = this._listOriginal.asObservable();
  listCopy$ = this._listCopy.asObservable();

  unsubscr;
  unsubscrCopy;


  emptyCards: boolean = false;
  constructor(private bookSvc: BookService,private modalCtr: ModalController,private router: Router,private userSvc: UserService) {
    this.getAllBooks();
  }

  ngOnDestroy(): void {
    this.unsubscr();
    this.unsubscrCopy()
  }

  ngOnInit() {}

  async getAllBooks() {
    let uid = "";

    await this.userSvc.user$.subscribe(user =>{
  
      uid = user.uid
 
    })
    this.unsubscr = this.bookSvc.getSubscritpionByUser(this._listOriginal, uid);
    this.unsubscrCopy = this.bookSvc.getSubscritpionByUser(this._listCopy, uid);

   
  }
  


  /* Modal añadir libro */
  async openModal(param = false) {

    const modal = await this.modalCtr.create({
      component: ModalBookComponent,
      componentProps: {
       act: param
      },
      cssClass: 'modal'
    });
    modal.present();
    var uid = "";

    await this.userSvc.user$.subscribe(user =>{
      uid = user.uid
    });

    modal.onDidDismiss().then(result => {
      
     if(result && result.data) {
      switch(result.data.mode) {
        case "crear":
          result.data.book.uid = uid;
          result.data.book.totalRecipes = 0
          this.bookSvc.createBook(result.data.book);
          break;
        case "actualizar":
          this.bookSvc.updateBook(result.data.book);
          break;
      }
     }
    });
  }

  /* Modal detail libro */

  callDetailModal(book: Book) {
    this.openDetailModal(book);
  }

  async openDetailModal(book: Book) {
    const modal = await this.modalCtr.create({
      component: DetailItemModalComponent,
      componentProps: {
        book: book
      },
      cssClass: 'modal'
    });
    modal.present();

    modal.onDidDismiss().then(result => {
   
      switch(result.role) {
        case "see":
          
          let id = result.data.item.docId;
          this.router.navigate([`recipes/${id}`])
          break;
        case "delete":
          
          this.bookSvc.deleteBook(result.data.item);
          break;
        case "update":
         
          this.openModal(result.data.item);
          break;
        
      }
    });
  }

  searchBook(param) {
    let filtererList = []

    // filtrado
    this._listCopy.value.forEach((item)=>{
       if(item.title.includes(param.text)) {
         filtererList.push(item)
       }
    });
    this._listOriginal.next(filtererList)
 
   }
  

  
}