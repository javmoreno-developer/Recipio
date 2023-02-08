import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './core/utils/js/translate';
import { LocaleService } from './core/services/locale.service';
import { FirebaseService } from './core/services/firebase/firebase-service';
import { FirebaseWebService } from './core/services/firebase/web/firebase-web.service';

export function firebaseServiceFactory() {
  return  new FirebaseWebService();
}


export class LocaleId extends String {
  constructor(private localeService: LocaleService) {
    super();
  }
  
  override toString(): string {
    return this.localeService.locale;
  }
  
  override valueOf(): string {
    return this.toString();
  }
 }
 
@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient]
              }
              
          })
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },{
      provide: LOCALE_ID,
      useClass: LocaleId,
      deps: [LocaleService],
    },
    {
      provide: FirebaseService,
      deps: [],
      useFactory: firebaseServiceFactory
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
