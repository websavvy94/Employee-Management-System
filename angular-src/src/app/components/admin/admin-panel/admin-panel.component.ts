import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NotificateService } from '../../../services/notificate.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit {
  users: any;
  private mdlIsOpen : boolean = false;
  modalUsername: String;
  statusF: Boolean;

  constructor(
    private authService: AuthService,
    private notificateService: NotificateService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.displayActiveUser();
    this.statusF = true;
  }

  displayActiveUser() {
    this.statusF = true;
    this.authService.getActivateUsersData().subscribe(users => {
        this.users = users;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  displayInactiveUser() {
    this.statusF = false;
    this.authService.getInactivateUsersData().subscribe(users => {
        this.users = users;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  changeUserStatus(username, status) {
    const user = {username: username, status: !status};
    var str;
    if(status != true) {
      str = "activated ";
    } else {
      str = "inactivated ";
    }

    this.authService.changeUserStatus(user).subscribe(data => {      
      if(data.success){
        // add notification into notification table
        const notification = {
          content: "Admin " + str + username,
          date: new Date().toLocaleDateString(),
          status: true
        }
        
        this.notificateService.registerNotification(notification).subscribe(data => {
          if(data.success){
            // console.log("success");
          }
        });

        window.location.reload();
      } else {
        this.flashMessagesService.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      }
    });
  }
  
  private openModal(open : boolean, username) : void {
    this.mdlIsOpen = open;
    this.modalUsername = username;
  }

}
