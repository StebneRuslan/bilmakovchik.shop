import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { FilesModel } from "../../components/files/file/files.model";
import { ApiService } from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private api: ApiService) { }

  public sendFile(file): Observable<FilesModel> {
    return this.api.put('/files', file.filePath, {
      headers: {
        'x-file-name': file.fileName,
        'Content-Type': file.fileType
      }
    })
  }

  public getUserFiles(): Observable<FilesModel[]> {
    return this.api.get('/files')
  }
}
