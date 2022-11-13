import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css'],
})
export class GetComponent implements OnInit {
  constructor(private _usuarioService: UsuarioService) {}
  listado: UsuarioModelo[] = [];
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._usuarioService.getAll().subscribe((data: UsuarioModelo[]) => {
      this.listado = data;
      console.log(data);
    });
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
        this._usuarioService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success');
          this.getAll();
        });
      }
    });
  }
}
