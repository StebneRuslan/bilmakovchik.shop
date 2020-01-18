import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUploaderComponent } from './users-uploader.component';

describe('UsersUploaderComponent', () => {
  let component: UsersUploaderComponent;
  let fixture: ComponentFixture<UsersUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
