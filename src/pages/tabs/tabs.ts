import { Component } from '@angular/core';

import { CheckinPage } from '../checkin/checkin';
import { TimesheetsPage } from '../timesheets/timesheets';
import { SigninPage } from '../signin/signin';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CheckinPage;
  tab2Root = TimesheetsPage;
  tab3Root = SigninPage;
  
  constructor() {

  }
}
