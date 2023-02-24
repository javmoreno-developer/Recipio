import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private bookId: string;
  private update: boolean = false;
  private recipeObject: Recipe;

  constructor() { }

  getData() {
    return this.bookId;
  }
  setData(param) {
    this.bookId = param;
  }

  setUpdate(param) {
    this.update = param;
  }

  getUpdate() {
    return this.update
  }

  setRecipe(param) {
    this.recipeObject = param;
  }

  getRecipe() {
    return this.recipeObject;
  }
}
