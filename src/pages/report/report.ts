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


@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  public collaborator;
  public lancamentos: any = [];

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
    public storageProvider: StorageProvider,
    public collaboratorProvider: CollaboratorProvider,
    public timesheetProvider: TimesheetProvider,
    public userProvider: UserProvider,
    public timeProvider: TimeProvider) {
  }

  ionViewDidEnter() {
    this.collaborator = this.userProvider.loadUser(this.storageProvider.getLocalUser());
    //this.loadData();
  }
  private loadData() {
  
  }

  private loadLancamentos(id): Observable<TimesheetDto[]> {
    this.timesheetProvider.findByCollaborator(id)
      .subscribe(response => {
        let data = (response as any);
        this.lancamentos = data.data.content as TimesheetDto;
      })
    return this.lancamentos;
  }


}
