import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PacienteListComponent} from "./paciente-list/paciente-list.component";

const routes: Routes = [
  {
    path: '',
    component: PacienteListComponent,
    data: {
      breadcrumb: 'Pacientes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
