import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageProvider } from '../../providers/storage.provider';
import { CollaboratorDto } from '../../models/collaborator.dto';
import { CollaboratorProvider} from  '../../providers/domain/collaborator.provider';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  collaborator: CollaboratorDto;
  picture: string;
  cameraOn: boolean = false;
  profileImage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public camera: Camera,
    public collaboratorProvider: CollaboratorProvider,
    public sanitizer: DomSanitizer) {

    this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    console.log(localUser)
    if (localUser && localUser.email) {
      this.collaboratorProvider.findByEmail(localUser.email)
        .subscribe(response => {
          this.collaborator = response as CollaboratorDto; //Casting no JS
        },
          error => {
            if (error.status === 403) {
              this.navCtrl.setRoot('SignPage');
            }
          })
    } else {
      this.navCtrl.setRoot('SignPage');
    }
  }


  cancel() {
    this.picture = null;
  }

}
