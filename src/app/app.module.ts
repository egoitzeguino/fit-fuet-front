import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullComponent } from './layouts/full/full.component';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './shared/header/navigation.component';
import { NavigationModule } from './shared/header/navigation.module';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavigationModule,
    NgbDropdownModule, 
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FullComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
