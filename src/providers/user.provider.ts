import { CollaboratorDto } from './../models/collaborator.dto';
import { CollaboratorProvider } from './domain/collaborator.provider';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserProvider {
    collaborator: any;
    constructor(public http: HttpClient,
        public collaboratorProvider: CollaboratorProvider) { }

        loadUser(localUser):Observable<CollaboratorDto> {
        if (localUser && localUser.email) {
            this.collaboratorProvider.findByEmail(localUser.email)
                .subscribe(response => {
                    this.collaborator = response as CollaboratorDto;
                })
            return this.collaborator;
        }
    }
}