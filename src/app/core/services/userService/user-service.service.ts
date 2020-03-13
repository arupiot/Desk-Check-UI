import { Injectable } from '@angular/core';
import { User } from '../../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  currentUser: User;

  public setUser(user): void {
    this.currentUser = user;
  }
  public getUser(): User {
    return this.currentUser;
  }
}
