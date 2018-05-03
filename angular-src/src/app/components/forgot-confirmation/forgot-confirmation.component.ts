import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-forgot-confirmation',
  templateUrl: './forgot-confirmation.component.html',
  styleUrls: ['./forgot-confirmation.component.css']
})
export class ForgotConfirmationComponent implements OnInit {

  email: String;
  username: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.email = localStorage.getItem('forgot_password_email');
    this.username = localStorage.getItem('forgot_password_username');

    if(this.email == null){
      this.router.navigate(['/login']);
    }
  }
  //Send another Email for verification link
  onSendVerificationLink(){    

    if(this.username == undefined || this.username ==''){
      this.flashMessagesService.show('Your user ID does not exsit', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
    } else {
      const user = {username: this.username};
      this.authService.sendVerificationLink(user).subscribe(data => {
        
        if(data.success){
          
          this.router.navigate(['/forgotConfirmation']);
          this.flashMessagesService.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        } else {
          this.flashMessagesService.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });
    }
  }
}
