import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    NgbDropdownModule,
    MatBadgeModule
],
  exports: [NavigationComponent]
})
export class NavigationModule { }
