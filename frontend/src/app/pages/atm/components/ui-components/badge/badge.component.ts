import { Component, Input } from '@angular/core';

@Component({
  selector: 'atm-badge',
  templateUrl: './badge.component.html',
})
export class AtmBadgeComponent {
  @Input() className = '';
  @Input() subtle = false;
  @Input() type: keyof types = 'gray';

  get classes(): string {
    const { className, type, subtle } = this;
    const base =
      'py-1 px-3 text-xs rounded-lg flex justify-center items-center gap-2';

    const transitionStyleClasses = 'transition duration-300 ease-in-out';

    const stylesClases: types = {
      gray: subtle ? 'bg-gray-800/70 text-white' : 'bg-gray-400 text-gray-200',
      blue: subtle ? 'bg-blue-800/70 text-white' : 'bg-blue-400 text-blue-200',
      purple: subtle
        ? 'bg-purple-800/70 text-white'
        : 'bg-purple-400 text-purple-200',
      amber: subtle
        ? 'bg-amber-800/70 text-white'
        : 'bg-amber-400 text-amber-200',
      red: subtle ? 'bg-red-800/70 text-white' : 'bg-red-400 text-red-200',
      pink: subtle ? 'bg-pink-800/70 text-white' : 'bg-pink-400 text-pink-200',
      green: subtle
        ? 'bg-green-800/70 text-white'
        : 'bg-green-400 text-green-200',
      teal: subtle ? 'bg-teal-800/70 text-white' : 'bg-teal-400 text-teal-200',
    };

    const classSelected = stylesClases[type] || stylesClases.gray;

    return `${base} ${classSelected} ${className} ${transitionStyleClasses}`;
  }
}

interface types {
  gray: string;
  blue: string;
  purple: string;
  amber: string;
  red: string;
  pink: string;
  green: string;
  teal: string;
}
