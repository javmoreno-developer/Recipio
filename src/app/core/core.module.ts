import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/js/translate';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import es from "@angular/common/locales/es";
import en from "@angular/common/locales/en";
import { LocaleId } from '../app.module';
import { LocaleService } from './services/locale.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ModalBookComponent } from './components/modal-book/modal-book.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { DetailItemModalComponent } from './components/detail-item-modal/detail-item-modal.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { RecipeBlockComponent } from './components/recipe-block/recipe-block.component';
import { DurationComponent } from './components/duration/duration.component';
import { ChipTimeComponent } from './components/chip-time/chip-time.component';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

registerLocaleData(es);
registerLocaleData(en);

@NgModule({
  declarations: [
    SearchBarComponent,
    ModalBookComponent,
    ItemCardComponent,
    DetailItemModalComponent,
    SigninComponent,
    SignupComponent,
    RecipeBlockComponent,
    DurationComponent,
    ChipTimeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    SearchBarComponent,
    ModalBookComponent,
    ItemCardComponent,
    DetailItemModalComponent,
    SigninComponent,
    SignupComponent,
    RecipeBlockComponent,
    DurationComponent,
    ChipTimeComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useClass: LocaleId,
    deps: [LocaleService],
    },
    File
  ]
})
export class CoreModule { }
