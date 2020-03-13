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
      // .catch(err => console.log("error in AuthService.signIn:", err));

    // if (result) {
      // this.authenticated = true;
      // this.user = await this.getUser();
      // console.log("this.user:", this.user);

      // let token = await this.getAccessToken();
      // console.log("token:", token);

      // return;
    // }
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
    console.log("getUser");
    // if (!this.authenticated) return null;

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

    let user = new User();
    user.displayName = graphUser.displayName;
    // Prefer the mail property, but fall back to the userPrincipalName
    user.email = graphUser.mail || graphUser.userPrincipalName;
    user.isFm = graphUser.jobTitle === "Facilities Manager"; // not 100% sure what the full title of the job is, but that will do for now

    console.log("graphuser:", graphUser)

    this.userService.setUser(user);

    return user;
  }
}
