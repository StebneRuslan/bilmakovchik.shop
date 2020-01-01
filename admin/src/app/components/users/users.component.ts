import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UsersService } from '../../services/users/users.service';

import { User } from '../../entities/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.template.html',
  styleUrls: ['./users.style.scss']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  public activeUser: User;
  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'edit', 'delete'];

  public isAdmin: boolean = false;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
    this.activeUser = this.userService.getActiveUser(['role', 'email']);
  }

  public deleteUser(id: string): void {
    this.userService.deleteUsers(id).subscribe(() => this.users = this.users.filter(user => user._id !== id))
  }

  public editUser(user: User): void {
    this.router.navigate(['/user', user._id]);
  }
}
