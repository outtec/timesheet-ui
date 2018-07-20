import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthProvider } from '../../providers/auth.provider';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthProvider
  ) {

  }
  
  credenciais: CredenciaisDTO = {
    email: "",
    password: ""
  };

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
      this.navCtrl.setRoot('MenuPage');  
    },
    error => {}) 
  }

  login() {
    this.auth.authenticate(this.credenciais)
      .subscribe(response => {   
        this.auth.successfullLogin(response.headers.get('Authorization'));  
        this.navCtrl.setRoot('MenuPage');
      },
      error => {})
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }  

}
