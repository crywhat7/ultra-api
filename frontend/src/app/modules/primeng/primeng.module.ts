import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    // Importar los módulos de PrimeNG aquí
    ButtonModule,
    TooltipModule,
    DropdownModule,
    ToastModule,
    OverlayPanelModule,
    DialogModule,
    CalendarModule,
    InputTextModule,
    ImageModule,
  ],
})
export class PrimeNgModule {}
