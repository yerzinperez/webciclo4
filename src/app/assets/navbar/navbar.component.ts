import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  activeSession?: boolean = false;
  subs: Subscription = new Subscription();

  constructor(private _seguridadService: SeguridadService) {}

  ngOnInit(): void {
    this.subs = this._seguridadService
      .datosUsuarioSesion()
      .subscribe((data: UsuarioModelo) => {
        console.log(data);
        this.activeSession = data.isLoggedIn;
      });
  }
}
