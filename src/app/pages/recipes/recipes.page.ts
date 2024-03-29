import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { DetailItemModalComponent } from 'src/app/core/components/detail-item-modal/detail-item-modal.component';
import { Recipe } from 'src/app/core/models/recipe';
import { BookService } from 'src/app/core/services/book.service';
import { DataService } from 'src/app/core/services/data.service';
import { RecipeService } from 'src/app/core/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit,OnDestroy {

  name: String;

  private _listCopy: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  private _listOriginal: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);

  list$ = this._listOriginal.asObservable();
  listCopy$ = this._listCopy.asObservable();

  book_id
  unsubscr;
  unsubscrCopy;

  constructor(private router: Router,private recipeSvc: RecipeService,private route: ActivatedRoute,private bookSvc: BookService,private modalCtr: ModalController, private dataSvc:DataService) {
    this.book_id = router.url.split("/")[2];
    this.getAllRecipes(this.book_id)
   }

   ngOnDestroy(): void {
    this.unsubscr();
    this.unsubscrCopy()
  }

  ngOnInit() {}

  getAllRecipes(param) {
   this.unsubscr = this.recipeSvc.getSubscritpionByBook(this._listOriginal,param)
   this.unsubscrCopy = this.recipeSvc.getSubscritpionByBook(this._listCopy,param)
      
   
   
  }



  goToHome() {
    this.router.navigate(["main"]);
  }

  callDetailModal(recipe: Recipe) {
    this.openDetailModal(recipe);
  }

  async openDetailModal(recipe: Recipe) {
    const modal = await this.modalCtr.create({
      component: DetailItemModalComponent,
      componentProps: {
        recipe: recipe
      },
      cssClass: 'modal'
    });
    modal.present();

    modal.onDidDismiss().then(result => {

     switch(result.role) {
      case "deleteRecipe":
        this.recipeSvc.deleteRecipe(result.data.item.docId, result.data.item.bookId)
        break;
      case "updateRecipe":
        this.dataSvc.setData(this.book_id);
        this.dataSvc.setUpdate(true);
        this.dataSvc.setRecipe(result.data.item);
        this.router.navigate(['recipeContent'])
        break;
     }
      
      
      
    });
  }
  
  createRecipe() {
    this.dataSvc.setData(this.book_id);
    this.dataSvc.setUpdate(false);
    this.router.navigate(['recipeContent'])

  }

  searchRecipe(param) {
   //this._listOriginal = this._listCopy
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
