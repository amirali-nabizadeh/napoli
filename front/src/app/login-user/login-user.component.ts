import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Login, Signup, User } from '../app-interfaces';
import { SignupUserComponent } from '../signup-user/signup-user.component';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  signupUsers: Signup[] = [];
  loginUsers: Login[] = [];

  loginObj: Login = {
    username: '',
    password: '',
    email: '',
    isAdmin: false,
    userId: 0,
  };
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('signupUsers');
    if (localData) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onLogin() {
    const isUserExist = this.signupUsers.find((a) =>
      a.username == this.loginObj.username &&
      a.password == this.loginObj.password
        ? a
        : undefined
    );

    if (isUserExist) {
      const pickedUser: Login = {
        username: this.loginObj.username,
        password: this.loginObj.password,
        email: isUserExist.email,
        isAdmin: isUserExist.isAdmin,
        userId: isUserExist.userId,
      };
      this.userService.setUser(pickedUser);
      localStorage.setItem('loginUser', JSON.stringify(pickedUser));
      this.authService.login();
      this.router.navigate(['/main']);
    } else {
      this.authService.notLogIn();
      alert('!فردی با مشخصات وارد شده در سامانه موجود نیست');
    }
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
