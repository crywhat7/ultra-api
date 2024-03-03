import { Component } from '@angular/core';
import { AlertaService } from '../../../../services/alerta.service';
import { AtmService } from '../../services/atm.service';
import {
  CreateChat,
  CreateTicket,
  Estado,
  Prioridad,
  Terminacion,
  Ticket,
  Usuario,
} from '../../types/atm';
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
  terminaciones: Terminacion[] = [];
  terminacionSelected?: Terminacion | null = null;
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
  nuevoMensaje: CreateChat = {
    message: '',
    idUsuario: 0,
    idTicket: 0,
    imagenBase64: '',
  };

  constructor(
    private atmService: AtmService,
    private alertaService: AlertaService
  ) {
    this.getUserLogged();
    this.getPrioridades();
    this.getTerminaciones();
    this.getTickets();
    this.intervalTicketSelecionado();
  }

  intervalTicketSelecionado() {
    setInterval(() => {
      if (!this.ticketSelected) return;
      this.getTicketSelected();
    }, 10000);
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

      const { esAdmin } = this.userLogged.rol;

      this.tickets = response;

      if (!esAdmin) {
        this.tickets = response.filter(
          (ticket) => ticket.postBy.id === this.userLogged.id
        );
      }

      if (this.ticketSelected) {
        this.ticketSelected = this.tickets.find(
          (ticket) => ticket.id === this.ticketSelected?.id
        );
      }

      // ! Eliminar esta línea
      // [this.ticketSelected] = this.tickets;
      // this.visibleWorkTicket = true;
    });
  }
  getTicketSelected() {
    if (!this.ticketSelected) return;
    this.atmService.TICKETS.getTicket(this.ticketSelected.id).subscribe(
      (response) => {
        if (!response) return;
        this.ticketSelected = response;
      }
    );
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
  fileMessageToBase64(event: HTMLInputElement) {
    // From HTMLInputElement to a Base64 that can be viewed in img tag
    const file = event.files?.item(0);

    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.nuevoMensaje.imagenBase64 = e.target?.result as string;
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
  getTerminaciones() {
    this.atmService.TICKETS_TERMINACIONES.getTerminaciones().subscribe(
      (response) => {
        if (!response) return;
        this.terminaciones = response;
      }
    );
  }
  updateAsignedTicket() {
    if (!this.ticketSelected) return;
    const { id } = this.userLogged;
    const { id: idTicket } = this.ticketSelected;

    if (this.ticketSelected.estado.terminado) {
      this.alertaService.showWarn('El ticket ya ha sido terminado');
      return;
    }

    if (!id) {
      this.alertaService.showWarn('El usuario no está logueado');
      return;
    }

    if (!idTicket) {
      this.alertaService.showWarn('El ticket no está seleccionado');
      return;
    }

    this.atmService.TICKETS.updateTicketAsignacion(idTicket, id).subscribe(
      (response) => {
        if (!response) return;
        this.alertaService.showSuccess('Ticket actualizado con éxito');
        this.getTickets();
      }
    );
  }
  terminarTicket() {
    if (!this.ticketSelected) return;
    const { id } = this.terminacionSelected || {};
    const { id: idTicket } = this.ticketSelected;

    if (!id) {
      this.alertaService.showWarn('La terminación no está seleccionada');
      return;
    }

    if (!idTicket) {
      this.alertaService.showWarn('El ticket no está seleccionado');
      return;
    }

    this.atmService.TICKETS.updateTicketTerminacion(idTicket, id).subscribe(
      (response) => {
        if (!response) return;
        this.alertaService.showSuccess('Ticket actualizado con éxito');
        this.getTickets();
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
  nuevoMensajeEvent() {
    if (!this.nuevoMensaje.message) {
      this.alertaService.showWarn('El mensaje es requerido');
      return;
    }
    const ticket = this.ticketSelected;
    if (!ticket) {
      this.alertaService.showWarn('El ticket no está seleccionado');
      return;
    }
    this.nuevoMensaje.idUsuario = this.userLogged.id;
    this.nuevoMensaje.idTicket = ticket.id || 0;

    const { terminacion } = ticket;
    if (terminacion) {
      this.alertaService.showWarn('El ticket ya ha sido terminado');
      return;
    }

    this.atmService.TICKETS_CHAT.postChat(this.nuevoMensaje).subscribe(
      (response) => {
        if (!response) return;
        this.alertaService.showSuccess('Mensaje enviado con éxito');
        this.nuevoMensaje = {
          message: '',
          idUsuario: 0,
          idTicket: 0,
          imagenBase64: '',
        };

        this.getTicketSelected();
      }
    );
  }
}
