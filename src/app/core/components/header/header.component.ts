import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  async signIn(): Promise<void> {
    await this.authService.signIn();
    if (this.authService.authenticated){
      let token = await this.authService.getAccessToken();
      console.log("token:", token);
    }
  }

  signOut(): void {
    this.authService.signOut();
  }

}
