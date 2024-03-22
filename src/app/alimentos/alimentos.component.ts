import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AlimentosService } from '../services/alimentosService.service';
import Swal from 'sweetalert2';
import { right } from '@popperjs/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dieta } from '../interfaces/dieta';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.scss']
})
export class AlimentosComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  public pagination: any;
  public paginationPageSize: any;
  public paginationPageSizeSelector: any;
  public defaultColDef: any;
  public rowData: any[] = [];
  public loader = true;
  public formDieta!: FormGroup;
  public fecha = new Date().toISOString().split('T')[0];
  alimentoSeleccionado: any;

  constructor(private alimentosService: AlimentosService, private modal: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paginar();
    this.aplicarFiltros();
    this.getAlimentos();

    this.formDieta = this.fb.group({
      cantidad: ['', [Validators.required, Validators.min(1)]],
      fecha: ['', [Validators.required]]
    })
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
    { headerName: "Tipo Alimento", field: "tipoAlimento", width: 175, floatingFilter: true, filter: 'agTextColumnFilter', filterParams: {
        // Compara todos los textos aunque tengan tíldes o caracteres especiales
        textCustomComparator: (filter: any, value: any, filterText: any) => {
          const normalizedValue = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          const normalizedFilterText = filterText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          return normalizedValue.includes(normalizedFilterText);
        }
      }
    },
    { headerName: "Calorias", field: "calorias" },
    { headerName: "Carbohidratos", field: "carbohidratos", width: 130 },
    { headerName: "Proteinas", field: "proteinas" },
    { headerName: "Grasas", field: "grasas" },
    { headerName: "Fibra", field: "fibra" },
    { headerName: "Seleccionar", field: "seleccionar", filter: null, sortable: false, pinned: right, cellRenderer: () =>
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
      width: 95,
      editable: false,
    };
  }

  onCellClicked(data: any) {
    if(data.column.colId === "seleccionar"){
      this.datosFormulario();
      this.alimentoSeleccionado = data.data;
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  }

  getAlimentos(){
    this.alimentosService.getAlimentos().subscribe(
      (response: any) =>{
        this.rowData = response.listaAlimentos;
        this.loader = false;
      }, (error: any) =>{
        Swal.fire('Error', 'No se pudieron obtener los alimentos', 'error');
      }
    )
  }

  datosFormulario(){
    this.formDieta = this.fb.group({
      cantidad: ['', [Validators.required, Validators.min(1)]],
      fecha: ['', [Validators.required]]
    })
  }

  insertarDieta(){
    if(this.formDieta.valid){
        let dietaObject: Dieta = {
        IdUsuario: parseInt(localStorage.getItem('idUsuario')!),
        IdAlimento: this.alimentoSeleccionado.id,
        Cantidad: this.formDieta.value.cantidad,
        Fecha: this.formDieta.value.fecha
      };

      this.alimentosService.insertarDieta(dietaObject).subscribe(
        (response: any) =>{
          Swal.fire('Exito', 'Se inserto correctamente', 'success');
          this.modal.dismissAll();
        }, (error: any) =>{
          Swal.fire('Error', 'No se inserto correctamente', 'error');
        })
    }
  }
}