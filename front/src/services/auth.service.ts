import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private tokenKey = 'authToken'; 


  login(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
