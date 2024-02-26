import { Component } from '@angular/core';
import { AlertaService } from '../../../../services/alerta.service';
import { AtmService } from '../../services/atm.service';
import { Ticket, Usuario } from '../../types/atm';
import { IMAGES_ATM_BUCKET } from '../../../../../config/config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  userLogged!: Usuario;
  rutaImagen = IMAGES_ATM_BUCKET;
  tickets: Ticket[] = [];
  visibleCreateTicket = true;
  constructor(
    private atmService: AtmService,
    private alertaService: AlertaService
  ) {
    this.getUserLogged();
    this.getTickets();
  }
  getUserLogged() {
    this.userLogged = this.atmService.SESSION_STORAGE.getUser();
  }
  logout() {
    this.atmService.LOGIN.logout();
  }
  getTickets() {
    this.atmService.TICKETS.getTickets().subscribe((response) => {
      if (!response) return;
      this.tickets = response.filter(
        (ticket) => ticket.postBy.id === this.userLogged.id
      );
    });
  }
}
