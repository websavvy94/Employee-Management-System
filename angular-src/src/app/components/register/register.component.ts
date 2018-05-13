import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { NotificateService } from '../../services/notificate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  first_name: String;
  last_name: String;
  email: String;
  username: String;
  password: String;
  phone: String;
  em: Boolean;
  bi: Boolean;
  rm: Boolean;
  sm: Boolean;
  s: Boolean;
  role: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private notificateService: NotificateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  //Validate before submitting
  onValidate(){
    const user = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      username: this.username,
      password: this.password,
      phone: this.phone
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    $('#mysaveModal').modal('show');

  }

  //Register user after validating
  onRegisterSubmit(){
    const user = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      username: this.username,
      password: this.password,
      phone: this.phone,
      status: true,
      em: this.em,
      bi: this.bi,
      rm: this.rm,
      sm: this.sm,
      s: this.s,
      role: "user"
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {

      if(data.success){
        this.flashMessage.show('User registerd successfully', {cssClass: 'alert-success', timeout: 3000});
        var rooms = "";
        if(user.em){
          rooms = rooms + "Employee Management ";
        }
        if(user.bi){
          rooms = rooms + "Beverage Inventory ";
        }
        if(user.rm){
          rooms = rooms + "Room Management ";
        }
        if(user.sm){
          rooms = rooms + "Supply Management ";
        }
        if(user.s){
          rooms = rooms + "Super ";
        }

        const notification = {
          content: "Admin added " + user.first_name + " " + user.last_name + " to " + rooms,
          date: new Date().toLocaleDateString(),
          status: true
        }
        
        this.notificateService.registerNotification(notification).subscribe(data => {
          if(data.success){
            // console.log("success");
          }
        });
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }

    });
  }
}
