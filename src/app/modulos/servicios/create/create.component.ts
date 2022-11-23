import { ServicioModelo } from './../../../modelos/servicio.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  estacionService: any;

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private router: Router,
    private rutaService: RutaService
  ) {}

  listadoRutas: RutaModelo[] = [];

  fgValidacion = this.fb.group({
    fecha: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    placa: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
    nombre_conductor: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
    dinero_recogido: [0, [Validators.required, Validators.min(50)]],
    ruta: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getAllRutas();
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
    let servicio = new ServicioModelo();
    servicio.fecha = this.fgValidacion.controls['fecha'].value as string;
    servicio.hora_inicio = this.fgValidacion.controls['hora_inicio'].value as string;
    servicio.hora_fin = this.fgValidacion.controls['hora_fin'].value as string;
    servicio.placa = this.fgValidacion.controls['placa'].value as string;
    servicio.nombre_conductor = this.fgValidacion.controls['nombre_conductor'].value as string;
    servicio.dinero_recogido = this.fgValidacion.controls['dinero_recogido'].value as number;
    servicio.ruta = this.fgValidacion.controls['ruta'].value as string;

      this.servicioService.store(servicio).subscribe(
        (data: ServicioModelo) => {
          Swal.fire('Creado correctamente!', '', 'success');
          this.router.navigate(['/servicios/get']);
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

  getAllRutas() {
    this.rutaService.getAll().subscribe((data: RutaModelo[]) => {
      this.listadoRutas = data;
      console.log(data);
    });
  }
}
