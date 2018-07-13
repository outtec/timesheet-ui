import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {
      
      this.formGroup = this.formBuilder.group({
        nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
        senha: ['123', [Validators.required]],
      });
    }
    
    ionViewDidLoad() {
    }
    
 /*   
    signupUser() {
      this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk()
      },
      error => {});
    }
   
 */ 
    showInsertOk(): any {
      let alert = this.alertCtrl.create({
        title: 'Sucesso!',
        message: 'Cadastro efetuado com sucesso',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.pop(); //Para desempilhar essa página
            }
          }
        ]
      });
      alert.present();
    }

  }
  