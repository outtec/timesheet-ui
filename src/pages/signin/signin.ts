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

  credenciais: CredenciaisDTO = {
    email: "",
    senha: "",
    perfil: ""
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
      const user = JSON.parse(response.body)
      this.auth.successfullLogin(user.data.token);
      console.log("REFRESH")
      // this.navCtrl.setRoot('TimesheetPage');  
    },
    error => {}) 
  }

  login() {
    this.auth.authenticate(this.credenciais)
      .subscribe(response => {     
        const user = JSON.parse(response.body)
        console.log(user.data.token); 
        this.auth.successfullLogin(user.data.token);
        console.log("AUTENTICOU")
      },
      error => {})
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }  

}
