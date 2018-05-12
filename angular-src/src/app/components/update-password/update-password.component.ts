import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  username: string;
  curpwd: string;
  oldpwdF: Boolean;
  pwdMatchF: Boolean;
  pwdMatchValue: string;
  new_password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private http: Http
  ) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('user')).username;
    this.curpwd = JSON.parse(localStorage.getItem('user')).password;
    this.oldpwdF = false;
    this.pwdMatchF = false;
    this.pwdMatchValue = "No";
  }

  onOldPwdChange(oldpwd) {
    if (this.curpwd == oldpwd) {
      this.oldpwdF = true;
    }
  }

  onCnfPwdChange(cnfpwd) {
    console.log(cnfpwd);
    if(this.new_password == cnfpwd) {
      this.pwdMatchF = true;
      this.pwdMatchValue = "Yes";
    } else {
      this.pwdMatchF = false;
      this.pwdMatchValue = "No";
    }
  }

  changePwd() {
    // console.log(this.new_password);
    const user = {
      username: this.username,
      password: this.new_password
    }

    this.authService.updateUserPassword(user).subscribe(data => {
      console.log("result");
      if(data.success){
        this.flashMessages.show('Your profile was updated successfully', {cssClass: 'alert-success', timeout: 3000});
        localStorage.user.password = this.new_password;
      } else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/view_profile']);
      }
    });
  }

}
