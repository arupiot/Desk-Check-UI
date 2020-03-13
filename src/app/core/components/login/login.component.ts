import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.authService.signIn()
    // .then(d => {
      // if (this.authService.authenticated) this.router.navigate(['/page-select']);
    // })
    // .catch(e => {
    //   console.log("error logging in:", e);
    // });
  }

}
