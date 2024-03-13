import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { UsuarioService } from '../services/usuarioService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historico-datos-corporales',
  templateUrl: './historico-datos-corporales.component.html',
  styleUrls: ['./historico-datos-corporales.component.scss']
})
export class HistoricoDatosCorporalesComponent {
  public pagination: any;
  public paginationPageSize: any;
  public paginationPageSizeSelector: any;
  public defaultColDef: any;
  public rowData: any[] = [];

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.paginar();
    this.aplicarFiltros();
    this.getEjercicios();
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "item1", hide: true },
    { headerName: "Altura", field: "item2" },
    { headerName: "Peso", field: "item3" },
    { headerName: "IMC", field: "item5" },
    { headerName: "Fecha", field: "item4" },
    { headerName: "Editar", field: "info", width: 80, filter: null, sortable: false, cellRenderer: () =>
      '<span style="display: flex; justify-content: flex-end; align-items: center; width: 100%; height: 100%;"><i class="ag-icon ag-icon-paste"></i></span>'
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
      width: 220,
      editable: false,
      floatingFilter: true,
      filter: 'agTextColumnFilter',
    };
  }

  getEjercicios() {
    this.usuarioService.obtenerHistorico(parseInt(localStorage.getItem('idUsuario')!)).subscribe(
      (response: any) => {
        // Map and format numerical values
        this.rowData = response.datosUsuario.value.map((element: any) => ({
          item2: parseFloat(element.item2).toFixed(2),
          item3: parseFloat(element.item3).toFixed(2),
          item5: parseFloat(element.item5).toFixed(2),
          item4: element.item4.substring(0, 10)
        }));
      }, 
      (error: any) => {
        Swal.fire('Error', 'No se pudieron obtener los ejercicios', 'error');
      }
    );
  }
}  
