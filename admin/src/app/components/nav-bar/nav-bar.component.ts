import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UsersService } from "../../services/users/users.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.template.html',
  styleUrls: ['./nav-bar.style.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public logOut(): void {
    this.userService.logOut().subscribe(() => this.router.navigate(['/login']))
  }
}
