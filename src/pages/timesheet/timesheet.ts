import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TimesheetDto } from '../../models/timesheet.dto';
import { TimesheetProvider } from '../../providers/domain/timesheet.provider';
import { CollaboratorProvider } from '../../providers/domain/collaborator.provider';
import { StorageProvider } from '../../providers/storage.provider';
import { CollaboratorDto } from '../../models/collaborator.dto';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { TimeProvider } from '../../providers/time.provider';

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
    public timesheetProvider: TimesheetProvider,
    public timeProvider: TimeProvider,
    public alertCtrl : AlertController
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
    this.timesheet.collaboratorId = this.collaborator.id;
    let horaentrada = moment.parseZone(this.timesheet.startDateTime).utc().format("HH:mm")
    let horasaida = this.timesheet.endDateTime
    if(this.timeProvider.isHoraInicialMenorHoraFinal(horaentrada,horasaida) === true){
    let date = moment(this.timesheet.startDateTime).format("YYYY-MM-DD") + "T" + horasaida + ":00Z";
    this.timesheet.endDateTime = new Date(date).toISOString();
    this.timesheetProvider.save(this.timesheet)
      .subscribe(response => {
        this.navCtrl.setRoot('TabsPage');
        console.log(response);
      },
        error => {
          console.log(error);
        })
      }else{
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'O horário de entrada é maior que o horário de saída',
            buttons: ['OK']
          });
          alert.present();
      }
  }
}
