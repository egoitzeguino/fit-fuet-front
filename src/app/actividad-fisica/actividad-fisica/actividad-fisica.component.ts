import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Rutina } from 'src/app/interfaces/rutina';

@Component({
  selector: 'app-actividad-fisica',
  templateUrl: './actividad-fisica.component.html',
  styleUrls: ['./actividad-fisica.component.css'],
})
export class ActividadFisicaComponent implements OnInit{

  public rutinaForm: FormGroup;
  public ejerciciosNumber!: number;
  date: string = new Date().toISOString().slice(0, 10);
  public ejercicios: string[] = ["Uno", "Weka"];
  public filteredOptions!: Observable<string[]>;

  constructor(private fb: FormBuilder) {
    this.ejerciciosNumber = 1;
    console.log(this.date);
    this.rutinaForm = this.fb.group({
      ejercicio: ['', ''],
      series: ['', ''],
      repeticiones: ['', ''],
      peso: ['', ''],
      fecha: ['', ''],
    })
  }

  ngOnInit(): void {
    this.filteredOptions = this.rutinaForm.get('ejercicio')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ejercicios.filter(option => option.toLowerCase().includes(filterValue));
  }

  agregarRutina() {
    this.ejerciciosNumber++;
    console.log(this.ejerciciosNumber);
  }

  getRange(): number[] {
    return Array.from({ length: this.ejerciciosNumber }, (_, i) => i + 1);
  }

  displayFn(ejercicio: string): string {
    return ejercicio && ejercicio ? ejercicio : '';
  }

}
