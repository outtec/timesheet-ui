
import { Component, ViewChild } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav } from 'ionic-angular';
import { CheckinPage } from '../pages/checkin/checkin';
import { TimesheetsPage } from '../pages/timesheets/timesheets';
import { ReportPage } from './../pages/report/report';
import { AuthProvider } from '../providers/auth.provider';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@Component({

  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:string = 'SigninPage';
  @ViewChild(Nav) nav : Nav;

  pages: PageInterface[] = [
    {title:'Checkin', pageName:'TabsPage', tabComponent: CheckinPage, index:0, icon:'pin'},
    {title:'Timesheets', pageName:'TabsPage', tabComponent: TimesheetsPage, index:1, icon:'time'},
    //{title:'Reports', pageName:'TabsPage', tabComponent: ReportPage, index:3, icon:'list-box'},
    //{title:'Regras de Negócio', pageName:'RulesPage', icon:'briefcase'},
    {title:'Perfil', pageName:'ProfilePage', icon:'contact'},
    {title:'Sair', pageName:'SigninPage', icon:'log-out'}

  ]

  
  constructor(platform: Platform, 
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public authProvider: AuthProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });



  }

  openPage(page: PageInterface) {
    if (page.title === 'Sair') {
      this.authProvider.logout();
      this.nav.setRoot('SigninPage');
    }
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
