import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../auth/services/authentication/authentication.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  role = ''
  message = '';
  invalidLogin = false
  form: FormGroup;
  submitted = false;
  @Input()
  error!: string | null;
  hide = true;
  isDisabled = false;
  captcha: any;
  randomNumber: any;

  constructor(
    private router: Router,
    private loginservice: AuthenticationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.captchaRandomNumber();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  initializeForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password_encrypted: ['', Validators.required]
    })
  }

  checkLogin() {
    debugger
    if (this.randomNumber == this.captcha) {
      this.isDisabled = true;
      if (this.form.invalid) {
        this.submitted = true;
        return;
      }

      const username = this.form.get('username').value;
      const password_encrypted = this.form.get('password_encrypted').value;

      this.loginservice.authenticate(username, password_encrypted).subscribe(
        (response) => {
          this.invalidLogin = false;

          console.log(response);
          sessionStorage.setItem('token', response.accessToken);
          sessionStorage.setItem('accesslevel1', response.accesslevel1);
          sessionStorage.setItem('group_name', response.group_name);
          this.router.navigate(['/land/home']);
          this.isDisabled = false;
        },
        (error) => {
          this.invalidLogin = true;
          this.message = "Invalid Login";
          console.error("Login error:", error);
          this.isDisabled = false;
        }
      );
    } else {
      this.invalidLogin = true;
      this.message = 'Invalid Captcha'
    }
  }

  nameValidate(evt, field) {
    debugger

    // this.cdr.detectChanges();

    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    let regexValue = /[a-zA-Z 0-9]/;
    if (field == 'username') {
      regexValue = /[a-zA-Z 0-9]/;
    } else if (field == 'number') {
      regexValue = /[0-9]/;
    } else if (field == 'caps') {
      regexValue = /[A-Z0-9]/;
    }
    else {
      regexValue = /[a-zA-Z0-9@]/;
    }
    const regex = regexValue;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) {
        theEvent.preventDefault();
      }
    }

    // console.log('evt', evt.target.value);


  }
  captchaRandomNumber() {
    // let number = Math.floor(100000 + Math.random() * 900000);
    // this.randomNumber = number;


    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.randomNumber = text;

    console.log('text', text);


  }
  onPaste(event: ClipboardEvent) {
    event.preventDefault(); // Prevent the default paste behavior
  }

}
