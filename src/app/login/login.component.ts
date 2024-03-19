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
    this.isDisabled = true;
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }

    const username = this.form.get('username').value;
    const password_encrypted = this.form.get('password_encrypted').value;

    this.loginservice.authenticate(username, password_encrypted).subscribe(
      (response) => {
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
  }




}
