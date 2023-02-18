import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DetailItemModalComponent } from 'src/app/core/components/detail-item-modal/detail-item-modal.component';
import { Recipe } from 'src/app/core/models/recipe';
import { BookService } from 'src/app/core/services/book.service';
import { RecipeService } from 'src/app/core/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  name: String;

  constructor(private router: Router,private recipeSvc: RecipeService,private route: ActivatedRoute,private bookSvc: BookService,private modalCtr: ModalController) {
    let id = this.route.snapshot.params['id'];
    this.name = bookSvc.getBook(id);

    //this.recipeSvc.init();
   }

  ngOnInit() {}

  getAllRecipes() {
    //return this.recipeSvc.getAll()
  }

  openModal() {}

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
  

}
