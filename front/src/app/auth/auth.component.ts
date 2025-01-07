import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  selectedTab: string;

  constructor() {
    this.selectedTab = 'signup';
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
