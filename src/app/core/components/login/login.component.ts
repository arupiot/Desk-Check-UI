import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    console.log("first hash check:", location.hash);
   }

  ngOnInit(): void {
    // console.log("hash:", location.hash);
    // window.location.href = "https://login.microsoftonline.com/4ae48b41-0137-4599-8661-fc641fe77bea/oauth2/v2.0/authorize?response_type=code&scope=user.read%20openid%20profile&client_id=47350f5b-9e7b-4699-8fbf-040f56019164&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback&state=30aa3926-8c5d-4a5f-b2d8-a93cab0d5390&nonce=b3d62537-f294-46be-88a6-ca6b35b0dafb&client_info=1&x-client-SKU=MSAL.JS&x-client-Ver=0.2.2&client-request-id=17468954-633b-4b18-9e4f-8feffaf2ce30&prompt=select_account&response_mode=fragment&sso_reload=true"
    // if (!location.hash) {
      // this.authService.signIn()
      // .then(d => {
      //   if (this.authService.authenticated) this.router.navigate(['/page-select']);
      // })
      // .catch(e => {
      //   console.log("error logging in:", e);
      // });
    // }
    // this.activeatedRoute.queryParams.subscribe(params => {
    //   console.log("params:", params);
    //   console.log("hash:", location.hash);
    //   debugger;
    //   if (!location.hash) {
    //     this.authService.signIn()
    //     .then(d => {
    //       if (this.authService.authenticated) this.router.navigate(['/page-select']);
    //     })
    //     .catch(e => {
    //       console.log("error logging in:", e);
    //     });
    //   }
    // })
  }

  signin(): void {
    if (!this.authService.authenticated) this.authService.signIn();
  }

}
