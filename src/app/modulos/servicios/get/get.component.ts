import { ServicioModelo } from './../../../modelos/servicio.model';
import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private servicioService:ServicioService) {}
  listado: ServicioModelo[] = [];
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    try {
      this.servicioService.getAll().subscribe((data: ServicioModelo[]) => {
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
        this.servicioService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success');
          this.getAll();
        });
      }
    });
  }

}
