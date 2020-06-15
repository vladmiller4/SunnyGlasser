import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: IUser;
  users: Array<IUser> = []
  loginErrorStatus: boolean;
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9_]+@[a-z]{2,6}.[a-z]{2,4}")]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private authentication: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    this.getData();
    this.getLoginError();
  }

  private getData(): void {
    this.userService.getUser().subscribe(data => {
      this.users = data;
    }, error => {
      console.log(error);
    })
  }

  public login(formData: FormData): void {
    this.authentication.login(formData['email'], formData['password']);
  }

  getLoginError(): void {
    this.authentication.loginError.subscribe(
      data => {
        this.loginErrorStatus = data;
      }
    )
  }

  addToLocal(formData: FormData): void {
    const index = this.users.findIndex(user => user.email === formData['email']);
    this.user = this.users[index];
    let localUser: IUser = this.user;
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(localUser));
    } else {
      localStorage.setItem('user', JSON.stringify(localUser));
    }
  }

}
