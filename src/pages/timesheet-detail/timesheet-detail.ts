import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { TimesheetProvider } from '../../providers/domain/timesheet.provider';
import { TimesheetDto } from '../../models/timesheet.dto';



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

  editar() {
    console.log(this.ts.periodDescription)
    this.isConfirm = false;
    this.isEdit = true;
    this.isDelete = true;
    this.isDisabled = false;
  }

  confirmar(){
    console.log(" PASSANDO O TS CERTO :"+this.ts.endDateTime)
    this.timesheetProvider.update(this.ts, this.ts.id)
    .subscribe(response => {
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
