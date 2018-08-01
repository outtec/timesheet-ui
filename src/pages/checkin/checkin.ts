import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { TimesheetDto } from '../../models/timesheet.dto';
import { TimesheetProvider } from '../../providers/domain/timesheet.provider';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { CollaboratorDto } from '../../models/collaborator.dto';
import { StorageProvider } from '../../providers/storage.provider';
import { CollaboratorProvider } from '../../providers/domain/collaborator.provider';
import { Content } from 'ionic-angular';
import { makeDecorator } from '@angular/core/src/util/decorators';

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckinPage {
  @ViewChild(Content) content: Content;

  public isCheckInDisabled: boolean;
  public isCheckOutDisabled: boolean;
  public lancamentosPorData: TimesheetDto[];
  public lancamentosPorMes: any;
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

  constructor(public navCtrl: NavController,
    private timesheetProvider: TimesheetProvider,
    private storageProvider: StorageProvider,
    private collaboratorProvider: CollaboratorProvider,
    private loadingCtrl: LoadingController
  ) {
  }


  ionViewDidEnter() {
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
    }
  }


  checkin() {
    this.timesheet.collaboratorId = this.collaborator.id
    this.timesheetProvider.insert(this.timesheet)
      .subscribe(response => {
        location.reload();
        console.log(response);
      },
        error => {
          console.log(error);
        })
  }


  checkout() {
    this.timesheetProvider.update(this.timesheet, this.lancamentosPorData[0].id)
      .subscribe(response => {
        location.reload();
        console.log(response);
      },
        error => {
          console.log(error);

        })
  }

  private loadData() {
    let lancamentos: any;
    this.timesheetProvider.findByCollaborator(this.collaborator.id)
      .subscribe(response => {
        let data = (response as any);
        lancamentos = data.data.content;
        this.lancamentosPorData = lancamentos.filter(this.timesheetProvider.byDate)      
        if (this.lancamentosPorData.length != 0 && (moment(this.lancamentosPorData[0].startDateTime).format('DD/MM/YYYY HH:mm') === moment(this.lancamentosPorData[0].endDateTime).format('DD/MM/YYYY HH:mm'))) {
          this.timesheet.startDateTime = moment(this.lancamentosPorData[0].startDateTime).locale('pt-br').format();
          this.timesheet.endDateTime = "";
          this.timesheet.periodDescription = this.lancamentosPorData[0].periodDescription;
          this.timesheet.isInTravel = this.lancamentosPorData[0].isInTravel;
          this.timesheet.isHoliday = this.lancamentosPorData[0].isHoliday;
          this.setCheckoutTrue();
        } else {
          this.timesheet.startDateTime = moment(new Date().toISOString()).locale('pt-br').format();
          this.setCheckinTrue();
        }
      },
        error => {
          console.log(error);
        })
  }
  setCheckinTrue() {
    this.isCheckInDisabled = false;
    this.isCheckOutDisabled = true;
  }

  setCheckoutTrue() {
    this.timesheet.endDateTime = moment(new Date().toISOString()).locale('pt-br').format();
    this.isCheckInDisabled = true;
    this.isCheckOutDisabled = false;
  }

}

