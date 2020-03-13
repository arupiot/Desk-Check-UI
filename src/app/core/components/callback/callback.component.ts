import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/userService/user-service.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private authServce: AuthService,
    private userService: UserService,
  ) { }

  async ngOnInit() {

    await this.authServce.getUser();

    console.log("user:", this.userService.getUser());
    // const headerDict = {
    //   'Access-Control-Allow-Origin': origin,
    // }

    // const requestOptions = {
    //   headers: new HttpHeaders(headerDict),
    // }

    // console.log("hash:", location.hash);
    // const code = location.hash.split("=")[1].split("&")[0];
    // console.log("code:",code);
    // this.http.post("https://login.microsoftonline.com/4ae48b41-0137-4599-8661-fc641fe77bea/oauth2/token", {
    //   "grant_type": "Authorization_code",
    //   "client_id": "47350f5b-9e7b-4699-8fbf-040f56019164",
    //   "code": code,
    //   "redirect_uri": "http://localhost:4200/callback",
    //   "resource:": "https://arup.onmicrosoft.com/AIS"
    // },requestOptions).subscribe(res => {
    //   console.log("res:", res);
    // }, err => {
    //   console.log("err:", err);
    // })
  }

}
