import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimesheetProvider } from '../../providers/domain/timesheet/timesheet.provider';
import { HttpClient } from '@angular/common/http';
import { TimesheetDto } from '../../models/timesheet.dto';

@Component({
  selector: 'page-timesheets',
  templateUrl: 'timesheets.html',
  providers: [TimesheetProvider],
})
export class TimesheetsPage {

  lancamentos: TimesheetDto[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private timesheetProvider: TimesheetProvider,
    public http: HttpClient, ) {
  }
  ionViewDidLoad() {
    this.loadData();
  }

  private loadData() {
    this.timesheetProvider.findAll()
      .subscribe(reponse => {
        
        const data = (reponse as any);
        const user = JSON.parse(data);

       // let nLancamentos = reponse['content'];
       // this.lancamentos = this.lancamentos.concat(nLancamentos);
     },
    error =>{
      console.log(error);
    })
  }

}
