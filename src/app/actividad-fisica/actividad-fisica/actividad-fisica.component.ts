import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Rutina } from 'src/app/interfaces/rutina';
import { EjerciciosService } from 'src/app/services/ejerciciosService.service';

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

  constructor(private fb: FormBuilder, private ejerciciosService: EjerciciosService) {
    this.obtenerNombreEjercicios();
    this.ejerciciosNumber = 1;
    this.rutinaForm = this.fb.group({
      ejercicio: ['', ''],
      series: ['', ''],
      repeticiones: ['', ''],
      peso: ['', ''],
      fecha: ['', ''],
    })
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
        console.log(this.ejerciciosList);
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ejercicios.filter(option => option.toLowerCase().includes(filterValue));
  }

  agregarRutina() {
    this.ejerciciosList.push(this.rutinaForm.value);
    console.log(this.ejerciciosList);
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
