import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { DetailItemModalComponent } from 'src/app/core/components/detail-item-modal/detail-item-modal.component';
import { ModalBookComponent } from 'src/app/core/components/modal-book/modal-book.component';
import { Book } from 'src/app/core/models/book';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  list: Book[] = [];
  mylistSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(this.list);
  mylist$ = this.mylistSubject.asObservable()

  emptyCards: boolean = false;
  constructor(private bookSvc: BookService,private modalCtr: ModalController,private router: Router) {
    this.list = this.bookSvc.book_list;

    if(this.list.length == 0) {
      this.mylistSubject.next(this.list);
      this.emptyCards = true;
    }
   }

  ngOnInit() {}


  /* Modal añadir libro */
  async openModal() {

    const modal = await this.modalCtr.create({
      component: ModalBookComponent,
      componentProps: {
       // act: this.tagSvc.getTagById(this.id)
      },
      cssClass: 'modal'
    });
    modal.present();

    modal.onDidDismiss().then(result => {
     console.log(result);
     if(result && result.data) {
      switch(result.data.mode) {
        case "crear":
          this.bookSvc.createBook(result.data.book)
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
     console.log(result);
     console.log(result.role);
      switch(result.role) {
        case "see":
          let id = result.data.book;
          this.router.navigate([`recipes/${id}`])
          break;
      }
    });
  }

}
