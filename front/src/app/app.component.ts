import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    isBtnActive!:boolean
    isLoggedIn!: boolean;
    constructor(private authService : AuthService){

    }

    ngOnInit(): void {
      this.isLoggedIn = !!this.authService.getToken();
    }

  //Method to
  getUserName() {
    return this.authService.getUser();
  }
    //Method to logout
    signOut() {
      this.authService.signOut();
    }
}
