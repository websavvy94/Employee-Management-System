import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.first_name == undefined || user.last_name == undefined || user.email == undefined || user.username == undefined || user.password == undefined || user.first_name == '' || user.last_name == '' || user.password == '' || user.email == '' || user.username == ''){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhone(phone) {
    var phoneno = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[ ]?([0-9]{4})$/;
    if(phone.match(phoneno)) {
      return true;
    } else {
      alert("message");
      return false;
    }
  }

  validateNewEvent(event) {
    var condition;
    if(event.alldayF == true) {
      condition = (event.eventname == undefined || event.location == undefined || event.startdate == undefined || event.enddate == undefined || event.notes == undefined || event.eventname == '' || event.location == '' || event.startdate == '' || event.enddate == '' || event.notes == '');
    } else {
      condition = (event.eventname == undefined || event.location == undefined || event.startdate == undefined || event.enddate == undefined || event.starttime == undefined || event.endtime == undefined || event.notes == undefined || event.eventname == '' || event.location == '' || event.startdate == '' || event.enddate == '' || event.starttime == '' || event.endtime == '' || event.notes == '');
    }

    if(condition) {
      return false;
    } else {
      return true;
    }
  }

  validateEventPeriod(startdate, enddate, starttime, endtime, allday) {
    if(Date.parse(startdate) > Date.parse(enddate)) {
      return false;
    } else {
      return true;
    }
  }

}
