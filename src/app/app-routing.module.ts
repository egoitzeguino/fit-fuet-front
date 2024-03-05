import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CambiarContraseniaComponent } from './cambiar-contrasenia/cambiar-contrasenia.component';
import { AuthGuard } from './utils/authGuard';
import { UnauthenticatedGuard } from './utils/unauthenticatedGuard';
import { GimnasioComponent } from './gimnasio/gimnasio.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [UnauthenticatedGuard]
      },
      {
        path: 'registro',
        component: RegistroComponent,
        canActivate: [UnauthenticatedGuard]
      },
      {
        path: 'cambiar-contrasenia',
        component: CambiarContraseniaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'datos-personales',
        loadChildren: () => import('./datos-personales/datos-personales.module').then(m => m.DatosPersonalesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dieta',
        loadChildren: () => import('./dieta/dieta.module').then(m => m.DietaModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'actividad-fisica',
        loadChildren: () => import('./actividad-fisica/actividad-fisica.module').then(m => m.ActividadFisicaModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'suenio',
        loadChildren: () => import('./suenio/suenio.module').then(m => m.SuenioModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'objetivos',
        loadChildren: () => import('./objetivos/objetivos.module').then(m => m.ObjetivosModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'lista-ejercicios',
        component: GimnasioComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
