import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      data: { breadcrumb: 'Dashboard' } },
  { path: 'doctor', loadChildren: () => import('./pages/doctor/doctor.module').then(m => m.DoctorModule),
    data: { breadcrumb: 'Doctors' } },
  { path: 'patient', loadChildren: () => import('./pages/patient/patient.module').then(m => m.PatientModule),
    data: { breadcrumb: 'Patients' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
