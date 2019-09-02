import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {


  registerUserForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.initRegisterForm();
  }

  ngOnInit() {
  }

  initRegisterForm() {
    this.registerUserForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      telephoneNumber: new FormControl(),
      email: new FormControl(),
      yearOfExperience: new FormControl(),
      dateOfBirth: new FormControl(),
    });
  }
  saveRegisteredUserDetails() {

  }

}
