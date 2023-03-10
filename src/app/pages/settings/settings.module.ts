import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { CoreModule } from 'src/app/core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core/utils/js/translate';
import { HttpClient } from '@angular/common/http';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [SettingsPage],
  
})
export class SettingsPageModule {}
