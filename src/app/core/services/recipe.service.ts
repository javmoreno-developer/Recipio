import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../models/recipe';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipe_list : Recipe[]= [];

  private _recipeSubject: BehaviorSubject<Recipe[]> = new BehaviorSubject([]);
  public _recipe$ = this._recipeSubject.asObservable();

  unsubscr;


  constructor(private firebase:FirebaseService) {
    this.unsubscr = this.firebase.subscribeToCollection('recipe',this._recipeSubject, this.mapRecipe);
  
  }

  private mapRecipe(doc:DocumentData){
    //console.log(doc['data']());
    return {
      id:0,
      docId: doc["id"],
      title: doc["data"]().title,
      duration: doc["data"]().duration,
      process: doc["data"]().process,
      ingredients: doc["data"]().ingredients,
    };

  }

  async createRecipe(recipe: Recipe) {
    try {
      await this.firebase.createDocument("recipe",recipe);
    } catch(error) {
      console.log(error);
    }
}



  
}
