import { Component } from '@angular/core';

import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TimesheetProvider } from '../../providers/domain/timesheet.provider';
import { TimesheetDto } from '../../models/timesheet.dto';
import * as moment from 'moment';
import { StorageProvider } from '../../providers/storage.provider';
import { CollaboratorProvider } from '../../providers/domain/collaborator.provider';
import { CollaboratorDto } from '../../models/collaborator.dto';

@IonicPage()
@Component({
  selector: 'page-timesheets',
  templateUrl: 'timesheets.html',
  providers: [TimesheetProvider],
})
export class TimesheetsPage {

  nlancamentos: TimesheetDto[];
  collaborator: CollaboratorDto;
  id: string;

  public lancamentos : TimesheetDto[];
  public lancamentosConts : TimesheetDto[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private timesheetProvider: TimesheetProvider,
    private storageProvider: StorageProvider,
    private collaboratorProvider: CollaboratorProvider
    ) {
  }

  ionViewDidLoad() {

    }

  ionViewDidEnter(){
    let localUser = this.storageProvider.getLocalUser();
    if (localUser && localUser.email) {
      this.collaboratorProvider.findByEmail(localUser.email)
        .subscribe(response => {
          this.collaborator = response as CollaboratorDto;
          this.loadData();
        }, error => {
          if (error.status === 403) {
            this.navCtrl.setRoot('SigninPage');
          }
        })
      } else {
        this.navCtrl.setRoot('SigninPage');
      } 
  }

  private loadData() {
    this.timesheetProvider.findByCollaborator(this.collaborator.id)
      .subscribe(response => {
        let data = (response as any);
        this.lancamentos = data.data.content;

      },
        error => {
          console.log(error);
        });
  }
 
  showDetail(timesheet_id: string){
    this.navCtrl.push('TimesheetDetailPage',{
      timesheet_id: timesheet_id
    })
  }








}
