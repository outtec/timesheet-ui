import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, ModalController } from 'ionic-angular';
import { CredenciaisDto } from '../../models/credenciais.dto';
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
    public auth: AuthProvider,
    public modalCtrl: ModalController
  ) {

  }
  
  credenciais: CredenciaisDto = {
    email: "",
    password: ""
  };

  ionViewDidEnter() {
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfullLogin(response.headers.get('Authorization'));  
      this.navCtrl.setRoot('TabsPage');  
    },
    error => {}) 
  }

  login() {
    this.auth.authenticate(this.credenciais)
      .subscribe(response => {   
        this.auth.successfullLogin(response.headers.get('Authorization'));  
        this.navCtrl.setRoot('TabsPage');
      },
      error => {})
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }  

  forgotPassword() {
    const modal = this.modalCtrl.create('ForgotPasswordPage');
    modal.present();
  }

}
