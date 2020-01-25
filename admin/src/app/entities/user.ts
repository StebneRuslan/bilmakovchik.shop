export class User {
	_id: string = '';
	public apiKey: string = '';
	public firstName: string = '';
	public lastName: string = '';
	public email: string = '';
	public role: string = '';
	public password: string = '';
	public avatar: Avatar = new Avatar('', '', '');
}

export class Avatar {
  public name: string = '';
  public path: string = '';
  public type: string = '';
  constructor(fileName: string, filePath: string, fileType: string) {
    this.name = fileName;
    this.type = fileType;
    this.path = filePath;
  }
}
