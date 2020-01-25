import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users/users.service';
import { Router } from "@angular/router";

import { RegistrationModel } from './registration.model';
import RegistrationForm from './registration.form';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.template.html',
  styleUrls: ['./registration.style.scss']
})
export class RegistrationComponent implements OnInit {
  public model: RegistrationModel;
  public form: RegistrationForm;
  constructor(
    private router: Router,
    private userService: UsersService
  ) {
    this.model = new RegistrationModel();
    this.form = new RegistrationForm(this.model);
  }

  public ngOnInit(): void {}

  public createUser(): void {
    this.userService.createUser(this.form.formGroup.value).subscribe(
      () => this.router.navigate(['/login']),
      err => console.log(err)
    )
  }
}
