import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class ActividadFisicaComponent implements OnInit {

  public rutinaFormF: FormGroup;
  public rutinaFormC: FormGroup;
  public ejerciciosNumber!: number;
  date: string = new Date().toISOString().slice(0, 10);
  public ejercicios: string[] = [];
  public ejerciciosFuerza: string[] = [];
  public ejerciciosCardio: string[] = [];
  public filteredOptionsF!: Observable<string[]>;
  public filteredOptionsC!: Observable<string[]>;
  public ejerciciosList: Rutina[] = [];
  public ejerciciosListF: Rutina[] = [];
  public ejerciciosListC: Rutina[] = [];
  public idYNombreEjercicios: any;
  public dicEjercicios: { [clave: string]: number } = {};
  public ejercicioSeleccionadoValido: boolean = true;

  constructor(private fb: FormBuilder,
    private ejerciciosService: EjerciciosService,
    private router: Router,
  ) {
    this.obtenerNombreEjercicios();
    this.ejerciciosNumber = 1;
    this.rutinaFormF = this.fb.group({
      ejercicio: ['', Validators.required],
      series: ['', [this.noNegativo, Validators.required]],
      repeticiones: ['', [this.noNegativo, Validators.required]],
      peso: ['', [this.noNegativo, Validators.required]],
      fecha: ['', Validators.required],
    })
    this.rutinaFormC = this.fb.group({
      ejercicio: ['', Validators.required],
      tiempo: ['', [this.noNegativo, Validators.required]],
      fecha: ['', Validators.required],
    })
    this.ejerciciosListF.push({
      IdUsuario: 0, // Asigna el valor adecuado según tus requisitos
      IdEjercicio: 0, // Asigna el valor adecuado según tus requisitos
      Series: 0,
      Repeticiones: 0,
      Peso: 0,
      Tiempo: 0,
      Fecha: new Date() // Utiliza new Date() para crear una instancia de Date
    });
    this.ejerciciosListC.push({
      IdUsuario: 0, // Asigna el valor adecuado según tus requisitos
      IdEjercicio: 0, // Asigna el valor adecuado según tus requisitos
      Series: 0,
      Repeticiones: 0,
      Peso: 0,
      Tiempo: 0,
      Fecha: new Date() // Utiliza new Date() para crear una instancia de Date
    });
  }

  ngOnInit(): void {
    //this.ejerciciosList.push(this.rutinaForm.value);
    this.filteredOptionsF = this.rutinaFormF.get('ejercicio')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterF(value))
      );

    this.rutinaFormF.valueChanges.subscribe((valor: any) => {
      //console.log(valor);
      //console.log(this.ejerciciosList);
    });
    this.filteredOptionsC = this.rutinaFormC.get('ejercicio')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterC(value))
      );

    this.rutinaFormC.valueChanges.subscribe((valor: any) => {
      //console.log(valor);
      //console.log(this.ejerciciosList);
    });
  }

  noNegativo(control: any) {
    const value = control.value;
    if (value < 0) {
      return { negativo: true };
    }
    return null;
  }

  checkEjercicioValido(ejercicio: string): void {
    this.ejercicioSeleccionadoValido = this.ejercicios.includes(ejercicio);
  }

  private _filterF(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ejerciciosFuerza.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterC(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ejerciciosCardio.filter(option => option.toLowerCase().includes(filterValue));
  }

  agregarRutinaF() {
    const nuevaRutina = { ...this.rutinaFormF.value };
    if (this.rutinaFormF.valid) {
      this.checkEjercicioValido(nuevaRutina.ejercicio);
      if (!this.ejercicioSeleccionadoValido) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ejercicio no encontrado',
          confirmButtonText: 'Cerrar',
        });
      } else {
        const rutinaCompleta: Rutina = {
          IdUsuario: parseInt(localStorage.getItem('idUsuario')!),
          IdEjercicio: this.dicEjercicios[nuevaRutina.ejercicio],
          Series: nuevaRutina.series,
          Repeticiones: nuevaRutina.repeticiones,
          Peso: nuevaRutina.peso,
          Fecha: new Date(nuevaRutina.fecha)
        };
        this.ejerciciosListF.push(rutinaCompleta);
      }
    }
    else {
      this.rutinaFormF.markAllAsTouched();
    }
  }

  agregarRutinaC() {
    const nuevaRutina = { ...this.rutinaFormC.value };
    if (this.rutinaFormC.valid) {
      this.checkEjercicioValido(nuevaRutina.ejercicio);
      if (!this.ejercicioSeleccionadoValido) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ejercicio no encontrado',
          confirmButtonText: 'Cerrar',
        });
      } else {
        const rutinaCompleta: Rutina = {
          IdUsuario: parseInt(localStorage.getItem('idUsuario')!),
          IdEjercicio: this.dicEjercicios[nuevaRutina.ejercicio],
          Tiempo: nuevaRutina.tiempo,
          Fecha: new Date(nuevaRutina.fecha)
        };
        this.ejerciciosListC.push(rutinaCompleta);
      }
    }
    else {
      this.rutinaFormC.markAllAsTouched();
    }
  }

  guardar() {
    if (this.rutinaFormF.valid && this.rutinaFormC.valid || this.ejerciciosListF.length == 1) {
      let nuevaRutina = { ...this.rutinaFormF.value };
      this.checkEjercicioValido(nuevaRutina.ejercicio);
      if (!this.ejercicioSeleccionadoValido) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ejercicio no encontrado',
          confirmButtonText: 'Cerrar',
        });
      }
      if (nuevaRutina.ejercicio != '') {
        const rutinaCompleta: Rutina = {
          IdUsuario: parseInt(localStorage.getItem('idUsuario')!),
          IdEjercicio: this.dicEjercicios[nuevaRutina.ejercicio],
          Series: nuevaRutina.series,
          Repeticiones: nuevaRutina.repeticiones,
          Peso: nuevaRutina.peso,
          Fecha: new Date(nuevaRutina.fecha)
        };
        this.ejerciciosListF.push(rutinaCompleta);
        this.eliminarEjercicioF(0);
      }
      nuevaRutina = { ...this.rutinaFormC.value };
      this.checkEjercicioValido(nuevaRutina.ejercicio);
      if (!this.ejercicioSeleccionadoValido) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ejercicio no encontrado',
          confirmButtonText: 'Cerrar',
        });
      }
      if (nuevaRutina.ejercicio != '') {
        const rutinaCompleta: Rutina = {
          IdUsuario: parseInt(localStorage.getItem('idUsuario')!),
          IdEjercicio: this.dicEjercicios[nuevaRutina.ejercicio],
          Tiempo: nuevaRutina.tiempo,
          Fecha: new Date(nuevaRutina.fecha)
        };
        this.ejerciciosListC.push(rutinaCompleta)
        this.eliminarEjercicioC(0);
      }

      this.ejerciciosList = this.ejerciciosListF.concat(this.ejerciciosListC);
      for (let i = 0; i < this.ejerciciosList.length; i++) {
        if (this.ejerciciosList[i].IdEjercicio === 0) {
          this.ejerciciosList.splice(i, 1);
          i--;
        }
      }
      this.ejerciciosService.guardarRutina(this.ejerciciosList).subscribe(
        (response: any) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Rutina añadida',
            text: '¡Rutina añadida exitósamente!',
            confirmButtonText: 'Cerrar'
          }).then((respuesta) => {
            if (respuesta.isConfirmed) {
              //TODO: Enviar a la pagina de todas las rutinas
              //this.router.navigateByUrl("historico-datos-corporales");
            }
          });
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al añadir la rutina',
            confirmButtonText: 'Cerrar'
          });
        }
      );
      //console.log(this.ejerciciosList);
    }
    else {
      this.rutinaFormF.markAllAsTouched();
      this.rutinaFormC.markAllAsTouched();
    }
  }


  displayFn(ejercicio: string): string {
    return ejercicio && ejercicio ? ejercicio : '';
  }

  eliminarEjercicioF(ejercicio: number) {
    this.ejerciciosListF.splice(ejercicio, 1);
  }
  eliminarEjercicioC(ejercicio: number) {
    this.ejerciciosListC.splice(ejercicio, 1);
  }

  obtenerNombreEjercicios() {
    this.ejerciciosService.getNombreEjercicios().subscribe(data => {
      for (let i = 0; i < data.listaNombreEjercicios.length; i++) {
        this.ejercicios.push(data.listaNombreEjercicios[i].item2);
        if (data.listaNombreEjercicios[i].item3 == "Fuerza")
          this.ejerciciosFuerza.push(data.listaNombreEjercicios[i].item2);
        else
          this.ejerciciosCardio.push(data.listaNombreEjercicios[i].item2);
        this.dicEjercicios[data.listaNombreEjercicios[i].item2] = data.listaNombreEjercicios[i].item1;
      }
      this.idYNombreEjercicios = data.listaNombreEjercicios;
    })
  }

  cambiarNombrePorIdEjercicio(ejercicio: number) {
    let idEjercicio;
    this.idYNombreEjercicios[ejercicio];
    return idEjercicio;
  }
}
