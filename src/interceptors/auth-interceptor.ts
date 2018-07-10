import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/observable";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { StorageProvider } from "../providers/storage.provider";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageProvider) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let n = API_CONFIG.baseUrl.length;
        let isRequestToAPI = req.url.substring(0, n) === API_CONFIG.baseUrl;

        let localUser = this.storage.getLocalUser(); 
        console.log(localUser.token)
        if (localUser) { //&& isRequestToAPI
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            console.log(req);
            return next.handle(authReq)
            
        }else{
        return next.handle(req)
    }}
    
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}