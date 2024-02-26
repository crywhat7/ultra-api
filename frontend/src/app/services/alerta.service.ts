import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  constructor(private toastr: MessageService) {}
  showSuccess(message: string) {
    this.toastr.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      key: 'general-alert',
    });
  }
  showError(message: string) {
    this.toastr.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      key: 'general-alert',
    });
  }
  showInfo(message: string) {
    this.toastr.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
      key: 'general-alert',
    });
  }
  showWarn(message: string) {
    this.toastr.add({
      severity: 'warn',
      summary: 'Warn',
      detail: message,
      key: 'general-alert',
    });
  }
  showCustom(props: Message) {
    this.toastr.add({
      key: 'general-alert',
      ...props,
    });
  }
}
