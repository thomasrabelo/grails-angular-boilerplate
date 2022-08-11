import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IndexComponent} from "./index/index.component";
import {NavComponent} from "./nav/nav.component";
import {NavService} from "./nav/nav.service";
import {HttpClientModule} from "@angular/common/http";
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from "@angular/common";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RebirthHttpModule} from "@ng-zorro/rebirth-http";
import {SharedModule} from "./shared/shared.module";
import {httpInterceptorProviders} from "./core/interceptor";

registerLocaleData(pt);


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavComponent
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
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService,
    { provide: NZ_I18N, useValue: pt_BR }, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
