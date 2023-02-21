import { Injectable } from '@angular/core';
import { Unsubscribe } from 'firebase/auth';
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

  public getSubscritpionByBook(subject: BehaviorSubject<any[]>, condition:string): Unsubscribe {
    return this.firebase.subscribeToCollectionWithQueryBook('recipe', subject, this.mapRecipe, condition);
  }

  private mapRecipe(doc:DocumentData){
    return {
      id:0,
      docId: doc["id"],
      bookId: doc["data"]().bookId,
      title: doc["data"]().title,
      duration: doc["data"]().duration,
      process: doc["data"]().process,
      ingredients: doc["data"]().ingredients,
    };

  }

  async createRecipe(recipe: Recipe) {
    try {
      await this.firebase.createDocument("recipe",recipe).then((docRef)=>{
        recipe.docId = docRef
        this.updateRecipe(recipe)
      });
    } catch(error) {
      console.log(error);
    }
}

getRecipeByBook(bookId: string) {
  return new Promise<Recipe[]>(async (resolve, reject)=>{
    try {
      var recipes = (await this.firebase.getDocumentsBy('recipe', "bookId", bookId)).map<Recipe>(doc => {
        return {
          id:0,
          docId:doc.id,
          title: doc["data"]['title'],
          duration: doc["data"]['duration'],
          process: doc["data"]['process'],
          ingredients: doc["data"]['ingredients'],
        }
      });
      resolve(recipes);  
    } catch (error) {
      reject(error);
    }
  });
}

async updateRecipe(recipe:Recipe) {
  try {
    await this.firebase.updateDocument('recipe', recipe.docId, recipe);  
  } catch (error) {
    console.log(error);
  } 
}

async deleteRecipe(id: string) {
  console.log(id);
  try {
    await this.firebase.deleteDocument("recipe",id)
  } catch(error) {
    console.log(error);
  }
}



  
}
