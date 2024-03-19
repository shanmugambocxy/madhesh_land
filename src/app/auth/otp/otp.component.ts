import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanddataService } from '../../land/landdata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  otpmessage: any;
  otperror: any;
  usernotfound: any;
  form: FormGroup;
  userDisabled: boolean = false;
  otpverified: any;
  otpnotverified: any;
  otpDisabled: boolean = false;
  passwordChanged: any;
  passwordNotChanged: any;


  @Input()
  error!: string | null;

  constructor(
    private landdataService: LanddataService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      otp: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  sentotp() {

    const username = this.form.get('userName').value;
    const data = {
      username: username
    };

    this.http.post(`http://localhost:5000/api/SendOtp`, data, { responseType: 'text' }).subscribe(
      response => {
        if (response) {
          this.userDisabled = true;
          this.otpmessage = 'OTP sent successfully!';
        } else {
          this.usernotfound = 'Username not found.';
        }
      },
      error => {
        console.log(error);
        this.otperror = 'Error while sending OTP'
      }
    );

  }


  checkOtp() {

    const data = {
      username: this.form.get('userName').value,
      otp: this.form.get('otp').value
    };

    this.http.post('http://localhost:5000/api/VerifyOtp', data, { responseType: 'text' }).subscribe(
      response => {
        console.log(response);
        this.userDisabled = true;
        this.otpDisabled = true;
        this.otpverified = 'OTP Verified Successfully';
      },
      error => {
        this.otpnotverified = 'OTP Verification Failed';
        console.error(error);
      }
    );
  }

  changePassword() {
    const data = {
      username: this.form.get('userName').value,
      password: this.form.get('password').value
    };

    this.http.post('http://localhost:5000/api/changepassword', data, { responseType: 'text' }).subscribe(
      response => {
        console.log(response);
        this.passwordChanged = "Password Changed Successfully!"
        this.router.navigate(['/']);
      },
      error => {
        console.error(error);
        this.passwordNotChanged = "Error in changing password"
      }
    );
  }

}
