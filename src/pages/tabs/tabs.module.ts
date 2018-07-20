import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs';
import { CheckinPage } from '../checkin/checkin';
import { TimesheetsPage } from '../timesheets/timesheets';

@NgModule({
    declarations: [TabsPage],
    imports: [IonicPageModule.forChild(TabsPage)],
    entryComponents: [

    ],
    providers: [],
    exports:[TabsPage]
  })
  export class TabsModule {}