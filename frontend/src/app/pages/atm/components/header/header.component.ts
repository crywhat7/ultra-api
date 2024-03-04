import { Component } from '@angular/core';
import { IMAGES_ATM_BUCKET } from '../../../../../config/config';
import { Usuario } from '../../types/atm';
import { AtmService } from '../../services/atm.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  userLogged!: Usuario;
  rutaImagen = IMAGES_ATM_BUCKET;
  constructor(private atmService: AtmService) {
    this.getUserLogged();
  }
  logout() {
    this.atmService.LOGIN.logout();
  }
  getUserLogged() {
    this.userLogged = this.atmService.SESSION_STORAGE.getUser();
  }
}
