import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EjerciciosService } from '../services/ejerciciosService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-descripcion-ejercicio',
  templateUrl: './descripcion-ejercicio.component.html',
  styleUrls: ['./descripcion-ejercicio.component.scss']
})
export class DescripcionEjercicioComponent implements OnInit{

  public idEjercicios!: number;
  public nombreEjercicio!: string;
  public musculoEjercicio!: string;
  public descripcionEjercicio!: string;
  public quemaEjercicio!: string;
  public metsEjercicio!: number;
  public imagenEjercicio!: string;

  constructor(private route: ActivatedRoute, private ejerciciosService: EjerciciosService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idEjercicios = parseInt(params.get('id')!);
    });
    this.obtenerDescripcionServicio(this.idEjercicios);
  }

  obtenerDescripcionServicio(idEjercicios: number) {
    this.idEjercicios = idEjercicios;

    this.ejerciciosService.getDescripcionEjercicio(this.idEjercicios).subscribe(
      (data: any) => {
        if(data === null) {
          this.router.navigate(['/lista-ejercicios']);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontraron datos para este ejercicio',
          });
        } else{
          this.nombreEjercicio = data.nombre;
          this.musculoEjercicio = data.musculoEjercitado;
          this.descripcionEjercicio = data.descripcion;
          this.quemaEjercicio = data.explicacion;
          this.metsEjercicio = data.met;
          this.imagenEjercicio = data.imagen;
        }
      }
    )
  }

}
