import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuenioComponent } from './suenio/suenio.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Sueño",
      urls: [{ title: "Sueño", url: "/suenio" }, { title: "Sueño" }],
    },
    component: SuenioComponent,
  },
];
@NgModule({
  declarations: [
    SuenioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SuenioModule { }
