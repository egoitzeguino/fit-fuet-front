import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { Rutina } from 'src/app/interfaces/rutina';
import { EjerciciosService } from 'src/app/services/ejerciciosService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividad-fisica',
  templateUrl: './actividad-fisica.component.html',
  styleUrls: ['./actividad-fisica.component.css'],
})
export class ActividadFisicaComponent implements OnInit{

  public rutinaForm: FormGroup;
  public ejerciciosNumber!: number;
  date: string = new Date().toISOString().slice(0, 10);
  public ejercicios: string[] = [];
  public filteredOptions!: Observable<string[]>;
  public ejerciciosList: Rutina[] = [];
  public idYNombreEjercicios: any;
  public dicEjercicios: { [clave: string]: number } = {};
  public ejercicioSeleccionadoValido: boolean = true;

  constructor(private fb: FormBuilder,
      private ejerciciosService: EjerciciosService,
      private router: Router,
      ) {
    this.obtenerNombreEjercicios();
    this.ejerciciosNumber = 1;
    this.rutinaForm = this.fb.group({
      ejercicio: ['', ''],
      series: ['', ''],
      repeticiones: ['', ''],
      peso: ['', ''],
      fecha: ['', ''],
    })
    this.ejerciciosList.push({
    IdUsuario: 0, // Asigna el valor adecuado según tus requisitos
    IdEjercicio: 0, // Asigna el valor adecuado según tus requisitos
    Series: 0,
    Repeticiones: 0,
    Peso: 0,
    Fecha: new Date() // Utiliza new Date() para crear una instancia de Date
  });
  }

  ngOnInit(): void {
    //this.ejerciciosList.push(this.rutinaForm.value);
    this.filteredOptions = this.rutinaForm.get('ejercicio')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      this.rutinaForm.valueChanges.subscribe((valor: any) => {
        //console.log(valor);
        //console.log(this.ejerciciosList);
      });
  }
checkEjercicioValido(ejercicio: string): void {
    this.ejercicioSeleccionadoValido = this.ejercicios.includes(ejercicio);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ejercicios.filter(option => option.toLowerCase().includes(filterValue));
  }

  agregarRutina() {
    const nuevaRutina = { ...this.rutinaForm.value };
      this.checkEjercicioValido(nuevaRutina.ejercicio);
      if (!this.ejercicioSeleccionadoValido) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ejercicio no encontrado',
          confirmButtonText: 'Cerrar',
        });
      }else{
        console.log(this.ejerciciosList);
        this.ejerciciosList.push(nuevaRutina);
      }
  }

  guardar() {
    const nuevaRutina = { ...this.rutinaForm.value };
      this.checkEjercicioValido(nuevaRutina.ejercicio);
      if (!this.ejercicioSeleccionadoValido) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ejercicio no encontrado',
          confirmButtonText: 'Cerrar',
        });
      }else{
        console.log(this.ejerciciosList);
        this.ejerciciosList.push(nuevaRutina);
        this.eliminarEjercicio(0);
        console.log(this.ejerciciosList);
        Swal.fire({
          icon: 'success',
          title: 'Rutina creada',
          text: 'Rutina creada con éxito!',
          confirmButtonText: 'Cerrar',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
  }


  displayFn(ejercicio: string): string {
    return ejercicio && ejercicio ? ejercicio : '';
  }

  eliminarEjercicio(ejercicio: number) {
    this.ejerciciosList.splice(ejercicio, 1);
  }

  obtenerNombreEjercicios() {
    this.ejerciciosService.getNombreEjercicios().subscribe(data => {
      for(let i = 0; i < data.listaNombreEjercicios.length; i++) {
        this.ejercicios.push(data.listaNombreEjercicios[i].item2);
        this.dicEjercicios[data.listaNombreEjercicios[i].item2] = data.listaNombreEjercicios[i].item1;
      }
      this.idYNombreEjercicios = data.listaNombreEjercicios;
    })
  }

  cambiarNombrePorIdEjercicio(ejercicio: number){
    let idEjercicio;
    this.idYNombreEjercicios[ejercicio];
    return idEjercicio;
  }
}
