import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    NgbDropdownModule
],
  exports: [NavigationComponent]
})
export class NavigationModule { }
