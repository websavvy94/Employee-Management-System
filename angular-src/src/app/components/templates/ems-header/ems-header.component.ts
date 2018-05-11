import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-ems-header',
  templateUrl: './ems-header.component.html',
  styleUrls: ['./ems-header.component.css']
})
export class EmsHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessagesService.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 5000
    });
    this.router.navigate(['/login']);
    return false;
  }
}
