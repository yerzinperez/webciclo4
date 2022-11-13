import { EstacionService } from './../../../servicios/estacion.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private estacionService: EstacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    coordenadaX: ['', [Validators.required]],
    coordenadaY: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  id: string = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string) {
    this.estacionService.getWithId(id).subscribe((data: EstacionModelo) => {
      console.log(data);
      this.fgValidacion.controls['id'].setValue(id);
      this.fgValidacion.controls['nombre'].setValue(data.nombre as string);
      this.fgValidacion.controls['direccion'].setValue(
        data.direccion as string
      );
      this.fgValidacion.controls['coordenadaX'].setValue(data.coordenada_x as string);
      this.fgValidacion.controls['coordenadaY'].setValue(data.coordenada_y as string);
      this.fgValidacion.controls['tipo'].setValue(data.tipo as string);
    });
  }

  edit() {
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
    estacion.id = this.fgValidacion.controls['id'].value as string;
    estacion.nombre = this.fgValidacion.controls['nombre'].value as string;
    estacion.direccion = this.fgValidacion.controls['direccion'].value as string;
    estacion.coordenada_x = this.fgValidacion.controls['coordenadaX'].value as string;
    estacion.coordenada_y = this.fgValidacion.controls['coordenadaY'].value as string;
    estacion.tipo = this.fgValidacion.controls['tipo'].value as string;

    this.estacionService.update(estacion).subscribe(
      (data: EstacionModelo) => {
        Swal.fire('¡Editado correctamente!', '', 'success');
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
