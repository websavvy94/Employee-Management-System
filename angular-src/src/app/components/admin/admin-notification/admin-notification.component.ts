import { Component, OnInit } from '@angular/core';
import {NotificateService} from '../../../services/notificate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.css']
})
export class AdminNotificationComponent implements OnInit {
  notifications: any;
  statusF: Boolean;

  constructor(
    private NotificateServe: NotificateService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.displayNotifications();
  }

  displayNotifications() {
    this.statusF = true;
    this.NotificateServe.getNotifications().subscribe(notifications => {
        this.notifications = notifications;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  delNotification(id) {
    this.NotificateServe.delNotification(id).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 5000
        });
      } else {
        this.flashMessagesService.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      }
    })
  }

}
