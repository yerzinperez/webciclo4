import { EstacionModelo } from './../../../modelos/estacion.model';
import { EstacionService } from './../../../servicios/estacion.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  constructor(private _estacionService: EstacionService) {}
  listado: EstacionModelo[] = [];
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    try {
      this._estacionService.getAll().subscribe((data: EstacionModelo[]) => {
        this.listado = data;
        console.log(data);
        console.log(this.listado);
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
        this._estacionService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success');
          this.getAll();
        });
      }
    });
  }
}
