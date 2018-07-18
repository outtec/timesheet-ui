import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimesheetProvider } from '../../providers/domain/timesheet.provider';


@IonicPage()
@Component({
  selector: 'page-timesheet-detail',
  templateUrl: 'timesheet-detail.html',
})
export class TimesheetDetailPage {

  timesheet: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public timesheetProvider: TimesheetProvider) {
  }

  ionViewDidLoad() {
    this.timesheetProvider.findById(this.navParams.get('timesheet_id'))
      .subscribe(response => {
        console.log(response['data']);
        this.timesheet = response['data'];
      },
        error => { })
  }
}


