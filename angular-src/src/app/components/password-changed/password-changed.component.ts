import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.component.html',
  styleUrls: ['./password-changed.component.css']
})
export class PasswordChangedComponent implements OnInit {

  email: String;
  username: String

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
    localStorage.clear();
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
