import { ServicioModelo } from './../modelos/servicio.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from './seguridad.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url = 'http://localhost:3000';
  token: string = '';

  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) {
    this.token = this.seguridadService.getToken();
  }

  store(servicio: ServicioModelo): Observable<ServicioModelo> {
    return this.http.post<ServicioModelo>(
      `${this.url}/servicios`,
      {
        fecha: servicio.fecha,
        hora_inicio: servicio.hora_inicio,
        hora_fin: servicio.hora_fin,
        placa: servicio.placa,
        nombre_conductor: servicio.nombre_conductor,
        dinero_recogido: servicio.dinero_recogido,
        ruta: servicio.ruta,
      },
      {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  getAll(): Observable<ServicioModelo[]> {
    return this.http.get<ServicioModelo[]>(`${this.url}/servicios`, {
      // Le paso el token a la solicitud
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  update(servicio: ServicioModelo): Observable<ServicioModelo> {
    return this.http.patch<ServicioModelo>(
      `${this.url}/servicios/${servicio.id}`,
      {
        fecha: servicio.fecha,
        hora_inicio: servicio.hora_inicio,
        hora_fin: servicio.hora_fin,
        placa: servicio.placa,
        nombre_conductor: servicio.nombre_conductor,
        dinero_recogido: servicio.dinero_recogido,
        ruta: servicio.ruta,
      },
      {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  delete(id: string): Observable<ServicioModelo[]> {
    return this.http.delete<ServicioModelo[]>(`${this.url}/servicios/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  getWithId(id: string): Observable<ServicioModelo> {
    return this.http.get<ServicioModelo>(`${this.url}/servicios/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  getCount(): Observable<ServicioModelo[]> {
    return this.http.get<ServicioModelo[]>(`${this.url}/servicios/count`, {
      // Le paso el token a la solicitud
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
