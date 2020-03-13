import { Injectable } from '@angular/core';

import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';

import { OAuthSettings } from '../OauthSettings';
import { User } from '../../core/models/User.model';
import { UserService } from '../../core/services/userService/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean;
  public user: User;

  constructor(
    private msalService: MsalService,
    private userService: UserService
  ) {
    this.authenticated = false;
    this.user = null;
  }

  // Prompt the user to sign in and grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    this.msalService.loginRedirect(OAuthSettings.scopes)
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

   async getUser(): Promise<User> {
    try {
      let graphClient = Client.init({
        // Initialize the Graph client with an auth
        // provider that requests the token from the
        // auth service
        authProvider: async(done) => {
          let token = await this.getAccessToken()
            .catch((err) => {
              done(err, null)
            });

          if (token) done(null, token)
          else done("Could not get an access token", null);
        }
      });

      // Get the user from Graph (GET /me)
      let graphUser = await graphClient.api('/me').get();

      if (graphUser) {
        this.authenticated = true;
        let user = new User();
        user.displayName = graphUser.displayName;
        // Prefer the mail property, but fall back to the userPrincipalName
        user.email = graphUser.mail || graphUser.userPrincipalName;
        user.isFm = graphUser.jobTitle === "Facilities Manager"; // not 100% sure what the full title of the job is, but that will do for now

        this.userService.setUser(user);

        return user;
      } else return null;
    } catch(e) {
      return null;
    }
  }
}
