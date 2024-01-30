import { Component } from '@angular/core';
import { Usuario } from '../ari-mil/interfaces/interfaces';
import { USER_LOGGED } from '../../../config/config';
import { AriMilService } from '../ari-mil/services/ari-mil.service';
import {
  MarcaOpt,
  ModeloOpt,
  TipoTransmision,
  Vehiculo,
} from './interfaces/vehiculos';
import { VehiculosService } from '../ari-mil/services/vehiculos.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
})
export class VehiculosComponent {
  loggedUser: Usuario = this.setLoggedUser();
  vehiculos: Vehiculo[] = [];
  marcas: MarcaOpt[] = [];
  modelos: ModeloOpt[] = [];
  tiposTransmision: TipoTransmision[] = [];

  nuevoVehiculo = {
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    transmission: '',
  };

  constructor(
    private ariMilSrv: AriMilService,
    private vehiculosSrv: VehiculosService
  ) {
    this.getVehiculos();
    this.getMarcas();
    this.getTiposTransmision();
  }

  setLoggedUser() {
    const loggedUser = JSON.parse(localStorage.getItem(USER_LOGGED) || '{}');
    return loggedUser;
  }

  logout() {
    this.ariMilSrv.logout();
  }

  getVehiculos() {
    this.vehiculosSrv.getVehiculos().subscribe((resp) => {
      this.vehiculos = resp;
    });
  }

  getMarcas() {
    this.vehiculosSrv.getMarcas().subscribe((resp) => {
      this.marcas = resp;
    });
  }

  getModelos(marca: string) {
    this.vehiculosSrv.getModelos(marca).subscribe((resp) => {
      this.modelos = resp;
    });
  }

  getTiposTransmision() {
    this.vehiculosSrv.getTiposTransmision().subscribe((resp) => {
      this.tiposTransmision = resp;
    });
  }

  createVehiculo() {
    this.vehiculosSrv.createVehiculo(this.nuevoVehiculo).subscribe((resp) => {
      this.getVehiculos();
      this.nuevoVehiculo = {
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        transmission: '',
      };
    });
  }

  deleteVehiculo(id: string) {
    this.vehiculosSrv.deleteVehiculo(id).subscribe((resp) => {
      this.getVehiculos();
    });
  }
}
