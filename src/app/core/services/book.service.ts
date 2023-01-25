import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  book_list : Book[]= [];

  constructor() {
    this.init();
   }

  init() {
    this.book_list = [
      {
        name: "Vegetables 🌮",
        count_recipe: 13
      },
      {
        name: "Meat🥩",
        count_recipe: 18,
      },
      {
        name: "Vegetables 🌮",
        count_recipe: 13
      },
      {
        name: "Meat🥩",
        count_recipe: 18,
      },
      {
        name: "Vegetables 🌮",
        count_recipe: 13
      },
      {
        name: "Meat🥩",
        count_recipe: 18,
      },

    ]
  }
}
