export interface Rutina{
  IdUsuario: number;
  IdEjercicio: number;
  Series?: number;
  Repeticiones?: number;
  Peso?: number;
  Tiempo?: number;
  Fecha: Date;
}