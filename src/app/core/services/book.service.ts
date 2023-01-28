import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  book_list : Book[]= [];

  private _bookSubject: BehaviorSubject<Book[]> | undefined;
  public _book$;
  
  constructor() {
    this.init();
    this._bookSubject = new BehaviorSubject(this.book_list);
    this._book$ = this._bookSubject?.asObservable();
   }

  init() {
    this.book_list = [
      {
        id: 0,
        name: "Vegetables 🌮",
        description: "desc",
        count_recipe: 13
      },
      {
        id: 1,
        name: "Meat🥩",
        description: "desc",
        count_recipe: 18,
      },
      {
        id: 2,
        name: "Vegetables 🌮",
        description: "desc",
        count_recipe: 13
      },
      {
        id: 3,
        name: "Meat🥩",
        description: "desc",
        count_recipe: 18,
      },
      {
        id: 4,
        name: "Vegetables 🌮",
        description: "desc",
        count_recipe: 13
      },
      {
        id: 5,
        name: "Meat🥩",
        description: "desc",
        count_recipe: 18,
      },

    ]
  }

  createBook(param: Book) {
      console.log(param);
      this.book_list.push(param);
      this._bookSubject?.next(this.book_list);
  }

  deleteBook(id: number) {
    this.book_list.filter((x)=>{
      return x.id == id
    });
    this._bookSubject?.next(this.book_list);
  }
}
