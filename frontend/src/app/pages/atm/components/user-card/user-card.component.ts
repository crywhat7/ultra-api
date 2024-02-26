import { Component, Input } from '@angular/core';
import { Usuario } from '../../types/atm';
import { IMAGES_ATM_BUCKET } from '../../../../../config/config';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  @Input() usuario!: Usuario;
  rutaImagen = IMAGES_ATM_BUCKET;
  constructor() {}
}
