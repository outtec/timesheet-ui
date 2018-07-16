import { Component } from '@angular/core';

import { NavController, DateTime, Refresher } from 'ionic-angular';
import { TimesheetDto } from '../../models/timesheet.dto';
import { TimesheetProvider } from '../../providers/domain/timesheet/timesheet.provider';
import * as moment from 'moment';


@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckinPage {

public isCheckInDisabled : boolean;
public isCheckOutDisabled : boolean;
public lancamentosPorData : any;

timesheet : TimesheetDto = {
  id : null,
  startDateTime : "",
  endDateTime : "",
  isHoliday : false,
  isInTravel :false,
  periodDescription: "",
  collaboratorId: 3,
  }

  constructor(public navCtrl: NavController,
    private timesheetProvider: TimesheetProvider) {
  }
  ionViewDidLoad() {
    this.loadData();
  }
  
 byDate(obj) {
    let today = new Date().toISOString();
    let dateobj = new Date(obj.startDateTime);
    let strDateTimesheet = moment(dateobj).format('DD/MM/YYYY');
    let strToday = moment(today).format('DD/MM/YYYY');
    console.log("POG CARREGA DATA : " + strToday);
    return strDateTimesheet == strToday;
  }

 byHoliday(obj){
    return obj.isHoliday == true;
  }

 byTravel(obj){
    return obj.isInTravel == false;
  }

  checkin() {
    this.timesheetProvider.insert(this.timesheet)
      .subscribe(response => {
        console.log(response);
      },
        error => {
          console.log(error);
        })
  }

  checkout() {
    this.timesheetProvider.update(this.timesheet, this.lancamentosPorData[0].id)
      .subscribe(response => {
      
      },
        error => {
          console.log(error);
          console.log(this.timesheet)
        })
  }

  private loadData() {
    let lancamentos : any;
    this.timesheetProvider.findAll()
      .subscribe(response => {
        
        let data = (response as any);
        lancamentos = data.data.content;
        this.lancamentosPorData = lancamentos.filter(this.byDate)
        
        if(this.lancamentosPorData[0].startDateTime === this.lancamentosPorData[0].endDateTime){
          this.isCheckInDisabled = true;
          this.isCheckOutDisabled = false;
          this.timesheet.startDateTime = new Date(moment(this.lancamentosPorData[0].startDateTime).locale('pt-br').format()).toISOString();
          this.timesheet.endDateTime = "";
          this.timesheet.periodDescription = this.lancamentosPorData[0].periodDescription;
          this.timesheet.isInTravel = this.lancamentosPorData[0].isInTravel;
          this.timesheet.isHoliday = this.lancamentosPorData[0].isHoliday;
        }else{
          this.timesheet.startDateTime = moment(new Date()).locale('pt-br').format();
          this.isCheckInDisabled = false;
          this.isCheckOutDisabled = true;
        }
      },
        error => {
          console.log(error);
        })  
  }

}

