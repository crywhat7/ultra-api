import { Component, Input } from '@angular/core';
import { Message } from '../../types/atm';
import { IMAGES_ATM_BUCKET } from '../../../../../config/config';
import { AtmService } from '../../services/atm.service';

@Component({
  selector: 'app-message-chat',
  templateUrl: './message-chat.component.html',
})
export class MessageChatComponent {
  @Input() message!: Message;
  currentUser = this.atmService.SESSION_STORAGE.getUser();
  rutaImagen = IMAGES_ATM_BUCKET;
  constructor(private atmService: AtmService) {}
}
