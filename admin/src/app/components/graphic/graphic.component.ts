import { Component, OnInit } from '@angular/core';
import roughViz from 'rough-viz';

import { UsersService } from "../../services/users/users.service";
import { SUPER_ADMIN, APP_USER } from "../../entities/roles";

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.template.html',
  styleUrls: ['./graphic.style.scss']
})
export class GraphicComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      new roughViz.Donut(
        {
          element: '#viz0',
          data: {
            labels: [SUPER_ADMIN, APP_USER],
            values: [users.filter(user => user.role === SUPER_ADMIN).length, users.filter(user => user.role === APP_USER).length]
          },
          title: "Users",
          width: window.innerWidth / 2,
          roughness: 8,
          colors: ['red', 'orange'],
          stroke: 'black',
          strokeWidth: 3,
          fillStyle: 'cross-hatch',
          fillWeight: 3.5,
        }
      );
    })
  }

}
