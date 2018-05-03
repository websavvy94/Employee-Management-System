import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotConfirmationComponent } from './components/forgot-confirmation/forgot-confirmation.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PasswordChangedComponent } from './components/password-changed/password-changed.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import {PassGuard} from './guards/pass.guard';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'forgotConfirmation', component: ForgotConfirmationComponent, canActivate:[PassGuard]},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate:[PassGuard]},
  {path: 'passwordChanged', component: PasswordChangedComponent, canActivate:[PassGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ForgotConfirmationComponent,
    ChangePasswordComponent,
    PasswordChangedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, PassGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
