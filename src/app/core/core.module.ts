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
import { DetailBookModalComponent } from './components/detail-book-modal/detail-book-modal.component';
import { ItemCardComponent } from './components/item-card/item-card.component';

registerLocaleData(es);
registerLocaleData(en);

@NgModule({
  declarations: [
    SearchBarComponent,
    ModalBookComponent,
    DetailBookModalComponent,
    ItemCardComponent,
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
    DetailBookModalComponent,
    ItemCardComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useClass: LocaleId,
    deps: [LocaleService],
    },
  ]
})
export class CoreModule { }
