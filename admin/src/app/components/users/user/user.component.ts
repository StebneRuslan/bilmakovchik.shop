import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../../services/users/users.service";
import { User, Avatar } from "../../../entities/user";
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

  public avatar: Avatar = new Avatar('', '', '');
  public avatarFile: string;
  public avatarFilePreview: string;

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
    this.avatar = new Avatar(event.target.files[0].name, '', event.target.files[0].type);
    this.avatarFile = event.target.files[0];
    reader.onload = (_event) => {
      this.avatarFilePreview = reader.result.toString();
    }
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.usersService.getOneUser(id).subscribe((user: User) => {
        debugger;
        this.form.formGroup.patchValue(user);
        if (user.avatar) {
          this.avatar = new Avatar(user.avatar.name, user.avatar.path, user.avatar.type);
        }
        this.selectedUserId = id;
      });
      this.activeUser = this.usersService.getActiveUser();
    });
  }

  public save(): void {
    if (this.avatarFile) {
      this.usersService.uploadAvatar(this.selectedUserId, this.avatarFile, this.avatar).subscribe(() => {
        this.updateUserData();
      }, err => {
        console.log(err);
      });
    } else {
      this.updateUserData();
    }
  }

  public updateUserData(): void {
    this.usersService.updateUser(this.selectedUserId, this.form.formGroup.value).subscribe((user: User) => {
      if (user.email === this.usersService.getActiveUser(['email']).email) {
        this.usersService.saveActiveUser(user);
      }
      this.router.navigate(['/dashboard'])
    })
  }
}
