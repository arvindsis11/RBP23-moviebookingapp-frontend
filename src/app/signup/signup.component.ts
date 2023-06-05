import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupData } from '../model/signup-data';
import { AuthapiService } from '../apiService/authapi.service';
import { ResponseData } from '../model/response-data';
import { MatAlertComponent } from '../mat-alert/mat-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  registerForm: FormGroup | any;
  hidePassword: boolean = true;
  registrationSuccess: boolean | null = null;
  loading: boolean = false;//page load-progress bar

  constructor(private formBuilder: FormBuilder, private authService: AuthapiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^\S.*\S$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^\S*$/)]],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', [Validators.required, Validators.pattern(/^\S.*\S$/)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;
    const formData = this.registerForm.value;
    console.log(formData);
    const signupData: SignupData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      securityQuestion: formData.securityQuestion,
      securityAnswer: formData.securityAnswer,
    };
    this.authService.registerUser(signupData).subscribe(res => {
      console.log(res);
      if (res.msg === 'User registered successfully') {
        this.registrationSuccess = true;
        this.openAlert('User registered successfully!', true);
      } else {
        this.registrationSuccess = false;
        this.openAlert(res.msg, false);
      }
      this.loading = false;
    }, err => {
      this.registrationSuccess = false;
      console.log(err.error);
      this.loading = false;
    })
  }
  openAlert(message: string, processSuccess: boolean): void {
    this.dialog.open(MatAlertComponent, {
      width: '300px',
      height: '300px',
      data: { message, processSuccess },
    });
  }
}
