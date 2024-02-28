import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CambiarContraseniaComponent } from './cambiar-contrasenia/cambiar-contrasenia.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: 'cambiar-contrasenia',
        component: CambiarContraseniaComponent
      },
      {
        path: 'datos-personales',
        loadChildren: () => import('./datos-personales/datos-personales.module').then(m => m.DatosPersonalesModule)
      },
      {
        path: 'dieta',
        loadChildren: () => import('./dieta/dieta.module').then(m => m.DietaModule)
      },
      {
        path: 'actividad-fisica',
        loadChildren: () => import('./actividad-fisica/actividad-fisica.module').then(m => m.ActividadFisicaModule)
      },
      {
        path: 'suenio',
        loadChildren: () => import('./suenio/suenio.module').then(m => m.SuenioModule)
      },
      {
        path: 'objetivos',
        loadChildren: () => import('./objetivos/objetivos.module').then(m => m.ObjetivosModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
