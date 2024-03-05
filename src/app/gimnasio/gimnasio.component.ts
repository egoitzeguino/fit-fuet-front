import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-gimnasio',
  templateUrl: './gimnasio.component.html',
  styleUrls: ['./gimnasio.component.scss']
})
export class GimnasioComponent implements OnInit
{
  public pagination: any;
  public paginationPageSize: any;
  public paginationPageSizeSelector: any;

  ngOnInit(): void {
    this.pagination = true;
    this.paginationPageSize = 10;
    this.paginationPageSizeSelector = [5, 10];
  }



  rowData = [
    { Id: 1, Nombre: "Tesla", Músculo: "Model Y", Tipo: 64950, Información: true },
    { Id: 2, Nombre: "Ford", Músculo: "F-Series", Tipo: 33850, Información: false },
    { Id: 3, Nombre: "Toyota", Músculo: "Corolla", Tipo: 29600, Información: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "Nombre", width: 300 },
    { field: "Músculo" },
    { field: "Tipo" },
    { field: "Información" }
  ];

}
