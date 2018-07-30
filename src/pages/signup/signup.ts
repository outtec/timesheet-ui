import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollaboratorProvider } from '../../providers/domain/collaborator.provider';

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
    public alertCtrl: AlertController,
    public collaboratorProvider: CollaboratorProvider) {
      
      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
    }
    
    ionViewDidLoad() {
    }
    
    
    signupUser() {
      console.log(this.formGroup.value)
      this.collaboratorProvider.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk()
      },
      error => {});
    }
   
 
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
  