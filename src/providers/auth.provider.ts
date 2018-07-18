import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { JwtHelper } from "angular2-jwt";
import { StorageProvider } from "./storage.provider";
import { TimesheetProvider } from "./domain/timesheet.provider";

@Injectable()
export class AuthProvider {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient,
        public storage: StorageProvider,
        public timesheetProvider: TimesheetProvider
        ) {
    }
   
    authenticate(credenciais: CredenciaisDTO) {
        console.log(credenciais);
        return this.http.post(`${API_CONFIG.loginUrl}/auth`, 
            credenciais,
            {
               observe: 'response',
               responseType: 'text'
            })
    }

    successfullLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null); 
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.loginUrl}/auth/refresh`, 
            {},
            {
               observe: 'response',
               responseType: 'text'
            })
    }
}