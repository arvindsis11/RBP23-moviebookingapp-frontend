import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ResetData } from '../model/reset-data';
import { AuthapiService } from '../apiService/authapi.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { MatAlertComponent } from '../mat-alert/mat-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  forgotPasswordForm: FormGroup | any;
  hidePassword: boolean = true;
  resetSuccess: boolean | null = null;
  loading: boolean = false;
  errorMsg:string|any;

  constructor(private formBuilder: FormBuilder, private authService: AuthapiService,private dialog:MatDialog) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^\S.*\S$/)]],
      password: ['', [Validators.required,Validators.pattern(/^\S*$/),Validators.minLength(6)]],//fix me
      confirmPassword: ['', Validators.required],
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', [Validators.required,Validators.pattern(/^\S.*\S$/)]]
    },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword')
      });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;
    console.log(this.forgotPasswordForm.value);
    const formData = this.forgotPasswordForm.value;
    const resetPasswordData: ResetData = {
      username: formData.username,
      newPassword: formData.password,
      secQuestion: formData.securityQuestion,
      secAnswer: formData.securityAnswer
    };

    // console.log(resetPasswordData);
    this.authService.resetPasswordUser(resetPasswordData).subscribe(res => {
      if (res.msg === "could not update password(cause:sec ques not match)!") {
        this.errorMsg = "could not update password(cause:sec ques not match)!";
        this.resetSuccess = false;
        this.openAlert(this.errorMsg, false);
      }
      else if(res.msg === "Username doesn't exists!"){
        this.errorMsg = "Username doesn't exists!";
        this.resetSuccess = false;
        this.openAlert(this.errorMsg,false);
      }else{
        this.resetSuccess = true;
        this.forgotPasswordForm.reset(); 
        this.openAlert('password reset success!',true);
      }
      this.loading = false;
    }, err => {
      console.log('this is error')
      console.log(err.error);
      this.resetSuccess = false;
      this.openAlert(this.errorMsg,false);
      this.loading = false;
    })
  }
  openAlert(message:string ,processSuccess: boolean): void {
    this.dialog.open(MatAlertComponent, {
      width: '300px',
      height:'300px',
      data: { message,processSuccess},
    });
  }
}
