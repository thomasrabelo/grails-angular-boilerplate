import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {AppointmentRoutingModule} from "./appointment-routing.module";
import { AppointmentScheduleComponent } from './appointment-schedule/appointment-schedule.component';



@NgModule({
  declarations: [
    AppointmentScheduleComponent
  ],
  imports: [
    SharedModule, AppointmentRoutingModule
  ],
  exports: [
    AppointmentScheduleComponent
  ]
})
export class AppointmentModule { }
