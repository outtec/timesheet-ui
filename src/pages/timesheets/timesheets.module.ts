import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimesheetsPage } from './timesheets';

@NgModule({
  declarations: [
    TimesheetsPage,
  ],
  imports: [
    IonicPageModule.forChild(TimesheetsPage),
  ],exports:[
      TimesheetsPage,
  ]
})
export class TimesheetsPageModule {}
