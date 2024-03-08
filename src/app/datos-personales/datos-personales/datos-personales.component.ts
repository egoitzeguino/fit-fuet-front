import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/loginService.service';
import { EncryptionService } from '../../services/encriptarService.service';
import {MatTabsModule} from '@angular/material/tabs';
import * as echarts from 'echarts';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexLegend, ApexPlotOptions, ApexTheme, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { interval, timeInterval } from 'rxjs';

export type salesChartOptions = {
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
  public salesChartOptions: Partial<salesChartOptions>;
  public loader = true;
  public peso: number[] = [];
  public altura: number[] = [];
  public imc: number[] = [];
  public fecha: Date[] = [];

  constructor(private router: Router, private loginService: LoginService, encryptionService: EncryptionService) {
    this.salesChartOptions = this.cargarGrafico();
  }

  @Input() dni: string | undefined;
  @Input() nombre: string | undefined;
  @Input() apellidos: string | undefined;
  @Input() correo: string | undefined;
  imagenUsuario: string | undefined = '';

  ngOnInit(): void {
    interval(1000).subscribe(() => {
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
    });
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
      console.log(result);
      if (result.isConfirmed) {
        const { email, passwordEncriptada } = result.value;
        console.log(email, passwordEncriptada);
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


  //Datos personales

  cargarGrafico(){
    return {
      series: [
        {
          name: "Peso",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "IMC",
          data: [11, 32, 45, 32, 34, 52, 41]
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
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
        ],
      },
      tooltip: {
        theme: 'dark'
      }
    };
  }

}
