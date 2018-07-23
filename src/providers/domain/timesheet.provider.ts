import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Observable';
import { TimesheetDto } from '../../models/timesheet.dto';
import * as moment from 'moment';
import 'moment/locale/pt-br';

/*
  Generated class for the TimesheetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimesheetProvider {
  constructor(public http: HttpClient) {

  }
  findByCollaborator(thimesheet_collaboratorId: string): Observable<TimesheetDto[]> {
    console.log( "id :" + thimesheet_collaboratorId) 

    return this.http.get<TimesheetDto[]>(`${API_CONFIG.baseUrl}/timesheets?collaboratorid=${thimesheet_collaboratorId}`);

  }

  findById(timesheet_id: string){
    return this.http.get<TimesheetDto[]>(`${API_CONFIG.baseUrl}/timesheets/${timesheet_id}`);
  }

  insert(obj: TimesheetDto) : Observable<any> {
    var dateStart = new Date(obj.startDateTime);
    var dateEnd = new Date(obj.endDateTime);
    obj.startDateTime = moment(dateStart).format('YYYY-MM-DDTHH:mm:ss');
    obj.endDateTime = moment(dateEnd).format('YYYY-MM-DDTHH:mm:ss');
    return this.http.post(`${API_CONFIG.baseUrl}/timesheets`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  update(obj: TimesheetDto, timesheet_id: string): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}/timesheets/${timesheet_id}`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

}