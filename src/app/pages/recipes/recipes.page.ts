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

  private _list: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  list$ = this._list.asObservable();
  book_id
  unsubscr;

  constructor(private router: Router,private recipeSvc: RecipeService,private route: ActivatedRoute,private bookSvc: BookService,private modalCtr: ModalController, private dataSvc:DataService) {
    this.book_id = router.url.split("/")[2];
    console.log(this.book_id);
    this.getAllRecipes(this.book_id)
   }

   ngOnDestroy(): void {
    this.unsubscr();
  }

  ngOnInit() {}

  getAllRecipes(param) {
   console.log(param)
   this.unsubscr = this.recipeSvc.getSubscritpionByBook(this._list,param)
   console.log(this.list$)
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
     console.log(result);
     console.log(result.role);
      
    });
  }
  
  createRecipe() {
    this.dataSvc.setData(this.book_id);

    this.router.navigate(['recipeContent'])

  }
  
}
