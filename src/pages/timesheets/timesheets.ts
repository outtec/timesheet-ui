import { Component } from '@angular/core';

import { NavController, NavParams, Content } from 'ionic-angular';
import { TimesheetProvider } from '../../providers/domain/timesheet/timesheet.provider';
import { TimesheetDto } from '../../models/timesheet.dto';

@Component({
  selector: 'page-timesheets',
  templateUrl: 'timesheets.html',
  providers: [TimesheetProvider],
})
export class TimesheetsPage {

  nlancamentos: TimesheetDto[];
  public lancamentos : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private timesheetProvider: TimesheetProvider
    ) {
  }

 

  ionViewDidLoad() {
    this.loadData();
  }

  private loadData() {

    this.timesheetProvider.findAll()
      .subscribe(response => {  
       let data =(response as any);
       this.lancamentos = data.data.content;
       console.log(this.lancamentos); 
       console.log(data.data.numberOfElements);     
      },
    error =>{
      console.log(error);
    });

  }
  
  showDetail(timesheet_id: string){
    this.navCtrl.push('TimesheetDetailPage',{
      timesheet_id: timesheet_id
    })
  }

}
