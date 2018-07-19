import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthProvider } from '../../providers/auth.provider';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  credenciais: CredenciaisDTO = {
    email: "",
    password: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthProvider
  ) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfullLogin(response.headers.get('Authorization'));  
      this.navCtrl.setRoot(TabsPage);  
    },
    error => {}) 
  }

  login() {
    console.log("Iniciando autenticação")
    this.auth.authenticate(this.credenciais)
      .subscribe(response => {   
        this.auth.successfullLogin(response.headers.get('Authorization'));  
        this.navCtrl.setRoot(TabsPage);
      },
      error => {})
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }  

}
