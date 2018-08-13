import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimesheetDto } from '../../models/timesheet.dto';
import { TimesheetProvider } from '../../providers/domain/timesheet.provider';
import { CollaboratorProvider } from '../../providers/domain/collaborator.provider';
import { StorageProvider } from '../../providers/storage.provider';
import { CollaboratorDto } from '../../models/collaborator.dto';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@IonicPage()
@Component({
  selector: 'page-timesheet',
  templateUrl: 'timesheet.html',
})
export class TimesheetPage {

  collaborator: CollaboratorDto;
  timesheet: TimesheetDto = {
    id: "",
    startDateTime: "",
    endDateTime: "",
    isHoliday: false,
    isInTravel: false,
    periodDescription: "",
    collaboratorId: "",
    totalTime: ""
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public collaboratorProvider: CollaboratorProvider,
    public storageProvider: StorageProvider,
    public timesheetProvider: TimesheetProvider
  ) {

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
    this.timesheet.startDateTime = moment(new Date().toISOString()).locale('pt-br').format();
    this.timesheet.collaboratorId = this.collaborator.id;
    console.log(this.timesheet)
    this.timesheetProvider.insert(this.timesheet)
      .subscribe(response => {
        this.navCtrl.setRoot('TabsPage');
        console.log(response);
      },
        error => {
          console.log(error);
        })
  }
}
