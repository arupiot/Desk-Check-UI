import { Injectable } from '@angular/core';
import { User } from '../../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isFMLocal = localStorage.getItem("isFM") === "true";

  private _isFM: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isFMLocal);
  isFM: Observable<boolean> = this._isFM.asObservable();

  private setIsFM(isFM: boolean): void {
    localStorage.setItem("isFM", String(isFM));
    this._isFM.next(isFM);
  }

  constructor() { }

  currentUser: User;

  public setUser(user: User): void {
    this.currentUser = user;
    this.setIsFM(this.currentUser.isFm); // Comment out this line when testing the FM role
    // this.setIsFM(true); // Uncomment this line when testing the FM role
  }
  public getUser(): User {
    return this.currentUser;
  }
}
