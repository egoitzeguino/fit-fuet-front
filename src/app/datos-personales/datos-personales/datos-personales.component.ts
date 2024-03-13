import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/loginService.service';
import { EncryptionService } from '../../services/encriptarService.service';
import {MatTabsModule} from '@angular/material/tabs';
import * as echarts from 'echarts';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexLegend, ApexPlotOptions, ApexTheme, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { interval, timeInterval, map, Observable, delay } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuarioService.service';

export type datosCorporalesGrafico = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
  plotOptions: ApexPlotOptions | any;
};

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
})
export class DatosPersonalesComponent implements OnInit{

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public datosUsuario!: Partial<datosCorporalesGrafico>;
  public loader = true;
  public peso: number[] = [];
  public altura: number[] = [];
  public imc: number[] = [];
  public fecha: Date[] = [];
  public mostrarDatosCorporales = false;

  constructor(private router: Router, private loginService: LoginService, private usuarioService: UsuarioService) {
    this.cargarGrafico();
  }

  @Input() dni: string | undefined;
  @Input() nombre: string | undefined;
  @Input() apellidos: string | undefined;
  @Input() correo: string | undefined;
  imagenUsuario: string | undefined = '';

  ngOnInit(): void {
    setTimeout(() => {
      this.mostrarDatosCorporales = !this.mostrarDatosCorporales;
      this.dni = localStorage.getItem('dni')!;
      this.nombre = localStorage.getItem('usuario')?.split(' ')[0]!;
      this.apellidos = localStorage.getItem('usuario')?.split(' ')[1]!;
      this.correo = localStorage.getItem('email')!;
      this.loginService.obtenerImagenUsuario(parseInt(localStorage.getItem('idUsuario')!)).subscribe(
        (response: any) => {
          this.imagenUsuario = response.imagen;
        },
        (error) => {
          console.log(error);
        }
      );
      this.loader = false;
    }, 1000);
  }

  cambiarContrasenia(){
    this.router.navigate(['/cambiar-contrasenia']);
  }
  eliminarCuenta() {
    Swal.fire({
      title: 'Eliminar cuenta',
      html: '<p>Para poder eliminar la cuenta, introduzca la contraseña:</p>' +
        '<input type="email" id="email" class="swal2-input" placeholder="Ingrese su email">' +
        '<input type="password" id="password" class="swal2-input" placeholder="Ingrese su contraseña">',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      preConfirm: async () => {
        const password = (<HTMLInputElement>document.getElementById('password')).value;
        const passwordEncriptada = new EncryptionService().encryptPassword(password);
        const email = (<HTMLInputElement>document.getElementById('email')).value;

        return { email, passwordEncriptada };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { email, passwordEncriptada } = result.value;
        this.loginService.eliminarCuenta(email, passwordEncriptada).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Cuenta eliminada',
              text: 'Cuenta eliminada exitósamente',
              confirmButtonText: 'Cerrar'
            }).then((repuesta) => {
              if(repuesta.isConfirmed){
                this.loginService.logout();
              }
            });
          },
          (error:any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar la cuenta',
              text: error.error,
              confirmButtonText: 'Cerrar'
            });
          }
        );
      }
    });
  }

  editarDatos(){
    this.router.navigate(['/editar-datos']);
  }

  obtenerUltimos7Registros(): Observable<any> {
    return new Observable((observer) => {
      this.usuarioService.obtenerUltimos7Registros(parseInt(localStorage.getItem('idUsuario')!)).subscribe(
        (response: any) => {
          this.altura = response.datosUsuario.map((element: any) => parseFloat(element.item1).toFixed(2));
          this.peso = response.datosUsuario.map((element: any) => parseFloat(element.item2).toFixed(2));
          this.fecha = response.datosUsuario.map((element: any) => element.item3.substring(0, 10));
          this.imc = response.datosUsuario.map((element: any) => parseFloat(element.item4).toFixed(2));

          observer.next(); // Notificar que la obtención de registros ha completado
          observer.complete(); // Completar el observable
        },
        (error) => {
          observer.error(error); // Manejar errores
        }
      );
    });
  }


  //Datos personales esquema

  async cargarGrafico(){
    await this.obtenerUltimos7Registros().toPromise();
      this.datosUsuario = {
        series: [
          {
            name: "Peso",
            data: this.peso
          },
          {
            name: "IMC",
            data: this.imc
          }
        ],
        chart: {
          fontFamily: 'Montserrat,sans-serif',
          height: 290,
          type: 'area',
          toolbar: {
            show: false
          },
        },
        dataLabels: {
          enabled: true
        },
        colors: ["#0d6efd", "#28a745", "#6771dc"],
        stroke: {
          show: true,
          width: 4,
          colors: ["transparent"],
        },
        grid: {
          strokeDashArray: 3,
        },
        xaxis: {
          categories: this.fecha,
        },
        tooltip: {
          theme: 'dark'
        }
      };
    }
  
    irHistorico() {
      this.router.navigateByUrl("historico-datos-corporales");
    }

    Crud() {
      this.router.navigateByUrl("dato-corporal");
      }
}
