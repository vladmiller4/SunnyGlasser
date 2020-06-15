import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user: IUser;
  users: Array<IUser> = [];

  constructor(private authentication: AuthenticationService, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]{1,}")]),
      lastname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]{1,}")]),
      email: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9_]+@[a-z]{2,6}.[a-z]{2,4}")]),
      password: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9]{8,}")]),
      emailConfirm: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required])
    }, {
      validator: MustMatch('email', 'emailConfirm', 'password', 'passwordConfirm')
    });
  }

  get f() { return this.registerForm.controls; }

  public register(formData: FormData): void {
    this.submitted = true;
    this.authentication.register(formData['email'], formData['password']);
  }

  private getData(): void {
    this.userService.getUser().subscribe(data => {
      this.users = data;
    }, error => {
      console.log(error);
    })
  }

  addUser(formData: FormData): void {
    this.submitted = true;
    const newUser: IUser = new User(this.ID(), formData['firstname'], formData['lastname'], formData['email'], formData['password'], '', '', '', '');
    this.userService.addUser(newUser).subscribe(() => {
      this.getData();
    })
    this.user = newUser;
  }

  ID(): string {
    return Math.random().toString(36).substr(2, 6);
  };

  addToLocal(): void {
    this.submitted = true;
    let localUser: IUser = this.user;
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(localUser));
    } else {
      localStorage.setItem('user', JSON.stringify(localUser));
    }
    this.userService.user.next(localUser);
  }

}
