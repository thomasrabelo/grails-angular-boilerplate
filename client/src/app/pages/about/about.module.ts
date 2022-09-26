import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import {SharedModule} from "../../shared/shared.module";
import {AboutRoutingModule} from "./about-routing.module";



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    SharedModule, AboutRoutingModule
  ]
})
export class AboutModule { }
