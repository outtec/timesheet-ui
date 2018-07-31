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
    console.log( "id :" + thimesheet_collaboratorId)
    return this.http.get<TimesheetDto[]>(`${API_CONFIG.baseUrl}/timesheets?collaboratorid=${thimesheet_collaboratorId}`);
  }

  findById(timesheet_id: string){
    return this.http.get<TimesheetDto[]>(`${API_CONFIG.baseUrl}/timesheets/${timesheet_id}`);
  }

  insert(obj: TimesheetDto) : Observable<any> {
    let dateEnd ;
    let dateStart ;
    if (obj.endDateTime = " ") {obj.endDateTime = obj.startDateTime;}
    dateStart = new Date(obj.startDateTime);
    dateEnd = new Date(obj.endDateTime)
    obj.startDateTime = moment(dateStart).format('YYYY-MM-DDTHH:mm:ss');
    obj.endDateTime = moment(dateEnd).format('YYYY-MM-DDTHH:mm:ss');
    
    let horaInicial: any;
    let horaFinal: any;
    horaInicial = moment(obj.startDateTime).format("HH:mm");
    horaFinal = moment(obj.endDateTime).format("HH:mm");

    obj.totalTime = this.totalTime(horaInicial,horaFinal);
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
    obj.startDateTime = moment(dateStart).format('YYYY-MM-DDTHH:mm:ss');
    obj.endDateTime = moment(dateEnd).format('YYYY-MM-DDTHH:mm:ss');

    let horaInicial;
    let horaFinal;
    horaInicial = moment(obj.startDateTime).format("HH:mm");
    horaFinal = moment(obj.endDateTime).format("HH:mm");
    obj.totalTime = this.totalTime(horaInicial,horaFinal);
    
    return this.http.put(`${API_CONFIG.baseUrl}/timesheets/${timesheet_id}`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  delete(timesheet_id:string): Observable<any>{
    console.log("lançamento a ser deletado" + timesheet_id)
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
  let month = new Date().toISOString();
  let dateobj = new Date(obj.startDateTime);
  let strDateTimesheet = moment(dateobj).format('MM');
  let strToday = moment(dateobj).format('MM');
  return strDateTimesheet == strToday;
}

  totalTime(horaInicial, horaFinal){
    return this.time.calculaHorasParte(horaInicial,horaFinal)
  }

}