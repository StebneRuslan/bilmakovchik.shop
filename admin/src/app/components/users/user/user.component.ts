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

  public avatarFile = {
    name: '',
    file: ''
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {
    this.form = new UserForm(new User())
  }

  public changeFile(event: any): void {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.avatarFile.name = event.target.files[0];
    reader.onload = (_event) => {
      this.avatarFile.file = reader.result.toString();
    }
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id})=> {
      this.usersService.getOneUser(id).subscribe((user: User) => {
        this.form.formGroup.patchValue(user);
        this.selectedUserId = id;
      });
      this.activeUser = this.usersService.getActiveUser();
    });
  }

  public save(): void {
    debugger;
    if (this.form.formGroup.controls.avatarUrl.value) {
      this.usersService.uploadAvatar(this.selectedUserId, this.form.formGroup.controls.avatarUrl.value.files[0]).subscribe(data => {
        console.log(data);
        delete this.form.formGroup.controls.avatarUrl;
        debugger;
        this.usersService.updateUser(this.selectedUserId, this.form.formGroup.value).subscribe((user: User) => {
          if (user.email === this.usersService.getActiveUser(['email']).email) {
            this.usersService.saveActiveUser(user);
          }
          this.router.navigate(['/dashboard'])
        })
      }, err => {
        console.log(err);
      });
    }
  }
}
