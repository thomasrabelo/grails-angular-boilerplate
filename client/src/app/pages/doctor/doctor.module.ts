import { NgModule } from '@angular/core';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { DoctorShowComponent } from './doctor-show/doctor-show.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import {SharedModule} from "../../shared/shared.module";
import {DoctorRoutingModule} from "./doctor-routing.module";



@NgModule({
  declarations: [
    DoctorEditComponent,
    DoctorShowComponent,
    DoctorListComponent
  ],
  imports: [
    SharedModule, DoctorRoutingModule
  ],
  exports: [
    DoctorListComponent
  ]
})
export class DoctorModule { }
