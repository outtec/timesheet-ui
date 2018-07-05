import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";


export class StorageProvider {

    getLocalUser(): LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr === null) {
            return null
        } else {
            return JSON.parse(usr); //Pq o localstorage armazena como string
        }
    }

    setLocalUser(obj: LocalUser) {
        if (obj === null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj))
        }
    }

}