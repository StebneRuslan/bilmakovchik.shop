import { Component, OnInit } from '@angular/core';
import { LoginModel } from './login.model';
import { User } from '../../entities/user';
import LoginForm from './login.form';

import { Router } from '@angular/router';

import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.style.scss']
})
export class LoginComponent implements OnInit {
  public form: LoginForm;
  private model: LoginModel;
  public error: string = '';

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.model = new LoginModel();
    this.form = new LoginForm(this.model)
  }

  public ngOnInit(): void {}

  public logIn(): void {
    this.usersService.logIn(this.form.formGroup.value)
      .subscribe((user: User) => {
        debugger;
        this.usersService.saveActiveUser(user);
        this.router.navigate(['/dashboard'])
      }, error => {
        this.error = error.message;
      })
  }
}
