import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from './registration.model';
/*
  ReactiveForm structure class
*/
export default class RegistrationForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: RegistrationModel;

  constructor (
    model: RegistrationModel,
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
      password: new FormControl(this.model.password, { validators: [Validators.required], updateOn: 'change'})
    });

    // form update
    this.formGroup.valueChanges.subscribe((data: RegistrationModel) => {
      this.model.email = data.email;
      this.model.password = data.password;
      this.model.firstName = data.firstName;
      this.model.lastName = data.lastName;
    });
  }

  // get form property name
  public getControl (name: string) {
    return this.formGroup.get(name);
  }
}
