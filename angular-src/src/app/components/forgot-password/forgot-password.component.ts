import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  username: String

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSendVerificationLink(){
    if(this.username == undefined || this.username ==''){
      this.flashMessagesService.show('Please fill username field', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
    } else {
      const user = {username: this.username};
      this.authService.sendVerificationLink(user).subscribe(data => {
        
        if(data.success){

          localStorage.setItem('forgot_password_email', data.user.email);
          localStorage.setItem('forgot_password_username', data.user.username);

          this.router.navigate(['/forgotConfirmation']);          
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
