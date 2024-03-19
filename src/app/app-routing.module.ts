import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddlandComponent } from './land/addland/addland.component';
import { EditlandComponent } from './land/editland/editland.component';
import { HomeComponent } from './land/home/home.component';
import { Report1LAComponent } from './reports/report1-la/report1-la.component';
import { Report2LPComponent } from './reports/report2-lp/report2-lp.component';
import { ViewlandComponent } from './land/viewland/viewland.component';
import { AuthModule } from './auth/auth.modules';
import { LandModule } from './land/land.module';
import { LoginComponent } from './login/login.component';
import { Report3IndComponent } from './reports/report3-ind/report3-ind.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {path:'login',component:LoginComponent},
  { path: 'auth', loadChildren: () => (import('./auth/auth.modules')).then((m) => m.AuthModule) },
  { path: 'land', loadChildren: () => (import('./land/land.module')).then((m) => m.LandModule) },

  {path: 'report1LA',component: Report1LAComponent},
  {path: 'report2LP',component: Report2LPComponent},
  {path: 'report3',component: Report3IndComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
