export class FilesModel {
	constructor(fileName: string, filePath: string, fileType: string) {
		this.name = fileName;
		this.path = filePath;
		this.type = fileType;
	}
	public name: string = '';
	public path: string = '';
	public type: string = '';
}
