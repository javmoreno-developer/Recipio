import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe';
import { recipeBlock } from 'src/app/core/models/recipe-block';
import { RecipeService } from 'src/app/core/services/recipe.service';

@Component({
  selector: 'app-recipe-content',
  templateUrl: './recipe-content.page.html',
  styleUrls: ['./recipe-content.page.scss'],
})
export class RecipeContentPage implements OnInit {


  segmentIngredients: recipeBlock[] = [{ blockId: 0, title: "", content: { text: "" } }, { blockId: 1, title: "", content: { text: "" } }]
  segmentProcess: recipeBlock[] = [{ blockId: 0, title: "", content: { text: "" } }]

  counterIngredients = this.segmentIngredients.length;
  counterProcess = this.segmentProcess.length;

  toShow = "ingredients"
  warnmsg = ""

  // Ingredientes
  private segmentIngredientsSubject = new BehaviorSubject<recipeBlock[]>(this.segmentIngredients)
  segmentIngredients$ = this.segmentIngredientsSubject.asObservable()

  // Proceso
  private segmentProcessSubject = new BehaviorSubject<recipeBlock[]>(this.segmentProcess)
  segmentProcess$ = this.segmentProcessSubject.asObservable()

  constructor(private cdr: ChangeDetectorRef, private alertController: AlertController, private recipeSvc: RecipeService) {
    //console.log("mostrando: "+this.toShow)
  }

  ngOnInit() { }

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
    console.log(param);
    console.log(this.segmentIngredientsSubject.value.length);

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

  setWarnMsg(durationObject, timeObject) {
    if (!durationObject.value) {
      this.warnmsg = "Cuidado la duracion se pondrá en 0 pues no se ha asignado ningun valor"
    } else if (!timeObject.value) {
      this.warnmsg = "Cuidado la marca temporal se asignara a segundos pues no se ha asignado ningun valor"
    } else if (this.emptyBlock(this.segmentIngredients)) {
      this.warnmsg = "Cuidado en esta receta existen bloques vacios en las recetas,los cuales no se subirán"
    } else if (this.emptyBlock(this.segmentProcess)) {
      this.warnmsg = "Cuidado en esta receta existen bloques vacios en el proceso,los cuales no se subirán"

    } else {
      this.warnmsg = ""
    }
  }
  setDuration(timeObject, durationObject) {
    let duration = 0;
    switch (timeObject.value) {
      case "min":
        duration = parseInt(durationObject.value)
        break;
      case "hor":
        duration = durationObject.value * 60
        break;
      default:
        if (durationObject.value) {
          duration = parseInt(durationObject.value)
        }

    }
    return duration;
  }
  // funcion de añadir recetas
  onAddRecipe(titleObject, durationObject, timeObject) {
    // mostramos los datos


    //console.log(this.emptyBlock(this.segmentIngredients));
    // comprobamos si alguno de los campos esta vacio
    this.setWarnMsg(durationObject, timeObject)

    // calculamos la duracion
    let duration = this.setDuration(timeObject, durationObject)

    // limpiamos los objetos
    let ingredients = this.cleanObject(this.segmentIngredientsSubject.value);
    let process = this.cleanObject(this.segmentProcessSubject.value);

    // mostramos alert
    this.presentAlert(titleObject.innerHTML, duration, ingredients, process)
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
              title: title,
              duration: duration,
              process: process,
              ingredients: ingredients
            }
            console.log(recipe);
            //this.recipeSvc.createRecipe(recipe);
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
    console.log(object);
    accordion.readonly = object.state
    this.cdr.detectChanges()
  }
}
