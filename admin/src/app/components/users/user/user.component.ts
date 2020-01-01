import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../../services/users/users.service";
import { User } from "../../../entities/user";
import { roles, SUPER_ADMIN } from "../../../entities/roles";
import UserForm from "./user.form";

@Component({
  selector: 'app-user',
  templateUrl: './user.template.html',
  styleUrls: ['./user.style.scss']
})
export class UserComponent implements OnInit {
  public model: User;
  public form: UserForm;
  public roles: string[] = roles;

  private selectedUserId: string;
  private activeUser: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {
    this.form = new UserForm(new User())
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id})=> {
      this.usersService.getOneUser(id).subscribe((user: User) => {
        this.form.formGroup.patchValue(user);
        this.selectedUserId = id;
      })
      this.activeUser = this.usersService.getActiveUser();
    });
  }

  public save(): void {
    this.usersService.updateUser(this.selectedUserId, this.form.formGroup.value).subscribe((user: User) => {
      if (user.email === this.usersService.getActiveUser(['email']).email) {
        this.usersService.saveActiveUser(user);
      }
      this.router.navigate(['/dashboard'])
    })
  }
}
