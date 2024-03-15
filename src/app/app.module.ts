import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullComponent } from './layouts/full/full.component';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login/login.component';
import { NavigationModule } from './shared/header/navigation.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistroComponent } from './registro/registro.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AppConfig } from 'src/app-settings';
import { TokenInterceptorService } from './services/tokenInterceptor.service';
import { GimnasioComponent } from './gimnasio/gimnasio.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActividadFisicaComponent } from './actividad-fisica/actividad-fisica/actividad-fisica.component';
import { EditarDatosComponent } from './editarDatos/editarDatos.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { DatosPersonalesComponent } from './datos-personales/datos-personales/datos-personales.component';
import { DatosPersonalesModule } from './datos-personales/datos-personales.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HistoricoDatosCorporalesComponent } from './historico-datos-corporales/historico-datos-corporales.component';
import { CrudDatoCorporalComponent } from './crud-dato-corporal/crud-dato-corporal.component';
import { DescripcionEjercicioComponent } from './descripcion-ejercicio/descripcion-ejercicio.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    RegistroComponent,
    GimnasioComponent,
    ActividadFisicaComponent,
    EditarDatosComponent,
    ActividadFisicaComponent,
    DatosPersonalesComponent,
    HistoricoDatosCorporalesComponent,
    CrudDatoCorporalComponent,
    DescripcionEjercicioComponent
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
    MatSnackBarModule,
    ToastModule,
    AgGridModule,
    MatAutocompleteModule,
    MatTabsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    NgApexchartsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: 'APP_CONFIG',
      useValue: AppConfig
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true
    },
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
