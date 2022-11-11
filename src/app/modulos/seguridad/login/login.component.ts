import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as cryptoJS from 'crypto-js';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  fgValidacion = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  identificarUsuario() {
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
    let usuario: string = this.fgValidacion.controls['correo'].value as string;
    let clave: string = this.fgValidacion.controls['clave'].value as string;
    let claveCifrada = cryptoJS.MD5(clave).toString();
    this.seguridadService.login(usuario, claveCifrada).subscribe(
      (data: any) => {
        this.seguridadService.almacenarSesion(data);
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
          title: `¡Hola de nuevo ${data.data.nombre} ${data.data.apellidos}!`,
        });
        this.router.navigate(['/index']);
      },
      (error: any) => {
        console.log(error);
        Swal.fire({
          title: '¡Ups! Hubo un error :(',
          text: error.statusText,
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
    );
  }
}
