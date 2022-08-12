import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {PatientRoutingModule} from "./patient-routing.module";
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';



@NgModule({
  declarations: [
    PatientListComponent,
    PatientEditComponent
  ],
  imports: [
    PatientRoutingModule,
    SharedModule
  ],
  exports: [
    PatientListComponent
  ]
})
export class PatientModule { }
