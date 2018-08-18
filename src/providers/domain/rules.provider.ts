import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Observable';
import { TimeProvider } from '../time.provider';
import { RulesDto } from '../../models/rules.dto';

@Injectable()
export class RulesProvider {
  constructor(public http: HttpClient,
                public time: TimeProvider) {

  }

  insert(obj: RulesDto) : Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/rules`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      });
  }
}