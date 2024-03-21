import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AlimentosService } from '../services/alimentosService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.scss']
})
export class AlimentosComponent implements OnInit {
  public pagination: any;
  public paginationPageSize: any;
  public paginationPageSizeSelector: any;
  public defaultColDef: any;
  public rowData: any[] = [];
  public loader = true;

  constructor(private alimentosService: AlimentosService) { }

  ngOnInit(): void {
    this.paginar();
    this.aplicarFiltros();
    //this.getAlimentos();
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "id", width: 80, hide: true },
    { headerName: "Nombre Alimento", field: "nombre", width: 250, floatingFilter: true, filter: 'agTextColumnFilter', filterParams: {
      // Compara todos los textos aunque tengan tíldes o caracteres especiales
        textCustomComparator: (filter: any, value: any, filterText: any) => {
          const normalizedValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          const normalizedFilterText = filterText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          return normalizedValue.includes(normalizedFilterText);
        }
      }
    },
    { headerName: "Tipo Alimento", field: "tipoAlimento", width: 250, floatingFilter: true, filter: 'agTextColumnFilter', filterParams: {
        // Compara todos los textos aunque tengan tíldes o caracteres especiales
        textCustomComparator: (filter: any, value: any, filterText: any) => {
          const normalizedValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          const normalizedFilterText = filterText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          return normalizedValue.includes(normalizedFilterText);
        }
      }
    },
    { headerName: "Calorias", field: "calorias" },
    { headerName: "Carbohidratos", field: "carbohidratos", width: 150 },
    { headerName: "Proteinas", field: "proteinas" },
    { headerName: "Grasas", field: "grasas" },
    { headerName: "Fibra", field: "fibra" },
    { headerName: "Seleccionar", field: "seleccionar", filter: null, sortable: false, cellRenderer: () =>
      '<span style="display: flex; justify-content: flex-end; align-items: center; width: 100%; height: 100%;"><i class="bi bi-check"></i></span>'
    }
  ];

  paginar(){
    this.pagination = true;
    this.paginationPageSize = 20;
    this.paginationPageSizeSelector = [10, 20, 50];
  }

  aplicarFiltros(){
    this.defaultColDef = {
      sortable: true,
      width: 110,
      editable: false,
    };
  }

  onCellClicked(data: any) {
    if(data.column.colId === "seleccionar"){
      console.log(data);
    }
  }

  getAlimentos(){
    this.alimentosService.getAlimentos().subscribe(
      (response: any) =>{
        this.rowData = response;
        this.loader = false;
      }, (error: any) =>{
        Swal.fire('Error', 'No se pudieron obtener los alimentos', 'error');
      }
    )
  }
}
