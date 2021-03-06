import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/userService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private authServce: AuthService,
    private userService: UserService,
    private router: Router,
  ) { }

  async ngOnInit() {
    await this.authServce.getUser();

    this.userService.isFM.subscribe(isFM => {
      const navigateTo = isFM ? '/page-select' : '/map';
      window.location.href = "http://localhost:4200" + navigateTo; // THIS WILL NEED TO BE UPDATED TO THE URL OF THE LIVE SITE WHEN DEPLOYED
    });
  }

  async backup() {
    this.userService.isFM.subscribe(isFM => {
      const navigateTo = isFM ? '/page-select' : '/map';
      this.router.navigate([navigateTo]);
    });
  }

}
