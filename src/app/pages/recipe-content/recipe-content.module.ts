import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeContentPageRoutingModule } from './recipe-content-routing.module';

import { RecipeContentPage } from './recipe-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeContentPageRoutingModule
  ],
  declarations: [RecipeContentPage]
})
export class RecipeContentPageModule {}
