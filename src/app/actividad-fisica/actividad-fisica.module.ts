import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActividadFisicaComponent } from './actividad-fisica/actividad-fisica.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Actividad Fisica",
      urls: [{ title: "Actividad Fisica", url: "/actividad-fisica" }, { title: "Actividad Fisica" }],
    },
    component: ActividadFisicaComponent,
  },
];
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class ActividadFisicaModule { }
