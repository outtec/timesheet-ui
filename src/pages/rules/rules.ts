import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CollaboratorProvider } from '../../providers/domain/collaborator.provider';
import { StorageProvider } from '../../providers/storage.provider';
import { CollaboratorDto } from '../../models/collaborator.dto';
import { RulesDto } from '../../models/rules.dto';
import { RulesProvider } from '../../providers/domain/rules.provider';
import { FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-rules',
  templateUrl: 'rules.html',
})
export class RulesPage {
  collaborator: CollaboratorDto;
  rule : RulesDto = {
    id: "",
    rule: "",
    initialHour:  "",
    finalHour: "",
    value: "", 
    collaboratorId: ""
  } 

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public collaboratorProvider: CollaboratorProvider,
    public storageProvider: StorageProvider,
    public rulesProvider: RulesProvider) {

  }

  ionViewDidLoad() {
    this.loadData();

  }

  private loadData() {
    this.loadUser(this.storageProvider.getLocalUser());
  }

  loadUser(localUser) {
    if (localUser && localUser.email) {
      this.collaboratorProvider.findByEmail(localUser.email)
        .subscribe(response => {
          this.collaborator = response as CollaboratorDto;
        })
    }
  }

  confirmar() {
    this.rule.collaboratorId = this.collaborator.id;
    this.rulesProvider.insert(this.rule)
      .subscribe(response => {
        this.navCtrl.setRoot('TabsPage');
        console.log(response);
      },
        error => {
          console.log(error);
        })
  }

}
