import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppointmentScheduleComponent} from "./appointment-schedule/appointment-schedule.component";

const routes: Routes = [

    {path: '', redirectTo: 'schedule', pathMatch: 'full'},
    {path: 'schedule', component: AppointmentScheduleComponent}
    // {path: 'list', component: DoctorListComponent},
    // {path: 'create', component: DoctorEditComponent, data: { breadcrumb: 'New Doctor' }},
    // {path: 'edit/:id', component: DoctorEditComponent, data: { breadcrumb: 'Edit Doctor' }},
    // {path: 'show/:id', component: DoctorShowComponent, data: { breadcrumb: 'Doctor Details' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
