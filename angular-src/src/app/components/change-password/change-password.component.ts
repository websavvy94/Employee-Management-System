import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  email: String;
  username: String;
  password_match: String;
  password: String;
  confirmPassword: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.email = localStorage.getItem('forgot_password_email');
    this.username = localStorage.getItem('forgot_password_username');
    if(this.email == null || this.username == null){
      this.router.navigate(['/forgotPassword']);
    }
    //localStorage.clear();
  }

  onSubmitChangePassword(){
    if(this.password_match != "Yes"){
      this.flashMessagesService.show('Please confirm your password', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
    } else{
      const user = {password: this.password, username: this.username};

      this.authService.changePassword(user).subscribe(data => {      
        if(data.success){
            
          // Redirect some url based on the user's role        
          if(data.user.role == 'user'){
            this.router.navigate(['/passwordChanged']);
          } else if(data.role == 'super'){
  
          } else {
  
          }
  
        } else {
          this.flashMessagesService.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });
    }
  }

  confirm(){
    if(this.password == this.confirmPassword){
      this.password_match = "Yes";
    }else{
      this.password_match = "No";
    }
  }
}
