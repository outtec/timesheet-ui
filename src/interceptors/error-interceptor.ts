import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs"
import { Injectable } from "@angular/core";

import { AlertController } from "ionic-angular";
import { FieldMessage } from "../models/filedmessage";
import { StorageProvider } from "../providers/storage.provider";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageProvider,
        public alertCtrl: AlertController) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, cought) => {
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj)
            }
            
            console.log("Erro detectado pelo Interceptor");
            console.log(errorObj);
            
            switch(errorObj.status) {

                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                case 422:
                this.handle422(errorObj);
                break;                

                default:
                this.handleDefaultError(errorObj)
            }
            
            return Observable.throw(errorObj);
        }) as any;
    }

    handle401(): any {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha de Autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]        
        });
        alert.present();
    }
    
    
    handle403(): any {
        this.storage.setLocalUser(null);
    }

    handle422(errorObj): any {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]        
        });
        alert.present();
    }    
    
    handleDefaultError(errorObj): any {
        let alert = this.alertCtrl.create({
            title: errorObj.errors,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {text: 'Ok'}
            ]        
        });
        alert.present();
    }

    listErrors(messages: FieldMessage[]): string {
        let msg: string = '';
        messages.map(fm => {
            msg = msg + '<p><strong>' + fm.fieldName + '</strong>: ' + fm.message + '</p>'
        });
        return msg      
    }
    
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}