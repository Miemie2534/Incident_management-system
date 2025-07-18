import { Routes } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FireExtinguisherListComponent } from './pages/fire-extinguisher-list/fire-extinguisher-list.component';
import { ClaimsFormComponent } from './pages/claims-form/claims-form.component';
import { ClaimsListComponent } from './pages/claims-list/claims-list.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { DialogAnimationsComponent } from './pages/dialog-animations/dialog-animations.component';
import { IncidentComponent } from './pages/incident/incident.component';
import { IncidentListComponent } from './pages/incident-list/incident-list.component';
import { PatientFormComponent } from './pages/patient-form/patient-form.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { ClaimsEditComponent } from './pages/claims-edit/claims-edit.component';
import { PatientEditComponent } from './pages/patient-edit/patient-edit.component';
import { IncidentEditComponent } from './pages/incident-edit/incident-edit.component';
import { IncidentViewComponent } from './pages/incident-view/incident-view.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dialog', component: DialogAnimationsComponent
  },
  {
    path: 'main', component: MainComponent, canActivate: [authGuard]
  },
  {
    path: 'content', component: HomeComponent, canActivate: [authGuard]
  },
  {
    path: 'navbar', component: NavbarComponent, canActivate: [authGuard]
  },
  {
    path: 'fire-list', component: FireExtinguisherListComponent, canActivate: [authGuard]
  },
  {
    path: 'fire-form',
    loadComponent: () => import('./pages/fire-form/fire-form.component')
      .then(m => m.FireFormComponent), canActivate: [authGuard]
  },
  {
    path: 'claims-form', component: ClaimsFormComponent, canActivate: [authGuard]
  },
  {
    path: 'claims-edit/:id', component: ClaimsEditComponent, canActivate: [authGuard]
  },
  {
    path: 'incident-form', component: IncidentComponent, canActivate: [authGuard]
  },
  {
    path: 'incident-list', component: IncidentListComponent, canActivate: [authGuard]
  },
  {
    path: 'incident-edit/:id', component: IncidentEditComponent, canActivate: [authGuard]
  },
  {
    path: 'incident-view/:id', component: IncidentViewComponent, canActivate: [authGuard]
  },
  {
    path: 'claims-list', component: ClaimsListComponent, canActivate: [authGuard]
  },
  {
    path: 'patient-form', component: PatientFormComponent, canActivate: [authGuard]
  },
  {
    path: 'patient-list', component: PatientListComponent, canActivate: [authGuard]
  },
  {
    path: 'patient-edit/:id', component: PatientEditComponent, canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
      canActivate: [authGuard]
  },
]
