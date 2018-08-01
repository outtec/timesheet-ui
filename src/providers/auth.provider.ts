import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDto } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { JwtHelper } from "angular2-jwt";
import { StorageProvider } from "./storage.provider";

@Injectable()
export class AuthProvider {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient,
        public storage: StorageProvider) {
    }
   
    authenticate(credenciais: CredenciaisDto) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
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
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
               observe: 'response',
               responseType: 'text'
            })
    }
}