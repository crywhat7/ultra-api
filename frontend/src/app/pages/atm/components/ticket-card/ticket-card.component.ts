import { Component, Input } from '@angular/core';
import { Ticket } from '../../types/atm';
import { IMAGES_ATM_BUCKET } from '../../../../../config/config';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
})
export class TicketCardComponent {
  @Input() ticket!: Ticket;
  rutaImagen = IMAGES_ATM_BUCKET;
  constructor() {}
}
