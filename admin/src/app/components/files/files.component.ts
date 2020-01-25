import { Component, OnInit } from '@angular/core';
import { FilesModel } from './file/files.model';
import { FilesService } from "../../services/files/files.service";

@Component({
  selector: 'app-files',
  templateUrl: './files.template.html',
  styleUrls: ['./files.style.scss']
})
export class FilesComponent implements OnInit {
  private activeFile: any;
  public files: FilesModel[] = [];
  constructor(
    private fileService: FilesService
  ) { }

  ngOnInit() {
  }

  public uploadFile(): void {
    this.fileService.sendFile(this.activeFile)
      .subscribe(
        (data: FilesModel) => {
        debugger;
      }, err => {
          console.log(err)
        })
  }
  
  public selectFile(event): void {
    const selectedFile = event.target.files[0];
    this.activeFile = new FilesModel(selectedFile, selectedFile.name, selectedFile.type)
    console.log(event.target.files[0])
    debugger;
  }
}
