import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      data: { breadcrumb: 'Dashboard' } },
  { path: 'schedule', loadChildren: () => import('./pages/appointment/appointment.module').then(m => m.AppointmentModule),
    data: { breadcrumb: 'Schedule' } },
  { path: 'doctor', loadChildren: () => import('./pages/doctor/doctor.module').then(m => m.DoctorModule),
    data: { breadcrumb: 'Doctors' } },
  { path: 'patient', loadChildren: () => import('./pages/patient/patient.module').then(m => m.PatientModule),
    data: { breadcrumb: 'Patients' } },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
    data: { breadcrumb: 'About' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
