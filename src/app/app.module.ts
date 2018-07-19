import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { TimesheetProvider } from '../providers/domain/timesheet.provider';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { StorageProvider } from '../providers/storage.provider';

import { AuthProvider } from '../providers/auth.provider';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ImageUtilProvider } from '../providers/image-util.provider';
import { CollaboratorProvider } from '../providers/domain/collaborator.provider';
import { TabsPage } from '../pages/tabs/tabs';
import { CheckinPage } from '../pages/checkin/checkin';
import { TimesheetsPage } from '../pages/timesheets/timesheets';



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    CheckinPage,
    TimesheetsPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    CheckinPage,
    TimesheetsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthProvider,
    StorageProvider,
    TimesheetProvider,
    ImageUtilProvider,
    TimesheetProvider,
    CollaboratorProvider     
  ]
})
export class AppModule {}
 

