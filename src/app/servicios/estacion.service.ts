import { EstacionModelo } from './../modelos/estacion.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from './seguridad.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstacionService {
  url = 'http://localhost:3000';
  token: string = '';

  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) {
    this.token = this.seguridadService.getToken();
  }

  store(estacion: EstacionModelo): Observable<EstacionModelo> {
    return this.http.post<EstacionModelo>(`${this.url}/estaciones`, {
      nombre: estacion.nombre,
      direccion: estacion.direccion,
      coordenada_x: estacion.coordenada_x,
      coordenada_y: estacion.coordenada_y,
      tipo: estacion.tipo,
    },
    {
      // Le paso el token a la solicitud
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  getAll(): Observable<EstacionModelo[]> {
    return this.http.get<EstacionModelo[]>(`${this.url}/estaciones`, {
      // Le paso el token a la solicitud
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  update(estacion: EstacionModelo): Observable<EstacionModelo> {
    return this.http.patch<EstacionModelo>(
      `${this.url}/estaciones/${estacion.id}`,
      {
        nombre: estacion.nombre,
        direccion: estacion.direccion,
        coordenada_x: estacion.coordenada_x,
        coordenada_y: estacion.coordenada_y,
        tipo: estacion.tipo,
      },
      {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  delete(id: string): Observable<EstacionModelo[]> {
    return this.http.delete<EstacionModelo[]>(`${this.url}/estaciones/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  getWithId(id: string): Observable<EstacionModelo> {
    return this.http.get<EstacionModelo>(`${this.url}/estaciones/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  getCount(): Observable<EstacionModelo[]> {
    return this.http.get<EstacionModelo[]>(`${this.url}/estaciones/count`, {
      // Le paso el token a la solicitud
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
