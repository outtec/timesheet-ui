import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { SigninPage } from './signin';

@NgModule({
    declarations: [SigninPage],
    imports: [IonicPageModule.forChild(SigninPage)],
    entryComponents: [],
    providers: [],
    exports:[SigninPage]
  })
  export class SigninModule {}