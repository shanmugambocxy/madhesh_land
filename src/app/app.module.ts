import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Report1LAComponent } from './reports/report1-la/report1-la.component';
import { Report2LPComponent } from './reports/report2-lp/report2-lp.component';
import { RouterModule } from '@angular/router';
import { AddlandComponent } from './land/addland/addland.component';
import { EditlandComponent } from './land/editland/editland.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportsComponent } from './reports/reports.component';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared-module/shared.module';
import { DatePipe } from '@angular/common';

import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderRouterModule,
  PB_DIRECTION,
} from "ngx-ui-loader";
import { Report3IndComponent } from './reports/report3-ind/report3-ind.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig =
{
  "bgsColor": "blue",
  "bgsOpacity": 1,
  "bgsPosition": "center-center",
  "bgsSize": 60,
  "bgsType": "fading-circle",
  "blur": 15,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "blue",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "fading-circle",
  "gap": 10,
  "logoPosition": "center-center",
  "logoSize": 200,
  "logoUrl": "assets/images/tnhbPNG.png",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgb(255,255,255)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": false,
  "text": "Loading...",
  "textColor": "#000000",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Report1LAComponent,
    Report2LPComponent,
    ReportsComponent,
    Report3IndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule, SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,

  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


