import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { DurationComponent } from 'src/app/core/components/duration/duration.component';
import { Recipe } from 'src/app/core/models/recipe';
import { recipeBlock } from 'src/app/core/models/recipe-block';
import { DataService } from 'src/app/core/services/data.service';
import { RecipeService } from 'src/app/core/services/recipe.service';

@Component({
  selector: 'app-recipe-content',
  templateUrl: './recipe-content.page.html',
  styleUrls: ['./recipe-content.page.scss'],
})
export class RecipeContentPage implements OnInit {

  //valores por defecto
  titleRecipe: string = "Salad🥗"

  recipeInput: Recipe;


  // valores por defecto de los observables
  segmentIngredients: recipeBlock[] = [{ blockId: 0, title: "", content: { text: "" } }, { blockId: 1, title: "", content: { text: "" } }]
  segmentProcess: recipeBlock[] = [{ blockId: 0, title: "", content: { text: "" } }]

 
  book_id = "";
  docId = "";

  toShow = "ingredients"
  warnmsg = ""
  durationTotal = 0
  durationMsg = ""

  // Ingredientes
  private segmentIngredientsSubject = new BehaviorSubject<recipeBlock[]>(this.segmentIngredients)
  segmentIngredients$ = this.segmentIngredientsSubject.asObservable()

  // Proceso
  private segmentProcessSubject = new BehaviorSubject<recipeBlock[]>(this.segmentProcess)
  segmentProcess$ = this.segmentProcessSubject.asObservable();

  counterIngredients = this.segmentIngredientsSubject.value.length;
  counterProcess = this.segmentProcessSubject.value.length;

  constructor(private cdr: ChangeDetectorRef, private alertController: AlertController,private modalCtr: ModalController, private recipeSvc: RecipeService,private dataSvc: DataService,private navController: NavController) {}

  ngOnInit() { 
    // pillo el id del libro
    this.book_id = this.dataSvc.getData();
    //console.log(this.dataSvc.getUpdate());
    if(this.dataSvc.getUpdate()){
      console.log(this.dataSvc.getRecipe());
      
      this.recipeInput = this.dataSvc.getRecipe()
      this.docId = this.recipeInput.docId;
      this.titleRecipe = this.recipeInput.title
      this.durationTotal = this.recipeInput.duration
      this.durationMsg = this.durationTotal + "min"
      this.segmentIngredientsSubject.next(this.recipeInput.ingredients)
      this.segmentProcessSubject.next(this.recipeInput.process)
      
    }
  }

  newElement() {
    let list = [];
    if (this.toShow == "ingredients") {
      list = this.segmentIngredientsSubject.value;
      //console.log(list);
      // ingredients list
      list.push({ blockId: this.counterIngredients, title: "", content: { text: "" } });
      this.counterIngredients++;

      this.segmentIngredientsSubject.next(list)
    } else {
      // process list
      list = this.segmentProcessSubject.value;

      list.push({ blockId: this.counterProcess, title: "", content: { text: "" } });
      this.counterProcess++;

      this.segmentProcessSubject.next(list)

    }
  }

  deleteItem(param) {

    let list = [];
    if (this.toShow == "ingredients") {

      list = this.segmentIngredientsSubject.value.filter((element) => {
        return element.blockId != param;
      });

      // ajustamos indices
      for(let i = param; i< list.length;i++) {
        list[i].blockId --; 
      }

      console.log(list)
      this.segmentIngredientsSubject.next(list)
    } else {
      list = this.segmentProcessSubject.value.filter((element) => {
        return element.blockId != param;
      });
      console.log(list)
      this.segmentProcessSubject.next(list)
    }
  }

  changeView(param) {
    this.toShow = param;

    console.log("mostrando: " + this.toShow)
  }

  setWarnMsg(duration) {
    if (!duration) {
      this.warnmsg = "Cuidado la duracion se pondrá en 0 pues no se ha asignado ningun valor"
    } else if (this.emptyBlock(this.segmentIngredientsSubject.value)) {
      this.warnmsg = "Cuidado en esta receta existen bloques vacios en las recetas,los cuales no se subirán"
    } else if (this.emptyBlock(this.segmentProcessSubject.value)) {
      this.warnmsg = "Cuidado en esta receta existen bloques vacios en el proceso,los cuales no se subirán"

    } else {
      this.warnmsg = ""
    }
  }

  // funcion de añadir recetas
  onAddRecipe(titleObject) {
    // mostramos los datos
    // comprobamos si alguno de los campos esta vacio
    this.setWarnMsg(this.durationTotal)



    // limpiamos los objetos
    let ingredients = this.cleanObject(this.segmentIngredientsSubject.value);
    let process = this.cleanObject(this.segmentProcessSubject.value);

    // mostramos alert
    this.presentAlert(titleObject.innerHTML, this.durationTotal, ingredients, process)
  }


  cleanObject(param) {
    const empty = (element) => ((!element.hasOwnProperty("title")) || (!element.hasOwnProperty("content")) || (element.title == "" || element.content == ""));
    let a = param.filter((element) => !empty(element));
    return a;

  }

  emptyBlock(array) {
    const empty = (element) => ((!element.hasOwnProperty("title")) || (!element.hasOwnProperty("content")) || (element.title == "" || element.content == ""));

    return array.some(empty);
  }

  // pressentar alert de confirmacion
  async presentAlert(title, duration, ingredients, process) {
    const alert = await this.alertController.create({
      header: '¿Has terminado de escribir la receta?',
      subHeader: '¿Quieres subirla?',
      message: this.warnmsg,
      
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = 'Alert canceled';

          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            var recipe: Recipe = {
              docId: this.docId,
              bookId: this.book_id,
              title: title,
              duration: this.durationTotal,
              process: process,
              ingredients: ingredients
            }
            console.log(recipe);
            if(this.dataSvc.getUpdate()) {
              this.recipeSvc.updateRecipe(recipe);
            } else {
              this.recipeSvc.createRecipe(recipe);
            }
          },
        },
      ],
    });

    await alert.present();
  }


  //
  updateItem(param) {
    console.log(param)
  }

  expandItem(object, accordion) {
   // console.log(object);
    accordion.readonly = object.state
    this.cdr.detectChanges()
  }

  goBack() {
    this.navController.back();
  }

async openDur() {
  const modal = await this.modalCtr.create({
    component: DurationComponent,
    cssClass: 'modalDatetime'
  });

  modal.present();

  modal.onDidDismiss().then(result => {
    switch(result.data.type) {
      case "cancell":
        console.log("cancelando");
        break;
      case "submit":
        console.log("enviando");
        console.log(result.data.content)
        this.durationTotal = result.data.content;
        this.durationMsg = result.data.msg;
        break;
    }
  });
}


}
