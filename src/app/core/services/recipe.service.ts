import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes_list: Recipe[] = [];
  private _recipesSubject: BehaviorSubject<Recipe[]> | undefined;
  public _recipes$: any;


  constructor() {
    this.init()
    this._recipesSubject = new BehaviorSubject(this.recipes_list);
    this._recipes$ = this._recipesSubject.asObservable();
  }

  getAll() {
    return this._recipes$;
  }

  init() {
    this.recipes_list = [
      {

        title: "Salad",
        duration: "3 min",
        process: [
          {
            title: "1. Lavar lechugas",
            content: {
              text: "Deberás lavar las lechugas con cuidado.",
              image: ""
            }
          }
        ],
        ingredients: [
          {
            title: "1. Lechuga",
            content: {
              text: "Escoge con cuidado las verduras.",
              image: ""
            }
          }
        ]
      },

      //fin del array
    ]

  }
}
