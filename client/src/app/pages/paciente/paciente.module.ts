import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import {PacienteRoutingModule} from "./paciente-routing.module";
import {NzTableModule} from "ng-zorro-antd/table";


@NgModule({
  declarations: [
    PacienteListComponent
  ],
  imports: [
    CommonModule, PacienteRoutingModule, NzTableModule
  ],
  exports: [
    PacienteListComponent
  ]
})
export class PacienteModule { }
