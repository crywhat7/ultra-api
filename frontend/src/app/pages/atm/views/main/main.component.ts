import { Component } from '@angular/core';
import { AlertaService } from '../../../../services/alerta.service';
import { AtmService } from '../../services/atm.service';
import { CreateTicket, Prioridad, Ticket, Usuario } from '../../types/atm';
import { IMAGES_ATM_BUCKET } from '../../../../../config/config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  userLogged!: Usuario;
  rutaImagen = IMAGES_ATM_BUCKET;
  tickets: Ticket[] = [];
  ticketSelected?: Ticket | null = null;
  prioridades: Prioridad[] = [];
  nuevoTicket: CreateTicket = {
    descripcion: '',
    idPrioridad: 0,
    imagenBase64: '',
    postBy: 0,
    titulo: '',
  };
  visibleCreateTicket = false;
  visibleWorkTicket = false;
  constructor(
    private atmService: AtmService,
    private alertaService: AlertaService
  ) {
    this.getUserLogged();
    this.getPrioridades();
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
      [this.ticketSelected] = this.tickets;
      const [firstMessage] = structuredClone(this.ticketSelected.messages);

      firstMessage.imagen = null;

      this.ticketSelected.messages.push(firstMessage);
      this.ticketSelected.messages.push(firstMessage);
      this.ticketSelected.messages.push(firstMessage);
      this.ticketSelected.messages.push(firstMessage);
      this.ticketSelected.messages.push(firstMessage);
      this.visibleWorkTicket = true;
    });
  }
  fileToBase64(event: HTMLInputElement) {
    // From HTMLInputElement to a Base64 that can be viewed in img tag
    const file = event.files?.item(0);

    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.nuevoTicket.imagenBase64 = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
  getPrioridades() {
    this.atmService.TICKETS_PRIORIDADES.getPrioridades().subscribe(
      (response) => {
        if (!response) return;
        this.prioridades = response;
      }
    );
  }
  createTicket() {
    // Validaciones
    if (!this.nuevoTicket.titulo) {
      this.alertaService.showWarn('El título es requerido');
      return;
    }
    if (!this.nuevoTicket.descripcion) {
      this.alertaService.showWarn('La descripción es requerida');
      return;
    }
    if (!this.nuevoTicket.imagenBase64) {
      this.alertaService.showWarn('La imagen es requerida');
      return;
    }
    if (this.nuevoTicket.idPrioridad === 0) {
      this.alertaService.showWarn('La prioridad es requerida');
      return;
    }
    this.nuevoTicket.postBy = this.userLogged.id;
    this.atmService.TICKETS.createTicket(this.nuevoTicket).subscribe(
      (response) => {
        if (!response) return;
        this.alertaService.showSuccess('Ticket creado con éxito');
        this.getTickets();
        this.visibleCreateTicket = false;
        this.nuevoTicket = {
          descripcion: '',
          idPrioridad: 0,
          imagenBase64: '',
          postBy: 0,
          titulo: '',
        };
      }
    );
  }
}
