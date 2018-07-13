import { Component } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { TimesheetDto } from '../../models/timesheet.dto';
import { TimesheetProvider } from '../../providers/domain/timesheet/timesheet.provider';


@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckinPage {

timesheet : TimesheetDto = {
  id : null,
  startDateTime : new Date().toISOString(),
  endDateTime : "",
  isHoliday : false,
  isInTravel :false,
  periodDescription: "",
  collaboratorId: 3,

 
}
  constructor(public navCtrl: NavController,
    private timesheetProvider: TimesheetProvider) {
  }
  checkin(){

    this.timesheetProvider.insert(this.timesheet)
      .subscribe(response => {
       
        console.log(response);
     },
    error =>{
      console.log(error);
    })
  }

}

