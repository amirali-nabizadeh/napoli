import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class MainPageComponent implements OnInit {
  showForm1: boolean = false;
  showTable1: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUsers = JSON.parse(localStorage.getItem('loginUser') || '[]');
    if (storedUsers) {
      const user = storedUsers;
      this.isAdmin = user.isAdmin;
    }
  }

  showForm() {
    this.showForm1 = true;
  }

  showTable() {
    this.showTable1 = true;
  }

  navigateToHome() {
    localStorage.removeItem('loginUser');
    this.router.navigate(['']);
  }

  toUserInfo() {
    this.router.navigate(['userInfo']);
  }

  showMyForms() {
    this.router.navigate(['myForms']);
  }
}
