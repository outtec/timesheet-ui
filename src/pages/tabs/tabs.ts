import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector:'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = 'CheckinPage';
  tab2Root: any = 'TimesheetsPage';
  tab3Root: any = 'ReportPage';
  myIndex : number;

  constructor(navParams: NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
