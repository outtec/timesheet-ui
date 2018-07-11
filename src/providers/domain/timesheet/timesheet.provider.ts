import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../../config/api.config';
import { Observable } from 'rxjs/Observable';
import { TimesheetDto } from '../../../models/timesheet.dto';
import { InstanceProperty } from '@ionic-native/core';

/*
  Generated class for the TimesheetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimesheetProvider {
  constructor(public http: HttpClient) {
   
  }
  findAll() {
    console.log("provider timsheet GET na ");
    return this.http.get(`${API_CONFIG.baseUrl}/timesheets?collaboratorid=3`);
  } 
  insert(obj:TimesheetDto){
    console.log("O QUE PASSEI NO POST")
    console.log(obj)
    return this.http.post(`${API_CONFIG.baseUrl}/timesheets`,
  obj,
{
  observe: 'response',
  responseType:'text'
});
  }
/**
  findAlls() : Observable<TimesheetDto[]> {
    console.log("provider timsheet GET na API");
    return this.http.get<TimesheetDto[]>(`${API_CONFIG.baseUrl}/timesheets?collaboratorid=3`);
  
  } */ 
}