export class FilesModel {
	constructor(fileName: string, filePath: string, fileType: string) {
		this.fileName = fileName;
		this.filePath = filePath;
		this.fileType = fileType;
	}
	public fileName: string = '';
	public filePath: string = '';
	public fileType: string = '';
}
