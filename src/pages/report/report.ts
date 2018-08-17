import { TimesheetDto } from './../../models/timesheet.dto';
import { CollaboratorDto } from './../../models/collaborator.dto';
import { UserProvider } from './../../providers/user.provider';
import { TimeProvider } from './../../providers/time.provider';
import { TimesheetProvider } from './../../providers/domain/timesheet.provider';
import { CollaboratorProvider } from './../../providers/domain/collaborator.provider';
import { StorageProvider } from './../../providers/storage.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  public collaborator;
  public lancamentosPorMes: any = [];
  public totalPorMes: any = "00:00";
  public totalMes: any = "00:00";
  public lancamentos: any = [];
  public totalApos21: any = "00:00";
  months: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageProvider: StorageProvider,
    public collaboratorProvider: CollaboratorProvider,
    public timesheetProvider: TimesheetProvider,
    public userProvider: UserProvider,
    public timeProvider: TimeProvider) {
  }

  ionViewDidEnter() {
    this.collaborator = this.userProvider.loadUser(this.storageProvider.getLocalUser());
    this.loadData();
  }
  private loadData() {
    this.loadLancamentos(this.collaborator.id);
    this.lancamentosPorMes = this.loadLancamentosPorMes();
    console.log(this.lancamentosPorMes)
    this.totalApos21 =  "00:00"
    this.lancamentos.map(lancamento => {
      var format = 'HH:mm'
      let horarioEntrada = moment(moment(lancamento.startDateTime).format("HH:mm"), format)
      let horarioSaida = moment(moment(lancamento.endDateTime).format("HH:mm"), format)
      let beforeTime = moment('21:00', format)
      let afterTime = moment('23:59', format);
      let total;
      if (horarioEntrada.isBetween(beforeTime, afterTime) && horarioSaida.isBetween(beforeTime, afterTime)) {
        console.log("aqui")
        this.timeProvider.diferencaHoras(moment(lancamento.startDateTime).format('HH:mm'), moment(lancamento.endDateTime).format('HH:mm'))
        total = this.timeProvider.diferencaHoras(moment(lancamento.startDateTime).format('HH:mm'), moment(lancamento.endDateTime).format('HH:mm'));
        this.totalApos21 =  this.timeProvider.somaHora(this.totalApos21, total)
      } else {
        if (horarioSaida.isBetween(beforeTime, afterTime)) {
          total = this.timeProvider.diferencaHoras("21:00", moment(lancamento.endDateTime).format('HH:mm')); 
        this.totalApos21 = this.timeProvider.somaHora(this.totalApos21, total)
        console.log(total)
        }
      }
      console.log(" fora do map   " + this.totalApos21)    
  })

  }

  private loadLancamentos(id): Observable<TimesheetDto[]> {
    this.timesheetProvider.findByCollaborator(id)
      .subscribe(response => {
        let data = (response as any);
        this.lancamentos = data.data.content as TimesheetDto;
      })
    return this.lancamentos;
  }

  private loadLancamentosPorMes(): Observable<TimesheetDto[]> {
    this.lancamentos = this.loadLancamentos(this.collaborator.id)
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
    return this.lancamentosPorMes;
  }


  private lancamentoApos21(lancamentosPorMes) {
    lancamentosPorMes.map(lancamento => {
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
        if (horarioSaida.isBetween(beforeTime, afterTime)) {
          console.log('SALDO DE HORAS PARA CALC 50% ' + lancamento.startDateTime + " - " + this.timeProvider.diferencaHoras("21:00", moment(lancamento.endDateTime).format('HH:mm')))
          this.lancamentosPorMes['Junho'].saldoAposHora = this.timeProvider.diferencaHoras(moment(lancamento.startDateTime).format('HH:mm'), moment(lancamento.endDateTime).format('HH:mm'))
        }
      }
  })
}

}
