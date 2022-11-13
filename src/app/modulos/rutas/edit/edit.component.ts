import { EstacionService } from './../../../servicios/estacion.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private rutaService: RutaService,
    private router: Router,
    private route: ActivatedRoute,
    private estacionService: EstacionService
  ) {}

  listadoEstaciones: EstacionModelo[] = [];

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    tiempo_estimado: [0, [Validators.required]]
  });

  id: string = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.buscarRegistro(this.id);
    this.getAllEstaciones();
  }

  buscarRegistro(id: string) {
    this.rutaService.getWithId(id).subscribe((data: RutaModelo) => {
      console.log(data);
      this.fgValidacion.controls['id'].setValue(id);
      this.fgValidacion.controls['origen'].setValue(data.origen as string);
      this.fgValidacion.controls['destino'].setValue(
        data.destino as string
      );
      this.fgValidacion.controls['tiempo_estimado'].setValue(data.tiempo_estimado as number);
    });
  }

  edit() {
    let estacion = new RutaModelo();
    estacion.id = this.fgValidacion.controls['id'].value as string;
    estacion.origen = this.fgValidacion.controls['origen'].value as string;
    estacion.destino = this.fgValidacion.controls['destino'].value as string;
    estacion.tiempo_estimado = this.fgValidacion.controls['tiempo_estimado'].value as number;

    if(estacion.origen !== estacion.destino){
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
      this.rutaService.update(estacion).subscribe(
        (data: RutaModelo) => {
          Swal.fire('¡Editado correctamente!', '', 'success');
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
