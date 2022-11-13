import { EstacionService } from './../../../servicios/estacion.service';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import { RutaModelo } from './../../../modelos/ruta.model';
import { RutaService } from './../../../servicios/ruta.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private RutaService: RutaService,
    private router: Router,
    private estacionService: EstacionService
  ) {}

  listadoEstaciones: EstacionModelo[] = [];

  fgValidacion = this.fb.group({
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    tiempo_estimado: [0, [Validators.required]],
  });

  ngOnInit(): void {
    this.getAllEstaciones();
  }

  store() {
    let ruta = new RutaModelo();
    ruta.origen = this.fgValidacion.controls['origen'].value as string;
    ruta.destino = this.fgValidacion.controls['destino'].value as string;
    ruta.tiempo_estimado = this.fgValidacion.controls['tiempo_estimado']
      .value as number;

    if(ruta.origen !== ruta.destino){
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
      this.RutaService.store(ruta).subscribe(
        (data: RutaModelo) => {
          Swal.fire('Creado correctamente!', '', 'success');
          this.router.navigate(['/rutas/get']);
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
    } else {
      Swal.fire({
        title: '¡Ups! Hubo un error :(',
        text: 'El origen y el destino no pueden ser el mismo.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  }

  getAllEstaciones() {
    this.estacionService.getAll().subscribe((data: EstacionModelo[]) => {
      this.listadoEstaciones = data;
      console.log(data);
    });
  }
}
