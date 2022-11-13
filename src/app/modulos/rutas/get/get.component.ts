import { RutaService } from './../../../servicios/ruta.service';
import { RutaModelo } from './../../../modelos/ruta.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  constructor(private _rutaService: RutaService) {}
  listado: RutaModelo[] = [];
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    try {
      this._rutaService.getAll().subscribe((data: RutaModelo[]) => {
        this.listado = data;
      });
    } catch (error) {
      alert('error')
    }
  }

  delete(id?: any) {
    console.log(id);
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._rutaService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success');
          this.getAll();
        });
      }
    });
  }
}
