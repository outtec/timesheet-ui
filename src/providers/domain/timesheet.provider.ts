import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Observable';
import { TimesheetDto } from '../../models/timesheet.dto';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { TimeProvider } from '../time.provider';


@Injectable()
export class TimesheetProvider {
  constructor(public http: HttpClient,
    public time: TimeProvider) {

  }
 
  findByCollaborator(thimesheet_collaboratorId: string): Observable<TimesheetDto[]> {
    return this.http.get<TimesheetDto[]>(`${API_CONFIG.baseUrl}/timesheets?collaboratorid=${thimesheet_collaboratorId}`);
  }

  findById(timesheet_id: string) {
    return this.http.get<TimesheetDto[]>(`${API_CONFIG.baseUrl}/timesheets/${timesheet_id}`);
  }

save(obj: TimesheetDto): Observable<any> {
console.log("save")
    let horaInicial = moment(obj.startDateTime).format("HH:mm");
    let horaFinal = moment(obj.endDateTime).format("HH:mm");
    obj.totalTime = this.totalTime(horaInicial, horaFinal);
    console.log(obj)

    return this.http.post(`${API_CONFIG.baseUrl}/timesheets`,
    obj,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  insert(obj: TimesheetDto): Observable<any> {
    let dateEnd;
    let dateStart;

    if (obj.endDateTime = "Invalid date") {
      obj.endDateTime = obj.startDateTime;
    }
    dateStart = new Date(obj.startDateTime);
    dateEnd = new Date(obj.endDateTime)
    obj.startDateTime = moment(dateStart).format('YYYY-MM-DDTHH:mm');
    obj.endDateTime = moment(dateEnd).format('YYYY-MM-DDTHH:mm');

    let horaInicial: any;
    let horaFinal: any;
    horaInicial = moment(obj.startDateTime).format("HH:mm");
    horaFinal = moment(obj.endDateTime).format("HH:mm");

    obj.totalTime = this.totalTime(horaInicial, horaFinal);
    console.log(obj)
    return this.http.post(`${API_CONFIG.baseUrl}/timesheets`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  update(obj: TimesheetDto, timesheet_id: string): Observable<any> {
    let dateEnd;
    let dateStart;
    dateStart = new Date(obj.startDateTime);
    dateEnd = new Date(obj.endDateTime)
    obj.startDateTime = moment(dateStart).format('YYYY-MM-DDTHH:mm');
    obj.endDateTime = moment(dateEnd).format('YYYY-MM-DDTHH:mm');

    let horaInicial;
    let horaFinal;
    horaInicial = moment(obj.startDateTime).format("HH:mm");
    horaFinal = moment(obj.endDateTime).format("HH:mm");
    obj.totalTime = this.totalTime(horaInicial, horaFinal);

    return this.http.put(`${API_CONFIG.baseUrl}/timesheets/${timesheet_id}`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  delete(timesheet_id: string): Observable<any> {
    return this.http.delete(`${API_CONFIG.baseUrl}/timesheets/${timesheet_id}`,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  byDate(obj) {
    let today = new Date().toISOString();
    let dateobj = new Date(obj.startDateTime);
    let strDateTimesheet = moment(dateobj).format('DD/MM/YYYY');
    let strToday = moment(today).format('DD/MM/YYYY');
    return strDateTimesheet == strToday;
  }

  byMonth(obj) {
    let dateobj = new Date(obj.startDateTime);
    let strDateTimesheet = moment(dateobj).format('MM');
    let strToday = moment(dateobj).format('MM');
    return strDateTimesheet == strToday;
  }

  byHoliday(obj) {
    return obj.isHoliday == true;
  }

  byTravel(obj) {
    return obj.isInTravel == false;
  }

  totalTime(horaInicial, horaFinal) {
    return this.time.calculaHorasParte(horaInicial, horaFinal)
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