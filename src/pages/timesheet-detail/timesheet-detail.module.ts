import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimesheetDetailPage } from './timesheet-detail';

@NgModule({
  declarations: [
    TimesheetDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TimesheetDetailPage),
  ],
})
export class TimesheetDetailPageModule {}
