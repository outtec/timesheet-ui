import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth.provider';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  formGroup: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    private toastCtrl: ToastController) {

      this.formGroup = this.formBuilder.group({
        email: [null, [Validators.required]]
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  recoverPassword(){
    let email = this.formGroup.value;
    this.authProvider.resetPassword(email)
    .subscribe(response => {
      this.presentToast('Sua nova senha foi enviada para o seu email!!');
      this.dismiss();
    });
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
