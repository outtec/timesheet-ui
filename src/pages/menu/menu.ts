import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController,  Nav } from 'ionic-angular';
import { CheckinPage } from '../checkin/checkin';
import { TimesheetsPage } from '../timesheets/timesheets';
import { TabsPage } from '../tabs/tabs';


export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

rootPage = 'TabsPage';

@ViewChild(Nav) nav : Nav;

page: PageInterface[] = [
  {title:'Checkin', pageName:'TabsPage', tabComponent: CheckinPage, index:0, icon:'pin'},
  {title:'Timesheets', pageName:'TabsPage', tabComponent: TimesheetsPage, index:1, icon:'list'},
  {title:'Perfil', pageName:'ProfilePage', icon:'list'}
]
  constructor(public navCtrl: NavController) {}
  openPage(page: PageInterface) {
    let params = {};
 
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
 
      this.nav.setRoot(page.pageName, params);
    }
  }
 
  isActive(page: PageInterface) {

    let childNav = this.nav.getActiveChildNav();
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }
 
}