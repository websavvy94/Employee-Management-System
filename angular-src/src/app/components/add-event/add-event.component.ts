import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { NotificateService } from '../../services/notificate.service';
import { EventService } from '../../services/event.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Time } from '@angular/common';

declare var $ :any;

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  username: string;
  eventname: string;
  location: string;
  startdate: Date;
  enddate: Date;
  starttime: Time;
  endtime: Time;
  alldayF: Boolean;
  notes: Text;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private notificateService: NotificateService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem("user")).username;
    this.alldayF = false;
  }

  //Validate before submitting
  onValidate() {
    const event = {
      eventname: this.eventname,
      location: this.location,
      startdate: this.startdate,
      enddate: this.enddate,
      starttime: this.starttime,
      endtime: this.endtime,
      alldayF: this.alldayF,
      notes: this.notes
    }

    // Required Fields
    if(!this.validateService.validateNewEvent(event)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate timing
    if(!this.validateService.validateEventPeriod(event.startdate, event.enddate, event.starttime, event.endtime, event.alldayF)){
      this.flashMessage.show('Please select correct timing', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    $('#selectEmployeesModal').modal('show');

  }

  addAndSendEvent() {
    this.addEvent();
    this.sendEvent();
  }

  // insert event into database
  addEvent() {
    const event = {
      eventname: this.eventname,
      username: this.username,
      location: this.location,
      startdate: this.startdate,
      enddate: this.enddate,
      starttime: this.starttime,
      endtime: this.endtime,
      notes: this.notes
    }

    // console.log(event);
    this.eventService.registerEvent(event).subscribe(data => {

      if(data.success){
        this.flashMessage.show('Event registerd successfully', {cssClass: 'alert-success', timeout: 3000});
        
        const notification = {
          content: this.username + "created new event",
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
      }

    });

  }

  // send event email to selected employees
  sendEvent() {
    $('#selectEmployeesModal').modal('hide');
  }

  onSelectAllDay() {
    this.starttime = null;
    this.endtime = null;

  }
 
}
