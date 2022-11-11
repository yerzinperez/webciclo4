import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css'],
})
export class CerrarSesionComponent implements OnInit {
  constructor(
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.seguridadService.eliminarSesion();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: `¡Sesión cerrada correctamente!`,
    });
    this.router.navigate(['/seguridad/login']);
  }
}
