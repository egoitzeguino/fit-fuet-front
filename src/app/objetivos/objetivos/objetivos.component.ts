import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuarioService.service';
import Swal from 'sweetalert2';
import { AlimentosService } from '../../services/alimentosService.service';

interface Objetivo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {
  public peso!: number;
  outerStrokeColor: string = '#78C000'
  percentValue: number = 50;
  public cantidadKcal: number = 0;
  public cantidadKcalRequerida: number = 0;
  public cantidadCarbo: number = 0;
  public cantidadMaximaCarbo: number = 0;
  public cantidadProte: number = 0;
  public cantidadMaximaProte: number = 0;
  public cantidadGrasas: number = 0;
  public cantidadMaximaGrasas: number = 0;

  objetivos: Objetivo[] = [
    {value: '0', viewValue: 'Perder Peso'},
    {value: '1', viewValue: 'Mantener Peso'},
    {value: '2', viewValue: 'Ganar Peso'},
  ];
  public currentObjetivo: string | undefined;

  objetivo = this.objetivos[1].value;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private alimentosService: AlimentosService
  ) { }

  ngOnInit(): void {
    this.obtenerObjetivo();
    this.obtenerUltimoDato();
    this.obtenerDietaPorDiaYUsuario();
  }

  obtenerObjetivo(){
    this.usuarioService.obtenerObjetivo(parseInt(localStorage.getItem('idUsuario')!)).subscribe(
      (response: any) => {
        this.objetivo = this.objetivos[response.modo].value;
        this.currentObjetivo = this.objetivos[response.modo].value;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  obtenerUltimoDato(){
    this.usuarioService.obtenerUltimoDato(parseInt(localStorage.getItem('idUsuario')!)).subscribe(
      (response: any) => {
        if(response.item1 === -1 && response.item2 === -1){
          Swal.fire({
            icon: 'error',
            title: 'Dato corporal necesario',
            text: 'Es necesario registrar un dato corporal para calcular los objetivos',
            confirmButtonText: 'Cerrar',
          }).then(() => {
            this.router.navigate(['/datos-personales']);
          })
        } else{
          this.peso = response.item2;
          this.cantidadKcalRequerida = (response.item2 * 24) * 1.5;
        }
      }
    )
  }

  getColor(percent: number): string {
    if (percent < 30) {
      return 'rgba(200, 50, 50, 1)';
    } else if (percent >= 30 && percent <= 70) {
      return 'rgba(255, 128, 0, 1)';
    } else if (percent >= 70 && percent < 90){
      return 'rgba(50, 200, 50, 1)';
    } else if(percent >= 90 && percent <= 100){
      return  'rgba(50, 50, 200, 1)';
    }else{
      return 'rgba(200, 50, 50, 1)';
    }
  }

  getInnerColor(percent: number): string {
    if (percent < 30) {
      return 'rgba(255, 0, 0, 0.2)'; // Rojo casi transparente
    } else if (percent >= 30 && percent <= 70) {
      return 'rgba(255, 128, 0, 0.2)'; // Naranja casi transparente
    } else if (percent >= 70 && percent < 90){
      return 'rgba(0, 128, 0, 0.2)'; // Verde casi transparente
    } else if (percent >= 90 && percent <= 100) {
      return '#ADD8E6'; // Azul casi transparente
    } else{
      return 'rgba(255, 0, 0, 0.2)';// Rojo casi transparente
    }
  }

  obtenerKcalRequerida(){
    this.cantidadKcalRequerida = (this.peso * 24) * 1.5;
    if(this.objetivo === '0'){
      this.cantidadKcalRequerida = this.cantidadKcalRequerida - 300;
    } else if(this.objetivo === '2'){
      this.cantidadKcalRequerida = this.cantidadKcalRequerida + 300;
    }
    this.percentValue = this.cantidadKcal / this.cantidadKcalRequerida * 100;
    this.cantidadMaximaCarbo = (this.cantidadKcalRequerida * 0.5) / 4;
    this.cantidadMaximaProte = (this.cantidadKcalRequerida * 0.25) / 4;
    this.cantidadMaximaGrasas = (this.cantidadKcalRequerida * 0.25) / 9;
  }

  obtenerDietaPorDiaYUsuario() {
    this.alimentosService.obtenerDietaPorDiaYUsuario(parseInt(localStorage.getItem('idUsuario')!), new Date().toISOString().split('T')[0]).subscribe(
      (response: any) => {
        console.log(response)
        response.dietaList.forEach((alimento: any) => {
          this.cantidadKcal += (alimento.cantidad / 100) * alimento.alimento.calorias;
          this.cantidadCarbo += ((alimento.cantidad / 100) * alimento.alimento.carbohidratos);
          this.cantidadProte += ((alimento.cantidad / 100) * alimento.alimento.proteinas);
          this.cantidadGrasas += ((alimento.cantidad / 100) * alimento.alimento.grasas);
        });
        this.obtenerKcalRequerida();
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  cambiarObjetivo(modo: string){
    this.objetivo = modo;
    this.obtenerKcalRequerida();
  }
  guardar(){
    this.usuarioService.updateObjetivo(parseInt(localStorage.getItem('idUsuario')!),parseInt(this.objetivo)).subscribe(
      (response: any) => {
        this.currentObjetivo = this.objetivo;
        if(this.objetivo === '0'){
          Swal.fire({
            icon: 'info',
            title: 'Definición',
            text: 'Ten en cuenta que si quieres hacer una definición más agresiva deberás consumir menos calorías',
            confirmButtonText: 'Cerrar',
          });
        } else if(this.objetivo === '2'){
          Swal.fire({
            icon: 'info',
            title: 'Volumen',
            text: 'Ten en cuenta que si quieres hacer un volumen más agresivo deberás aumentar aun más las calorias',
            confirmButtonText: 'Cerrar',
          });
        }
      },
      (error: any) => {
        console.log(error);
      }
  )
  }
}
