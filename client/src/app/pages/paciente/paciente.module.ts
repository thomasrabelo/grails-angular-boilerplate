import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import {PacienteRoutingModule} from "./paciente-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { PacienteEditComponent } from './paciente-edit/paciente-edit.component';

@NgModule({
  declarations: [
    PacienteListComponent,
    PacienteEditComponent
  ],
  imports: [
    PacienteRoutingModule, SharedModule
  ],
  exports: [
    PacienteListComponent
  ]
})
export class PacienteModule { }
