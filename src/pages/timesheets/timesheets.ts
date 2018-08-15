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

  collaborator: CollaboratorDto;
  id: string;
  lancamentosPorMes: any = [];
  totalPorMes: any = "00:00";
  months: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];


  public lancamentos: TimesheetDto[];
  public lancamentosConts: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private timesheetProvider: TimesheetProvider,
    private storageProvider: StorageProvider,
    private collaboratorProvider: CollaboratorProvider,
    private timeProvider: TimeProvider) {
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
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
                mesdoLancamento = this.numeroParaMes(mesdoLancamento)
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

                var format = 'HH:mm'
 
                let horarioEntrada = moment(moment(lancamento.startDateTime).format("HH:mm"), format)
                let horarioSaida = moment(moment(lancamento.endDateTime).format("HH:mm"), format)
                let beforeTime = moment('21:00', format)
                let afterTime = moment('23:59', format);
       
                if (horarioEntrada.isBetween(beforeTime, afterTime) && horarioSaida.isBetween(beforeTime, afterTime)) {
                  this.timeProvider.diferencaHoras(moment(lancamento.startDateTime).format('HH:mm'), moment(lancamento.endDateTime).format('HH:mm'))
                  console.log('SALDO DE HORAS PARA CALC 50% ' + lancamento.startDateTime + " - " + this.timeProvider.diferencaHoras(moment(lancamento.startDateTime).format('HH:mm'), moment(lancamento.endDateTime).format('HH:mm'))
                  )
                } else {
                  if(horarioSaida.isBetween(beforeTime,afterTime)){
                    console.log('SALDO DE HORAS PARA CALC 50% ' + lancamento.startDateTime + " - " + this.timeProvider.diferencaHoras("21:00", moment(lancamento.endDateTime).format('HH:mm')))
                    this.lancamentosPorMes[mes].saldoAposHora = this.timeProvider.diferencaHoras(moment(lancamento.startDateTime).format('HH:mm'), moment(lancamento.endDateTime).format('HH:mm'))

                  }
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

  calcHoraApos21() {

  }

  newTimesheet() {
    this.navCtrl.push('TimesheetPage');
  }

  showDetail(timesheet_id: string) {
    this.navCtrl.push('TimesheetDetailPage', {
      timesheet_id: timesheet_id
    })

  }
  numeroParaMes(mes) {
    switch (mes) {
      case '01': { return 'Janeiro' }
      case '02': { return 'Fevereiro' }
      case '03': { return 'Marco' }
      case '04': { return 'Abril' }
      case '05': { return 'Maio' }
      case '06': { return 'Junho' }
      case '07': { return 'Julho' }
      case '08': { return 'Agosto' }
      case '09': { return 'Setembro' }
      case '10': { return 'Outubro' }
      case '11': { return 'Novembro' }
      case '12': { return 'Dezembro' }
    }
  }

}
