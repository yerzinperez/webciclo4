import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RutaModelo } from '../modelos/ruta.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root',
})
export class RutaService {
  // url = 'http://localhost:3000';
  url = 'https://apiciclo4team2group56.herokuapp.com';

  token: string = '';

  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) {
    this.token = this.seguridadService.getToken();
  }

  store(estacion: RutaModelo): Observable<RutaModelo> {
    return this.http.post<RutaModelo>(
      `${this.url}/rutas`,
      {
        origen: estacion.origen,
        destino: estacion.destino,
        tiempo_estimado: estacion.tiempo_estimado,
      },
      {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  getAll(): Observable<RutaModelo[]> {
    return this.http.get<RutaModelo[]>(`${this.url}/rutas`, {
      // Le paso el token a la solicitud
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  update(estacion: RutaModelo): Observable<RutaModelo> {
    return this.http.patch<RutaModelo>(
      `${this.url}/rutas/${estacion.id}`,
      {
        origen: estacion.origen,
        destino: estacion.destino,
        tiempo_estimado: estacion.tiempo_estimado,
      },
      {
        // Le paso el token a la solicitud
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  delete(id: string): Observable<RutaModelo[]> {
    return this.http.delete<RutaModelo[]>(`${this.url}/rutas/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  getWithId(id: string): Observable<RutaModelo> {
    return this.http.get<RutaModelo>(`${this.url}/rutas/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  getCount(): Observable<RutaModelo[]> {
    return this.http.get<RutaModelo[]>(`${this.url}/rutas/count`, {
      // Le paso el token a la solicitud
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
