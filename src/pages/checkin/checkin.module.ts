import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinPage } from './checkin';
import { CollaboratorProvider } from '../../providers/domain/collaborator.provider';
import { TimesheetProvider } from '../../providers/domain/timesheet.provider';

@NgModule({
  declarations: [
    CheckinPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinPage),
  ],
  providers: [
],
exports: [
  CheckinPage,
]
})
export class CheckinPageModule {}



  