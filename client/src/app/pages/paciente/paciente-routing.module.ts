import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PacienteListComponent} from "./paciente-list/paciente-list.component";
import {PacienteEditComponent} from "./paciente-edit/paciente-edit.component";

const routes: Routes = [

    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: PacienteListComponent},
    {path: 'create', component: PacienteEditComponent, data: { breadcrumb: 'Novo Paciente' }},
    {path: 'edit/:id', component: PacienteEditComponent, data: { breadcrumb: 'Editar Paciente' }},
    {path: 'show/:id', component: PacienteEditComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
