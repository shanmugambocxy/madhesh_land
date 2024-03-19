import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { OtpComponent } from './otp/otp.component';
import { NewpwdComponent } from './newpwd/newpwd.component';
const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: 'otp', component: OtpComponent },
            { path: 'newpwd', component: NewpwdComponent },
        ],
    },
];
@NgModule({
    declarations: [AuthComponent, OtpComponent, NewpwdComponent],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes), ReactiveFormsModule, FormsModule
    ]
})
export class AuthModule { }
