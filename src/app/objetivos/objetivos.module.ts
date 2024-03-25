import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ObjetivosComponent } from './objetivos/objetivos.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatProgressBarModule} from '@angular/material/progress-bar';


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
    FormsModule,
    MatSelectModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    MatProgressBarModule,
  ]
})
export class ObjetivosModule { }
