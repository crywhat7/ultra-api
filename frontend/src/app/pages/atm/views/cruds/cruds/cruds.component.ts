import { Component } from '@angular/core';
import {
  Estado,
  Genero,
  Prioridad,
  Rol,
  Terminacion,
} from '../../../types/atm';
import { AtmService } from '../../../services/atm.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'app-cruds',
  templateUrl: './cruds.component.html',
})
export class CrudsComponent {
  estados: Estado[] = [];
  newEstado: Estado = {
    id: 0,
    createdAt: new Date(),
    descripcion: '',
    terminado: false,
  };
  prioridades: Prioridad[] = [];
  newPrioridad: Prioridad = {
    id: 0,
    createdAt: new Date(),
    descripcion: '',
  };
  terminaciones: Terminacion[] = [];
  newTerminacion: Terminacion = {
    id: 0,
    createdAt: new Date(),
    descripcion: '',
    fueResolutoria: false,
  };
  generos: Genero[] = [];
  newGenero: Genero = {
    id: 0,
    createdAt: new Date(),
    descripcion: '',
  };
  roles: Rol[] = [];
  newRol: Rol = {
    id: 0,
    createdAt: new Date(),
    descripcion: '',
    esAdmin: false,
  };
  constructor(private atmService: AtmService, private alerta: AlertaService) {
    this.getEstados();
    this.getPrioridades();
    this.getTerminaciones();
    this.getGeneros();
    this.getRoles();
  }

  getEstados() {
    this.atmService.TICKETS_ESTADOS.getEstados().subscribe((estados) => {
      if (!estados) return;
      this.estados = estados;
    });
  }
  deleteEstado(id: number) {
    this.atmService.TICKETS_ESTADOS.deleteEstado(id).subscribe(() => {
      this.getEstados();
    });
  }
  updateEstado(estado: Estado) {
    this.atmService.TICKETS_ESTADOS.updateEstado(estado).subscribe(() => {
      this.getEstados();
    });
  }
  createEstado() {
    if (!this.newEstado.descripcion)
      return this.alerta.showWarn('Ingrese una descripción');

    this.atmService.TICKETS_ESTADOS.createEstado(this.newEstado).subscribe(
      () => {
        this.getEstados();
      }
    );
  }
  getPrioridades() {
    this.atmService.TICKETS_PRIORIDADES.getPrioridades().subscribe(
      (prioridades) => {
        if (!prioridades) return;
        this.prioridades = prioridades;
      }
    );
  }
  deletePrioridad(id: number) {
    this.atmService.TICKETS_PRIORIDADES.deletePrioridad(id).subscribe(() => {
      this.getPrioridades();
    });
  }
  updatePrioridad(prioridad: Prioridad) {
    this.atmService.TICKETS_PRIORIDADES.updatePrioridad(prioridad).subscribe(
      () => {
        this.getPrioridades();
      }
    );
  }
  createPrioridad() {
    if (!this.newPrioridad.descripcion)
      return this.alerta.showWarn('Ingrese una descripción');

    this.atmService.TICKETS_PRIORIDADES.createPrioridad(
      this.newPrioridad
    ).subscribe(() => {
      this.getPrioridades();
    });
  }
  getTerminaciones() {
    this.atmService.TICKETS_TERMINACIONES.getTerminaciones().subscribe(
      (terminaciones) => {
        if (!terminaciones) return;
        this.terminaciones = terminaciones;
      }
    );
  }
  deleteTerminacion(id: number) {
    this.atmService.TICKETS_TERMINACIONES.deleteTerminacion(id).subscribe(
      () => {
        this.getTerminaciones();
      }
    );
  }
  updateTerminacion(terminacion: Terminacion) {
    this.atmService.TICKETS_TERMINACIONES.updateTerminacion(
      terminacion
    ).subscribe(() => {
      this.getTerminaciones();
    });
  }
  createTerminacion() {
    if (!this.newTerminacion.descripcion)
      return this.alerta.showWarn('Ingrese una descripción');

    this.atmService.TICKETS_TERMINACIONES.createTerminacion(
      this.newTerminacion
    ).subscribe(() => {
      this.getTerminaciones();
    });
  }
  getGeneros() {
    this.atmService.GENEROS.getGeneros().subscribe((generos) => {
      if (!generos) return;
      this.generos = generos;
    });
  }
  deleteGenero(id: number) {
    this.atmService.GENEROS.deleteGenero(id).subscribe(() => {
      this.getGeneros();
    });
  }
  updateGenero(genero: Genero) {
    this.atmService.GENEROS.updateGenero(genero).subscribe(() => {
      this.getGeneros();
    });
  }
  createGenero() {
    if (!this.newGenero.descripcion)
      return this.alerta.showWarn('Ingrese una descripción');

    this.atmService.GENEROS.createGenero(this.newGenero).subscribe(() => {
      this.getGeneros();
    });
  }
  getRoles() {
    this.atmService.ROLES.getRoles().subscribe((roles) => {
      if (!roles) return;
      this.roles = roles;
    });
  }
  deleteRol(id: number) {
    this.atmService.ROLES.deleteRol(id).subscribe(() => {
      this.getRoles();
    });
  }
  updateRol(rol: Rol) {
    this.atmService.ROLES.updateRol(rol).subscribe(() => {
      this.getRoles();
    });
  }
  createRol() {
    if (!this.newRol.descripcion)
      return this.alerta.showWarn('Ingrese una descripción');

    this.atmService.ROLES.createRol(this.newRol).subscribe(() => {
      this.getRoles();
    });
  }
}
