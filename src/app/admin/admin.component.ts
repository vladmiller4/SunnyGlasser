import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { IUser } from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user: IUser;
  constructor(private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  signOut() {
    this.authentication.logout();
    localStorage.removeItem('user');
  }

}
