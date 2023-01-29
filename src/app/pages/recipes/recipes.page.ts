import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { RecipeService } from 'src/app/core/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  name: String;

  constructor(private router: Router,private recipeSvc: RecipeService,private route: ActivatedRoute,private bookSvc: BookService) {
    let id = this.route.snapshot.params['id'];
    this.name = bookSvc.getBook(id);

    this.recipeSvc.init();
   }

  ngOnInit() {}

  getAllRecipes() {
    return this.recipeSvc.getAll()
  }

  openModal() {}

  goToHome() {
    this.router.navigate(["main"]);
  }

  callDetailModal(param: any) {}

}
