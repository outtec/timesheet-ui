import { TimesheetDto } from './../../models/timesheet.dto';
import { UserProvider } from './../../providers/user.provider';
import { TimeProvider } from './../../providers/time.provider';
import { TimesheetProvider } from './../../providers/domain/timesheet.provider';
import { CollaboratorProvider } from './../../providers/domain/collaborator.provider';
import { StorageProvider } from './../../providers/storage.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  public collaborator;
  public lancamentos: any = [];
  
  formGroup: FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storageProvider: StorageProvider,
    public collaboratorProvider: CollaboratorProvider,
    public timesheetProvider: TimesheetProvider,
    public userProvider: UserProvider,
    public timeProvider: TimeProvider) {

      this.formGroup = this.formBuilder.group({
        startPeriod: ['', [Validators.required]],
        endPeriod: ['', [Validators.required]],
      });
  
  }

  ionViewDidEnter() {
    this.collaborator = this.userProvider.loadUser(this.storageProvider.getLocalUser());
    console.log(this.collaborator)
    //this.loadData();
  }
  private loadData() {
  }

  report() {
    console.log(this.formGroup.get('startPeriod').value);
    this.timesheetProvider.findByPeriod(this.collaborator.id,this.formGroup.get('startPeriod').value,this.formGroup.get('endPeriod').value)
    .subscribe(response => {
      let data = (response as any);
      this.lancamentos = data.data.content as TimesheetDto;
      console.log(response);
    },
    error => {});
  }



}
