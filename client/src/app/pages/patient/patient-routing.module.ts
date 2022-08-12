import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatientListComponent} from "./patient-list/patient-list.component";
import {PatientEditComponent} from "./patient-edit/patient-edit.component";

const routes: Routes = [

    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: PatientListComponent},
    {path: 'create', component: PatientEditComponent, data: { breadcrumb: 'New Patient' }},
    {path: 'edit/:id', component: PatientEditComponent, data: { breadcrumb: 'Edit Patient' }},
    // {path: 'show/:id', component: PacienteEditComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
