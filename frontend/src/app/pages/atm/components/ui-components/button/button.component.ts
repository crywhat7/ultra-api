import { Component, Input } from '@angular/core';

@Component({
  selector: 'atm-button',
  templateUrl: './button.component.html',
})
export class AtmButtonComponent {
  @Input() className = '';
  @Input() disabled = false;
  @Input() type:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info' = 'primary';

  get classes(): string {
    const base = 'py-2 px-4 rounded-lg justify-center items-center flex gap-3';
    const stylesClases = {
      primary: 'bg-atm-500 text-white hover:bg-atm-600',
      secondary: 'bg-atm-100 text-atm-500 hover:bg-atm-200',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
      success: 'bg-green-500 text-white hover:bg-green-600',
      info: 'bg-blue-500 text-white hover:bg-blue-600',
    };

    return ``;
  }
}
