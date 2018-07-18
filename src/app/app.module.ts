import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CheckinPage } from '../pages/checkin/checkin';

import { TimesheetsPage } from '../pages/timesheets/timesheets';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { TimesheetProvider } from '../providers/domain/timesheet.provider';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { StorageProvider } from '../providers/storage.provider';



@NgModule({
  declarations: [
    MyApp,
    TimesheetsPage,
    CheckinPage,
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
    CheckinPage,
    TimesheetsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //AuthInterceptorProvider,
    ErrorInterceptorProvider,
    //AuthProvider,
    StorageProvider,
    TimesheetProvider
      
  ]
})
export class AppModule {}
 

