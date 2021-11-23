import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from '../services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent implements OnInit {
  public title = 'Profile';
  public user: IProfile = {} as IProfile;
  public statusMessage = '';

  profileForm = new FormGroup({
    firstName: new FormControl(this.user.firstName, Validators.required),
    lastName: new FormControl(this.user.lastName, Validators.required),
  });

  constructor(private profile: ProfileService) { }

  ngOnInit() {
    this.loadProfile();
    this.profileForm.controls["firstName"].valueChanges.subscribe(x => {
      this.statusMessage = '';
   });
   this.profileForm.controls["lastName"].valueChanges.subscribe(x => {
    this.statusMessage = '';
 })
   }

   loadProfile() {
    this.statusMessage = 'Loading profile...';
    this.profileForm.controls['firstName'].disable();
    this.profileForm.controls['lastName'].disable();
    this.profile.getProfileUser().then((profileResp) => {
      this.user = profileResp;
      this.profileForm.controls['firstName'].setValue(this.user.firstName);
      this.profileForm.controls['firstName'].enable();
      this.profileForm.controls['lastName'].setValue(this.user.lastName);
      this.profileForm.controls['lastName'].enable();
      this.statusMessage = '';
    }).catch(() => {
      this.loadProfile();
    })
   }


  saveProfile() {
    this.statusMessage = 'Saving profile...';
    const newFirstName = this.profileForm.controls['firstName'].value;
    const newLasName = this.profileForm.controls['lastName'].value;
    this.profile.setName(newFirstName, newLasName).then((saveProfileResp) => {
      this.statusMessage = '';
    }).catch((saveProfileError) => {
      this.statusMessage = `Error! ${saveProfileError.error}`;
    })
  }
}
