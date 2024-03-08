import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Datos personales",
      urls: [{ title: "Datos personales", url: "/datos-personales" }, { title: "Datos personales" }],
    },
    component: DatosPersonalesComponent,
  },
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
})
export class DatosPersonalesModule { }
