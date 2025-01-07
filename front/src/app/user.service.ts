import { Injectable } from '@angular/core';
import { Login } from './app-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedInUser: Login | undefined;

  constructor() {}

  setUser(user: Login) {
    this.loggedInUser = user;
  }

  getUser(): Login | undefined {
    return this.loggedInUser;
  }

  getUserId() {
    return this.loggedInUser?.userId;
  }
}
