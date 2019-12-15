import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
/*
  ReactiveForm structure class
*/
export default class CreateUserModalForm {
	private formBuilder: FormBuilder;
	public formGroup: FormGroup;
	public model: User;
	
	constructor (
		model: User,
	) {
		this.formBuilder = new FormBuilder();
		this.model = model;
		this.createForm();
	}
	
	// Create form fields with validation rules
	public createForm() {
		this.formGroup = this.formBuilder.group({
			firstName: new FormControl(this.model.firstName, { validators: [Validators.required], updateOn: 'change'}),
			lastName: new FormControl(this.model.lastName, { validators: [Validators.required], updateOn: 'change'}),
			email: new FormControl(this.model.email, { validators: [Validators.required], updateOn: 'change'}),
			role: new FormControl(this.model.role, { validators: [Validators.required], updateOn: 'change'}),
			password: new FormControl(this.model.password, { validators: [Validators.required], updateOn: 'change'})
		});
		
		// form update
		this.formGroup.valueChanges.subscribe((data: any) => {
			this.model.firstName = data.firstName;
			this.model.lastName = data.lastName;
			this.model.email = data.email;
			this.model.role = data.role;
			this.model.password = data.password;
		});
	}
	
	// get form property name
	public getControl (name: string) {
		return this.formGroup.get(name);
	}
	// form update
	public patchForm(data: any): void {
		this.formGroup.patchValue(data);
		Object.keys(data).forEach(field => {
			this.model[field] = data[field];
		});
	}
}
