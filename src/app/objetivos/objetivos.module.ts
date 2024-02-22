import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ObjetivosComponent } from './objetivos/objetivos.component';


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Objetivos",
      urls: [{ title: "Objetivos", url: "/objetivos" }, { title: "Objetivos" }],
    },
    component: ObjetivosComponent,
  },
];
@NgModule({
  declarations: [
    ObjetivosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ObjetivosModule { }
