import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ems-dashboard',
  templateUrl: './ems-dashboard.component.html',
  styleUrls: ['./ems-dashboard.component.css']
})
export class EmsDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newEvent() {
    console.log("new event");
  }

}
