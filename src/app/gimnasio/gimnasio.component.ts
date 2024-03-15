import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { EjerciciosService } from '../services/ejerciciosService.service';
import { Router } from '@angular/router';

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
  public defaultColDef: any;
  public rowData: any[] = [];
  public loader = true;

  constructor(public ejerciciosService: EjerciciosService, private router: Router) { }

  ngOnInit(): void {
    this.paginar();
    this.aplicarFiltros();
    this.getEjercicios();
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "id", width: 80, hide: true },
    { headerName: "Nombre", field: "nombre", width: 360 },
    { headerName: "Músculo", field: "musculo", filterParams: {
        // Compara todos los textos aunque tengan tíldes o caracteres especiales
        textCustomComparator: (filter: any, value: any, filterText: any) => {
          const normalizedValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          const normalizedFilterText = filterText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          return normalizedValue.includes(normalizedFilterText);
        }
      }
    },
    { headerName: "Tipo ejercicio", field: "tipoEjercicio" },
    { headerName: "Información adicional", field: "info", filter: null, sortable: false, cellRenderer: () =>
      '<span style="display: flex; justify-content: flex-end; align-items: center; width: 100%; height: 100%;"><i class="ag-icon ag-icon-eye"></i></span>'
    }
  ];

  paginar(){
    this.pagination = true;
    this.paginationPageSize = 10;
    this.paginationPageSizeSelector = [5, 10, 15];
  }

  aplicarFiltros(){
    this.defaultColDef = {
      sortable: true,
      width: 200,
      editable: false,
      floatingFilter: true,
      filter: 'agTextColumnFilter',
    };
  }

  getEjercicios(){
    this.ejerciciosService.getEjercicios().subscribe(
      (response: any) =>{
        this.rowData = response;
        this.loader = false;
      }, (error: any) =>{
        Swal.fire('Error', 'No se pudieron obtener los ejercicios', 'error');
      }
    )
  }

  onCellClicked(data: any) {
    if(data.column.colId === "info"){
      this.router.navigate([`/descripcion-ejercicio/${data.data.id}`]);
    }
  }

}
