import { Injectable } from '@angular/core';
import { USER_LOGGED, WEB_SERVICE } from '../../../../config/config';
import { HttpClient } from '@angular/common/http';
import { Country, Post, Usuario } from '../interfaces/interfaces';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { Router } from '@angular/router';
import {
  MarcaOpt,
  ModeloOpt,
  TipoTransmision,
  Vehiculo,
} from '../../vehiculos/interfaces/vehiculos';

const URL_BASE = `${WEB_SERVICE}/vehiculos`;

@Injectable({
  providedIn: 'root',
})
export class VehiculosService {
  constructor(private http: HttpClient, private router: Router) {}

  getVehiculos() {
    const ruta = `${URL_BASE}/`;
    return this.http.get<Vehiculo[]>(ruta).pipe(
      map((resp: Vehiculo[]) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }

  getMarcas() {
    const ruta = `${URL_BASE}/opt/marcas`;
    return this.http.get<MarcaOpt[]>(ruta).pipe(
      map((resp: MarcaOpt[]) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }

  getModelos(marca: string) {
    const ruta = `${URL_BASE}/opt/marcas/${marca}/modelos`;
    return this.http.get<ModeloOpt[]>(ruta).pipe(
      map((resp: ModeloOpt[]) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }

  getTiposTransmision() {
    const ruta = `${URL_BASE}/opt/tipos-transmision`;
    return this.http.get<TipoTransmision[]>(ruta).pipe(
      map((resp: TipoTransmision[]) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }

  createVehiculo(props: {
    brand: string;
    model: string;
    year: number;
    color: string;
    transmission: string;
  }) {
    const ruta = `${URL_BASE}/`;
    return this.http.post<Vehiculo>(ruta, props).pipe(
      map((resp: Vehiculo) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }

  deleteVehiculo(id: string) {
    const ruta = `${URL_BASE}/${id}`;
    return this.http.delete<Vehiculo>(ruta).pipe(
      map((resp: Vehiculo) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }
}
