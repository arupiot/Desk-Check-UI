import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

import { OAuthSettings } from '../OauthSettings';
import { User } from '../../core/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean;
  public user: User;

  constructor(
    private msalService: MsalService,
  ) {
    this.authenticated = false;
    this.user = null;
  }

  // Prompt the user to sign in and grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    let result = await this.msalService.loginPopup(OAuthSettings.scopes)
      .catch(err => console.log("error in AuthService.signIn:", err));

    if (result) {
      this.authenticated = true;
      // Temporary placeholder
      this.user = new User();
      this.user.displayName = "test testing";
      this.user.email = "testT@arup.com";
    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(OAuthSettings.scopes)
      .catch(err => console.log("error in AuthService.getAccessToken:", err));

      return result;
  }
}
