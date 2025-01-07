import { Component, ElementRef, ViewChild } from '@angular/core';
import { Signup, User } from '../app-interfaces';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css'],
})
export class SignupUserComponent {
  @ViewChild('retype') retypepass?: ElementRef;
  signupUsers: Partial<User>[] = [];
  signupObj: Partial<User> = {};

  onSignUp() {
    const storedUsers: User[] = JSON.parse(
      localStorage.getItem('signupUsers') || '[]'
    );

    this.signupUsers = storedUsers;

    const usernameExists = storedUsers.some(
      (user) => user.username === this.signupObj.username
    );
    if (usernameExists) {
      alert('!نام کاربری قبلا استفاده شده است');
      return;
    }

    if (this.signupObj.password === this.retypepass?.nativeElement.value) {
      const userId = this.signupUsers.length + 1;

      this.signupObj.userId = userId;

      this.signupUsers.push(this.signupObj);
      localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));

      this.signupObj = {};
      this.retypepass!.nativeElement.value = '';
    } else {
      alert('!رمز عبور وارد شده با تکرار آن برابر نمی باشد');
    }
  }
}
