import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimesheetProvider } from '../../providers/domain/timesheet/timesheet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-timesheets',
  templateUrl: 'timesheets.html',
  providers:[TimesheetProvider],
})
export class TimesheetsPage {
  constructor(
    public navCtrl: NavController, 
    public navParams:NavParams,
    private timesheetProvider: TimesheetProvider,
    public http: HttpClient,) {
  }
ionViewDidLoad(){
 this.timesheetProvider.findAll().subscribe(data =>
  { const response = (data as any);
   console.log(response);
  }, error =>{
    console.log(error);
  });
}
}
