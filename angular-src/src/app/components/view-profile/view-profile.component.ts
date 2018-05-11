import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user: Object;
  tempUser: Object;
  editableF: Boolean;
  selectedFile: File = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private http: Http
  ) { }

  ngOnInit() {
    this.user = this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    }
    );
    this.editableF = true;
  }

  editProfile(user) {
    this.editableF = false;
    this.tempUser = user;
  }

  saveProfile(user) {
    this.authService.updateUser(user).subscribe(data => {
      if(data.success){
        this.flashMessages.show('User`s profile was updated successfully', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/view_profile']);
      }
    });
  }

  cancelEdit(user) {
    // this.user = this.tempUser;
    this.router.navigate(['/view_profile']);
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/users/uploadImage', fd)
    .subscribe(res => {
      console.log(res);
    });
  }

}
