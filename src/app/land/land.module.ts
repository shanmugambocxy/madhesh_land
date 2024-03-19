import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandComponent } from './land.component';
import { HomeComponent } from './home/home.component';
import { ViewlandComponent } from './viewland/viewland.component';
import { AddlandComponent } from './addland/addland.component';
import { EditlandComponent } from './editland/editland.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared-module/shared.module';
import { Addlandver2Component } from './addlandver2/addlandver2.component';
import { AuthGaurdService } from '../auth/services/auth-guard/auth-gaurd.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpSpinnerInterceptor } from '../services/http-spinner.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SpinnerService } from '../services/spinner.service';

// export const MY_DATE_FORMATS = {
//     parse: {
//         dateInput: 'LL',
//     },
//     display: {
//         dateInput: 'DD-MM-YYYY',
//         monthYearLabel: 'MMM YYYY',
//         dateA11yLabel: 'LL',
//         monthYearA11yLabel: 'MMMM YYYY',
//     },
// };

const routes: Routes = [
    {
        path: '',
        component: LandComponent,
        canActivate: [AuthGaurdService],
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            { path: 'home', component: HomeComponent },
            { path: 'addver2', component: Addlandver2Component },
            { path: 'edit/:id', component: Addlandver2Component },
            { path: 'view/:id', component: Addlandver2Component },

        ],
    },
];
@NgModule({
    declarations: [LandComponent, ViewlandComponent, HomeComponent, AddlandComponent,
        EditlandComponent,
        Addlandver2Component
    ],
    imports: [
        CommonModule,
        MaterialModule, MatIconModule, MatTableModule,
        RouterModule.forChild(routes), ReactiveFormsModule, FormsModule, SharedModule
    ],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: HttpSpinnerInterceptor,
        //     multi: true,
        // },
        SpinnerService,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
})
export class LandModule { }
