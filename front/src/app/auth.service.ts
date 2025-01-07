import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  login() {
    return (this.isLoggedIn = true);
  }

  notLogIn() {
    return (this.isLoggedIn = false);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
