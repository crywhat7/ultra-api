import { Component, Input } from '@angular/core';

@Component({
  selector: 'atm-button',
  templateUrl: './button.component.html',
})
export class AtmButtonComponent {
  @Input() className = '';
  @Input() disabled = false;
  @Input() type: keyof types = 'primary';
  @Input() loading = false;

  get classes(): string {
    const { className, type, loading, disabled } = this;
    const base = 'py-2 px-4 rounded-lg flex justify-center items-center gap-2';
    const disabledClasses = 'cursor-not-allowed opacity-50';

    const disabledStyle = disabled || loading ? disabledClasses : '';
    const transitionStyleClasses = 'transition duration-300 ease-in-out';

    const stylesClases: types = {
      primary: 'bg-atm-500 text-white hover:bg-atm-600',
      secondary: 'bg-atm-100 text-atm-500 hover:bg-atm-200',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
      success: 'bg-green-500 text-white hover:bg-green-600',
      info: 'bg-blue-500 text-white hover:bg-blue-600',
    };

    const classSelected = stylesClases[type] || stylesClases.primary;

    return `${base} ${classSelected} ${className} ${disabledStyle} ${transitionStyleClasses}`;
  }
}

interface types {
  primary: string;
  secondary: string;
  danger: string;
  warning: string;
  success: string;
  info: string;
}
