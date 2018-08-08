import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TimesheetProvider } from '../../providers/domain/timesheet.provider';
import { TimesheetDto } from '../../models/timesheet.dto';
import { ElementRef } from '@angular/core'
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-timesheet-detail',
  templateUrl: 'timesheet-detail.html',
})
export class TimesheetDetailPage {

  ts: any;
  confirmAction: any;
  dataInicial: any;
  public isDisabled: boolean;
  public isConfirm: boolean;
  public isEdit: boolean;
  public isDelete: boolean;

  timesheet: TimesheetDto = {
    id: "",
    startDateTime: "",
    endDateTime: "",
    isHoliday: false,
    isInTravel: false,
    periodDescription: "",
    collaboratorId: "",
    totalTime:""
  }
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public timesheetProvider: TimesheetProvider,
    private alertCtrl: AlertController) {
  }

  @ViewChild('datePicker') datePicker;
  open() {
    this.datePicker.open();
  }
  @ViewChild('startDateTime') startDateTimeRef: ElementRef;
  @ViewChild('endDateTime') endDateTimeRef: ElementRef;
  @ViewChild('isHoliday') isHolidayRef: ElementRef;
  @ViewChild('isInTravel') isInTravelRef: ElementRef;



  ionViewDidLoad() {
    this.isDisabled = true;
    this.isConfirm = true;
    this.timesheetProvider.findById(this.navParams.get('timesheet_id'))
      .subscribe(response => {
        console.log(response['data']);
        this.ts = response['data'];
      },
        error => { })
  }

  isEditable() {
    this.isConfirm = false;
    this.isEdit = true;
    this.isDelete = true;
    this.isDisabled = false;
  }


  confirmar(){
    this.timesheet.startDateTime = (moment(this.ts.startDateTime).format('YYYY-MM-DDT') + this.startDateTimeRef.value +":00")
    this.timesheet.endDateTime = (moment(this.ts.endDateTime).format('YYYY-MM-DDT') + this.endDateTimeRef.value +":00")
    this.timesheet.isHoliday = this.isHolidayRef.value
    this.timesheet.isInTravel = this.isInTravelRef.value
    this.timesheet.collaboratorId = this.ts.collaboratorId
    console.log(this.timesheet)
    this.timesheetProvider.update(this.timesheet, this.ts.id)
    .subscribe(response => {
      this.navCtrl.setRoot('TabsPage');
      console.log(response);
    },
      error => {
        console.log(error);

      })
  }

  deletar() {
    let alert = this.alertCtrl.create({
      title: 'Confirma a exclusão?',
      message: 'Essa ação não poderá ser desfeita!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.confirmAction = 'cancelou' ;
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.timesheetProvider.delete(this.ts.id)
            .subscribe(response => {
              if(response.ok){
                this.navCtrl.pop();
              }
            },
              error => {
              })
          }
        }
      ]
    });
      alert.present();      
  }
 
}
