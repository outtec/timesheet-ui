import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { CheckinPage } from '../checkin/checkin';
import { TimesheetsPage } from '../timesheets/timesheets';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CheckinPage;
  tab2Root = TimesheetsPage;
  tab3Root = LoginPage;
  
  constructor() {

  }
}
