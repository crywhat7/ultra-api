import { Component } from '@angular/core';
import { Alumno, Clase, Maestro, Matricula } from './interfaces/interfaces';
import { Examen1Service } from './services/examen-1.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-examen-1',
  templateUrl: './examen-1.component.html',
  providers: [Examen1Service, MessageService],
})
export class Examen1Component {
  clases: Clase[] = [];
  claseSeleccionada: Clase | null = null;

  maestros: Maestro[] = [];
  maestroSeleccionado: Maestro | null = null;

  alumnos: Alumno[] = [];
  alumnoSeleccionado: Alumno | null = null;

  matriculaSeleccionada: Matricula | null = null;

  nuevaNota: number = 0;

  constructor(
    private examen1Srv: Examen1Service,
    private messageService: MessageService
  ) {
    this.getClases();
    this.getMaestros();
    this.getAlumnos();
  }

  getClases() {
    this.examen1Srv.getClases().subscribe((data) => {
      this.clases = data;
    });
  }

  seleccionarClase(clase: Clase) {
    this.claseSeleccionada = clase;
  }

  seleccionarMatricula(matricula: Matricula) {
    this.matriculaSeleccionada = matricula;
    this.nuevaNota = matricula.nota;
  }

  getMaestros() {
    this.examen1Srv.getMaestros().subscribe((data) => {
      this.maestros = data;
    });
  }

  getAlumnos() {
    this.examen1Srv.getAlumnos().subscribe((data) => {
      this.alumnos = data;
    });
  }

  asignarMaestroAClase() {
    if (!this.claseSeleccionada) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Selecciona una clase',
      });
      return;
    }

    if (!this.maestroSeleccionado) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Selecciona un maestro',
      });
      return;
    }

    this.examen1Srv
      .asignarMaestroAClase(
        this.claseSeleccionada.id,
        this.maestroSeleccionado.id
      )
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Maestro asignado a la clase`,
        });
        this.claseSeleccionada = data;
        this.maestroSeleccionado = null;
      });
  }

  desasignarMaestroDeClase() {
    if (!this.claseSeleccionada) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Selecciona una clase',
      });
      return;
    }

    this.examen1Srv
      .desasignarMaestroAClase(this.claseSeleccionada.id)
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Maestro desasignado de la clase`,
        });
        this.claseSeleccionada = data;
      });
  }

  actualizarNota() {
    if (!this.matriculaSeleccionada) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Selecciona una matrícula',
      });
      return;
    }

    const { id } = this.matriculaSeleccionada;

    this.examen1Srv.actualizarNota(id, this.nuevaNota).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: `Nota actualizada`,
      });
      this.getClasesAndSelectTheActualOne();
    });
  }

  getClasesAndSelectTheActualOne() {
    const claseSeleccionada = this.claseSeleccionada;
    this.examen1Srv.getClases().subscribe((data) => {
      this.clases = data;
      if (claseSeleccionada) {
        this.claseSeleccionada =
          this.clases.find((clase) => clase.id === claseSeleccionada.id) ??
          null;
      }
    });
  }

  matricularAlumno() {
    if (!this.claseSeleccionada) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Selecciona una clase',
      });
      return;
    }

    if (!this.alumnoSeleccionado) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Selecciona un alumno',
      });
      return;
    }

    this.examen1Srv
      .matricularAlumno(this.claseSeleccionada.id, this.alumnoSeleccionado.id)
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Alumno matriculado a la clase`,
        });
        this.claseSeleccionada?.matriculados.push(data);
        this.alumnoSeleccionado = null;
      });
  }

  desMatricularAlumno(matricula: Matricula) {
    this.examen1Srv.desmatricularAlumno(matricula.id).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: `Alumno desmatriculado de la clase`,
      });
      if (this.claseSeleccionada)
        this.claseSeleccionada.matriculados =
          this.claseSeleccionada.matriculados.filter(
            (mat) => mat.id !== matricula.id
          );
    });
  }
}
