import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../config/api.config';
import { Observable } from 'rxjs/Observable';
import { TimesheetDto } from '../../../models/timesheet.dto';

/*
  Generated class for the TimesheetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimesheetProvider {
  constructor(public http: HttpClient) {
    console.log('Hello TimesheetProvider Provider');
   
  }

  findAll(){
    console.log("FINDALL PROVIDER get na url");
    return this.http.get(`${API_CONFIG.baseUrl}/timesheets?collaboratorid=3`);
  } 
}

 /**
 * 
 * 
 

  findAll() : Observable<TimesheetDto[]> {
    console.log("provider tims");
    return this.http.get<TimesheetDto[]>(`${API_CONFIG.baseUrl}?collaboratorid=3`);
  
  }

  findAll(){
    return this.http.get(`${API_CONFIG.baseUrl}?collaboratorid=3`);
  } 

  }
 
  }
 */