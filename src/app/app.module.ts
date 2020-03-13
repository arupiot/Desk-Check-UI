import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from './auth/OauthSettings';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './core/components/header/header.component';
import { ArupLogoComponent } from './core/components/arup-logo/arup-logo.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './core/components/login/login.component';
import { ReportProblemComponent } from './core/components/report-problem/report-problem.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArupLogoComponent,
    LoginComponent,
    ReportProblemComponent,
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot({
      clientID: OAuthSettings.appID,
      authority: "https://login.microsoftonline.com/arup.onmicrosoft.com",
      redirectUri: "http://localhost:4200"
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
