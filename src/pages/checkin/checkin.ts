import { Component } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { TimesheetDto } from '../../models/timesheet.dto';


@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckinPage {

timesheet : TimesheetDto = {
  id :"",
  startDateTime : new Date().toISOString(),
  endDateTime : "",
  isHoliday : false,
  isInTravel :false,
  periodDescription: "",
  collaboratorId: 3,

 
}
  constructor(public navCtrl: NavController) {

    
    
  }
  checkin(){
    console.log(this.timesheet);
  }

}
