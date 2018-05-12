import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificateService {

  constructor(private http: Http) { }

  registerNotification(notification){    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/notifications/register', notification, {headers: headers})
     .map(res => res.json());
  }

  getNotifications() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/notifications/getAllNotifications', {headers: headers})
     .map(res => res.json());
  }

  delNotification(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/notifications/deleteNotification/'+id, {headers: headers})
     .map(res => res.json());
  }
}


