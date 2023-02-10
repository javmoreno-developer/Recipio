import { Injectable } from '@angular/core';
import { DocumentData, QueryConstraint, Unsubscribe } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  book_list : Book[]= [];

  private _bookSubject: BehaviorSubject<Book[]> = new BehaviorSubject([]);
  public _book$ = this._bookSubject.asObservable();

  unsubscr;
  

  constructor(private firebase:FirebaseService) {    
    this.unsubscr = this.firebase.subscribeToCollection('books',this._bookSubject, this.mapBook);
  }

  public getSubscritpionByUser(subject: BehaviorSubject<any[]>, condition:string): Unsubscribe {
    return this.firebase.subscribeToCollectionWithQueryUser('books', subject, this.mapBook, condition);
  }

   private mapBook(doc:DocumentData){
    //console.log(doc['data']());
    return {
      id:0,
      title: doc["data"]().title,
      description: doc["data"]().description,
      recipes: doc["data"]().recipes
    };

  }

  init() {
    /*this.book_list = [
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

    ]*/
  }

  async createBook(book: Book) {
      try {
        await this.firebase.createDocument("books",book);
      } catch(error) {
        console.log(error);
      }
  }


  /*
   async addPerson(person:Person){
    try {
      await this.firebase.createDocument('usuarios', person);  
    } catch (error) {
      console.log(error);
    }
  }
  */

  deleteBook(id: number) {
    this.book_list.filter((x)=>{
      return x.id == id
    });
    this._bookSubject?.next(this.book_list);
  }

  getBook(id: number) {
    return this.book_list.filter((x)=> {
      return x.id == id;
    })[0].title;
  }

  getMyBooks(value) {
    return new Promise<Book[]>(async (resolve, reject)=>{
      try {
        var books = (await this.firebase.getDocumentsBy('books', "uidUsu", value)).map<Book>(doc => {
          return {
            id:0,
            aw: "prueba",
            title: doc["data"]['title'],
            description: doc["data"]['description'],
            recipes: doc["data"]['recipes']
          }
        });
        resolve(books);  
      } catch (error) {
        reject(error);
      }
    });
  }

  /*getAssignmentsBy(field, value){
    return new Promise<Assignment[]>(async (resolve, reject)=>{
      try {
        var assignments = (await this.firebase.getDocumentsBy('asignaciones', field, value)).map<Assignment>(doc=>{
          return {
            id:0,
            docId:doc.id,
            personId:doc.data.personId,
            taskId:doc.data.taskId,
            createdAt:doc.data.createdAt,
            dateTime:doc.data.dateTime
          }
        });
        resolve(assignments);  
      } catch (error) {
        reject(error);
      }
    });
  }*/
}
