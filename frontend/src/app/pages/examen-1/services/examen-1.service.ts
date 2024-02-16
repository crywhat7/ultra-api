import { Injectable } from '@angular/core';
import { USER_LOGGED, WEB_SERVICE } from '../../../../config/config';
import { HttpClient } from '@angular/common/http';
import { Alumno, Clase, Maestro, Matricula } from '../interfaces/interfaces';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

const URL_BASE = `${WEB_SERVICE}/examen-1`;

@Injectable({
  providedIn: 'root',
})
export class Examen1Service {
  private updatePosts = new BehaviorSubject<boolean>(false);
  $updatePosts = this.updatePosts.asObservable();

  setUpdatePosts(value: boolean) {
    this.updatePosts.next(value);
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getClases() {
    const ruta = `${URL_BASE}/clases`;
    return this.http.get<Clase[]>(ruta).pipe(
      map((resp: Clase[]) => {
        return resp;
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
        throw err;
      })
    );
  }

  getMaestros() {
    const ruta = `${URL_BASE}/maestros`;
    return this.http.get<Maestro[]>(ruta).pipe(
      map((resp: Maestro[]) => {
        return resp;
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
        throw err;
      })
    );
  }

  getAlumnos() {
    const ruta = `${URL_BASE}/alumnos`;
    return this.http.get<Alumno[]>(ruta).pipe(
      map((resp: Alumno[]) => {
        return resp;
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
        throw err;
      })
    );
  }

  asignarMaestroAClase(idClase: number, idMaestro: number) {
    const ruta = `${URL_BASE}/clases/asignar-maestro/${idClase}/${idMaestro}`;
    return this.http.patch<Clase>(ruta, { idMaestro }).pipe(
      map((resp: Clase) => {
        return resp;
      }),
      catchError((err) => {
        alert(err.error.message);
        throw err;
      })
    );
  }

  desasignarMaestroAClase(idClase: number) {
    const ruta = `${URL_BASE}/clases/quitar-maestro/${idClase}`;
    return this.http.patch<Clase>(ruta, {}).pipe(
      map((resp: Clase) => {
        return resp;
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
        throw err;
      })
    );
  }

  actualizarNota(idMatricula: number, nota: number) {
    const ruta = `${URL_BASE}/matriculas/actualizar-nota/${idMatricula}/${nota}`;
    return this.http.patch<Matricula>(ruta, {}).pipe(
      map((resp: Matricula) => {
        return resp;
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
        throw err;
      })
    );
  }

  matricularAlumno(idClase: number, idAlumno: number) {
    const ruta = `${URL_BASE}/matriculas/matricular/${idAlumno}/${idClase}`;
    return this.http.post<Matricula>(ruta, {}).pipe(
      map((resp: Matricula) => {
        return resp;
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
        throw err;
      })
    );
  }

  desmatricularAlumno(idMatricula: number) {
    const ruta = `${URL_BASE}/matriculas/alumno-de-clase/${idMatricula}`;
    return this.http.delete<boolean>(ruta).pipe(
      map((resp: boolean) => {
        return resp;
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
        throw err;
      })
    );
  }
}
