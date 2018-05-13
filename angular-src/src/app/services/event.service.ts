import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {

  constructor(private http: Http) { }

  registerEvent(event) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/events/register', event, {headers: headers})
     .map(res => res.json());
  }

}
