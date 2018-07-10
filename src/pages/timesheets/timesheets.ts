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
    console.log("LOAD DATA CARREGOU"); 
    this.timesheetProvider.findAll()
      .subscribe(response => {
        console.log("AJOGAR"); 
        console.log(response);
          // let nLancamentos = reponse['content'];
       // this.lancamentos = this.lancamentos.concat(nLancamentos);
     },
    error =>{
      console.log(error);
    })
  }

}
