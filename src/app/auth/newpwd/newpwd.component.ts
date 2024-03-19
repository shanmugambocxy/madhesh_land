import { Component, OnInit } from '@angular/core';
import { LanddataService } from '../../land/landdata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newpwd',
  templateUrl: './newpwd.component.html',
  styleUrls: ['./newpwd.component.css']
})
export class NewpwdComponent implements OnInit {
  form: FormGroup;
  message = '';

  constructor(private landdataService: LanddataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      NewPassword: ['', Validators.required]
    })
  }
  
  updatenewpassword(): void {

    //   let user = sessionStorage.getItem('usernamedata');
    //   if(this.changepwd.username == user){
    //     this.landdataService.updatepwd(this.changepwd)
    //     .subscribe(response => {
    //       this.message = response.message ? response.message : 'Password was updated successfully!';
    //     },
    //       error => {
    //         console.log(error);
    //       });
    //     }
    //   else{
    //   this.message = "Enter correct Username"
    //      }
    // }
  }
}
