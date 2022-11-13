import { EstacionService } from './../../../servicios/estacion.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import * as M from 'materialize-css';

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
});

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private estacionService: EstacionService,
    private router: Router
  ) {}

  fgValidacion = this.fb.group({
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    coordenadaX: ['', [Validators.required]],
    coordenadaY: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  ngOnInit(): void {

  }

  store() {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espera...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(Swal.getDenyButton());
      },
    });
    let estacion = new EstacionModelo();
    estacion.nombre = this.fgValidacion.controls['nombre'].value as string;
    estacion.direccion = this.fgValidacion.controls['direccion'].value as string;
    estacion.coordenada_x = this.fgValidacion.controls['coordenadaX'].value as string;
    estacion.coordenada_y = this.fgValidacion.controls['coordenadaY'].value as string;
    estacion.tipo = this.fgValidacion.controls['tipo'].value as string;

    this.estacionService.store(estacion).subscribe(
      (data: EstacionModelo) => {
        Swal.fire('Creado correctamente!', '', 'success');
        this.router.navigate(['/estaciones/get']);
      },
      (error: any) => {
        console.log(error);
        Swal.fire({
          title: '¡Ups! Hubo un error :(',
          text: error.statusText,
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      }
    );
  }
}
