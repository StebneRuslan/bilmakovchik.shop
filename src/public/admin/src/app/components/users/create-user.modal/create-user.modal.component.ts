import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users/users.service';
import { User } from "../../../entities/user";
import CreateUserModalForm from "./create-user.modal.form";

@Component({
  selector: 'app-user',
  templateUrl: './create-user.modal.template.html',
  styleUrls: ['./create-user.modal.style.scss']
})
export class CreateUserModalComponent implements OnInit {
  public form: CreateUserModalForm;
  constructor(
    private userService: UsersService,
    public dialogRef: MatDialogRef<CreateUserModalComponent>
  ) {
    this.form = new CreateUserModalForm(new User())
  }
  
  public ngOnInit(): void {}
  
  public save(): void {
    this.userService.createUser(this.form.formGroup.value).subscribe(
      (user: User) => this.dialogRef.close(user),
      error => {
        console.error(error.message)
      })
  }

}
