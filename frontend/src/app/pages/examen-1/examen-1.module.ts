import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Examen1Component } from './examen-1.component';
import { Examen1RoutingModule } from './examen-1.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [Examen1Component],
  imports: [
    CommonModule,
    Examen1RoutingModule,
    HttpClientModule,
    FormsModule,
    OverlayPanelModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,
    ToastModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
})
export class Examen1Module {}
