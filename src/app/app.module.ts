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
import { TimesheetProvider } from '../providers/domain/timesheet/timesheet.provider';
import { SigninPage } from '../pages/signin/signin';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthProvider } from '../providers/auth.provider';
import { StorageProvider } from '../providers/storage.provider';


@NgModule({
  declarations: [
    MyApp,
    TimesheetsPage,
    CheckinPage,
    SigninPage,
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
    SigninPage,
    CheckinPage,
    TimesheetsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TimesheetProvider,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthProvider,
    StorageProvider,
      
  ]
})
export class AppModule {}
 