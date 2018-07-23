import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CollaboratorDto } from "../../models/collaborator.dto";
import { Observable } from "rxjs/Rx";
import { StorageProvider } from "../storage.provider";
import { ImageUtilProvider } from "../image-util.provider";

@Injectable()
export class CollaboratorProvider {

    constructor(
        public http: HttpClient,
        public storage: StorageProvider,
        public imageUtilProvider: ImageUtilProvider) {
    }

    findById(id: string){
        return this.http.get(`${API_CONFIG.baseUrl}/collaborators/${id}`);
    }    

    findByEmail(email: string) : Observable<CollaboratorDto> {
        return this.http.get<CollaboratorDto>(`${API_CONFIG.baseUrl}/collaborators/email?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseURL}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    insert(obj: CollaboratorDto): Observable<any> {
        return this.http.post(`${API_CONFIG.baseUrl}/collaborators`,
        obj,
        {
            observe: 'response',
            responseType: 'text'
        })
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilProvider.dataURItoBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(`${API_CONFIG.baseUrl}/collaborators/picture`,
        formData,
        {
            observe: 'response',
            responseType: 'text'
        })
    }

}