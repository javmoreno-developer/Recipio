import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeContentPage } from './recipe-content.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeContentPageRoutingModule {}
