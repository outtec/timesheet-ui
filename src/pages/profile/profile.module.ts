import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { Camera } from '@ionic-native/camera';
import { CollaboratorProvider } from '../../providers/domain/collaborator.provider';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
  ],
  providers: [
    Camera,
    CollaboratorProvider
  ],exports: [ProfilePage]
})
export class ProfilePageModule {}
