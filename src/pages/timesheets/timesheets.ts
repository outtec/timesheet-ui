import { UserProvider } from './../../providers/user.provider';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TimesheetProvider } from '../../providers/domain/timesheet.provider';
import { TimesheetDto } from '../../models/timesheet.dto';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { StorageProvider } from '../../providers/storage.provider';
import { CollaboratorProvider } from '../../providers/domain/collaborator.provider';
import { CollaboratorDto } from '../../models/collaborator.dto';
import { TimeProvider } from '../../providers/time.provider';

@IonicPage()
@Component({
  selector: 'page-timesheets',
  templateUrl: 'timesheets.html',
  providers: [TimesheetProvider],
})
export class TimesheetsPage {

  public collaborator;
  id: string;
  lancamentosPorMes: any = [];
  totalPorMes: any = "00:00";
  public lancamentos: TimesheetDto[];
  public lancamentosConts: any;
  months: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private timesheetProvider: TimesheetProvider,
    private storageProvider: StorageProvider,
    private collaboratorProvider: CollaboratorProvider,
    private timeProvider: TimeProvider) {
  }

  ionViewDidEnter(){
    //this.collaborator = this.userProvider.loadUser(this.storageProvider.getLocalUser());
    this.loadData();
  }

  private loadData() {
    let localUser = this.storageProvider.getLocalUser();
    if (localUser && localUser.email) {
      this.collaboratorProvider.findByEmail(localUser.email)
        .subscribe(response => {
          this.collaborator = response as CollaboratorDto;
          this.timesheetProvider.findByCollaborator(this.collaborator.id)
            .subscribe(response => {
              let data = (response as any);
              this.lancamentos = data.data.content;
              let mes = '';
              this.lancamentos.map(lancamento => {
                let mesdoLancamento = moment(lancamento.startDateTime).format('MM');
                mesdoLancamento = this.timesheetProvider.numeroParaMes(mesdoLancamento)
                if (mes !== mesdoLancamento) {
                  mes = mesdoLancamento;
                  this.lancamentosPorMes[mes] = [lancamento];
                  this.totalPorMes = "00:00";
                  this.totalPorMes = this.timeProvider.somaHora(this.totalPorMes, lancamento.totalTime)
                  this.lancamentosPorMes[mes].totalPorMes = [this.totalPorMes]
                } else {
                  this.lancamentosPorMes[mes].push(lancamento)
                  this.totalPorMes = this.timeProvider.somaHora(this.totalPorMes, lancamento.totalTime)
                  this.lancamentosPorMes[mes].totalPorMes = [this.totalPorMes]
                }
              })
              console.log(this.lancamentosPorMes)
            },
              error => {
                console.log(error);
              });

        }, error => {
          if (error.status === 403) {
            this.navCtrl.setRoot('SigninPage');
          }
        })
    } else {
      this.navCtrl.setRoot('SigninPage');
    }
  }

  newTimesheet() {
    this.navCtrl.push('TimesheetPage');
  }

  showDetail(timesheet_id: string) {
    this.navCtrl.push('TimesheetDetailPage', {
      timesheet_id: timesheet_id
    })
  }

}