import { Component } from '@angular/core';
import { AlertaService } from '../../../../services/alerta.service';
import { AtmService } from '../../services/atm.service';
import { Usuario } from '../../types/atm';
import { IMAGES_ATM_BUCKET } from '../../../../../config/config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  userLogged!: Usuario;
  rutaImagen = IMAGES_ATM_BUCKET;
  constructor(
    private atmService: AtmService,
    private alertaService: AlertaService
  ) {
    this.getUserLogged();
  }
  getUserLogged() {
    this.userLogged = this.atmService.SESSION_STORAGE.getUser();
  }
  logout() {
    this.atmService.LOGIN.logout();
  }
}
