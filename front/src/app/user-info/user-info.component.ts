import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Signup } from '../app-interfaces';
import { Login } from '../app-interfaces';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  @ViewChild('passwordModal') passwordModalRef!: ElementRef;
  @ViewChild('adminModal') adminModalRef!: ElementRef;

  loggedInUser: Login | undefined;
  newUsername: string = '';
  newEmail: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  signupUsers: Signup[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loggedInUser = this.userService.getUser();
    const localData = localStorage.getItem('signupUsers');
    if (localData) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  openModal() {
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordModalRef.nativeElement.classList.add('show');
    this.passwordModalRef.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.passwordModalRef.nativeElement.classList.remove('show');
    this.passwordModalRef.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.adminModalRef.nativeElement.classList.remove('show');
    this.adminModalRef.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('!رمز عبور وارد شده با تکرار آن برابر نیست');
      return;
    } else if (this.loggedInUser) {
      const updatedUsers = this.signupUsers.map((user) => {
        if (user.userId === this.loggedInUser?.userId) {
          return { ...user, password: this.newPassword };
        }
        return user;
      });

      localStorage.setItem('signupUsers', JSON.stringify(updatedUsers));
    }

    this.closeModal();
  }

  openAdminModal() {
    this.newUsername = '';
    this.newEmail = '';
    this.adminModalRef.nativeElement.classList.add('show');
    this.adminModalRef.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  changeUsernameEmail() {
    if (this.loggedInUser) {
      const updatedUsers = this.signupUsers.map((user) => {
        if (user.userId === this.loggedInUser?.userId) {
          const newUser = { ...user };
          if (this.newUsername) {
            newUser.username = this.newUsername;
          }
          if (this.newEmail) {
            newUser.email = this.newEmail;
          }
          return newUser;
        }
        return user;
      });

      localStorage.setItem('signupUsers', JSON.stringify(updatedUsers));
    }

    this.closeModal();
  }
}
