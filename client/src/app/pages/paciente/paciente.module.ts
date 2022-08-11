import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import {PacienteRoutingModule} from "./paciente-routing.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    PacienteListComponent
  ],
    imports: [
        CommonModule, PacienteRoutingModule, SharedModule
    ],
  exports: [
    PacienteListComponent
  ]
})
export class PacienteModule { }
