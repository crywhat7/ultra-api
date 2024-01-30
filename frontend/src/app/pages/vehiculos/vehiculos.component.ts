import { Component } from '@angular/core';
import { Usuario } from '../ari-mil/interfaces/interfaces';
import { USER_LOGGED } from '../../../config/config';
import { AriMilService } from '../ari-mil/services/ari-mil.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
})
export class VehiculosComponent {
  loggedUser: Usuario = this.setLoggedUser();
  constructor(private ariMilSrv: AriMilService) {}

  setLoggedUser() {
    const loggedUser = JSON.parse(localStorage.getItem(USER_LOGGED) || '{}');
    return loggedUser;
  }

  logout() {
    this.ariMilSrv.logout();
  }
}
