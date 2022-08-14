import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoctorListComponent} from "./doctor-list/doctor-list.component";
import {DoctorEditComponent} from "./doctor-edit/doctor-edit.component";
import {DoctorShowComponent} from "./doctor-show/doctor-show.component";

const routes: Routes = [

    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: DoctorListComponent},
    {path: 'create', component: DoctorEditComponent, data: { breadcrumb: 'New Doctor' }},
    {path: 'edit/:id', component: DoctorEditComponent, data: { breadcrumb: 'Edit Doctor' }},
    {path: 'show/:id', component: DoctorShowComponent, data: { breadcrumb: 'Doctor Details' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
