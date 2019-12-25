import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../entities/user';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.template.html',
  styleUrls: ['./users.style.scss']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'edit', 'delete'];

  public isAdmin: boolean = false;

  constructor(
    private userService: UsersService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users)
  }

  public deleteUser(id: string): void {
    this.userService.deleteUsers(id).subscribe(() => this.users = this.users.filter(user => user._id !== id))
  }
}
