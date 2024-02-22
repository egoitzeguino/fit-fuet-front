import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietaComponent } from './dieta/dieta.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Dieta",
      urls: [{ title: "Dieta", url: "/dieta" }, { title: "Dieta" }],
    },
    component: DietaComponent,
  },
];
@NgModule({
  declarations: [
    DietaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DietaModule { }
