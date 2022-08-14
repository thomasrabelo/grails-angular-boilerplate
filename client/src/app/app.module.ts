import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from "@angular/common";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RebirthHttpModule} from "@ng-zorro/rebirth-http";
import {SharedModule} from "./shared/shared.module";
import {httpInterceptorProviders} from "./core/interceptor";

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RebirthHttpModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: NZ_I18N, useValue: en_US }, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
