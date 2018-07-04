import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CheckinPage } from '../pages/checkin/checkin';
import { LoginPage } from '../pages/login/login';
import { TimesheetsPage } from '../pages/timesheets/timesheets';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { TimesheetProvider } from '../providers/domain/timesheet/timesheet';


@NgModule({
  declarations: [
    MyApp,
    TimesheetsPage,
    CheckinPage,
    LoginPage,
    TabsPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CheckinPage,
    TimesheetsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TimesheetProvider
  ]
})
export class AppModule {}
 