import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import roughViz from 'rough-viz';
import { APP_USER, SUPER_ADMIN } from "../../entities/roles";

@Component({
  selector: 'app-users-uploader',
  templateUrl: './users-uploader.template.html',
  styleUrls: ['./users-uploader.style.scss']
})
export class UsersUploaderComponent implements OnInit {
  private file: File;
  public canSend: boolean = false;
  constructor(
    private userService: UsersService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  public selectFile(event: any): void {
    this.file = event.target.files[0];
    this.canSend = !!event.target.files[0]
  }

  public sendFile(): void {
    this.spinner.show();
    this.userService.uploadCsvFile(this.file).subscribe(data => {
      new roughViz.Bar(
        {
          element: '#viz0',
          data: {
            labels: ['SAVED_SUPER_ADMIN', 'SAVED_APP_USER', 'INVALID_SUPER_ADMIN', 'INVALID_APP_USER'],
            values: [
              data.savedUsers.filter(user => user.role === SUPER_ADMIN).length || 1,
              data.savedUsers.filter(user => user.role === APP_USER).length || 1,
              data.dontSavedUsers.filter(user => user.role === APP_USER).length || 1,
              data.dontSavedUsers.filter(user => user.role === APP_USER).length || 1
            ]
          },
          title: 'Users',
          width: window.innerWidth,
          roughness: 8,
          colors: ['red', 'orange', 'black', 'blue'],
          stroke: 'black',
          strokeWidth: 3,
          fillStyle: 'cross-hatch',
          fillWeight: 3.5,
        }
      );
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      console.log(err);
    })
  }
}
