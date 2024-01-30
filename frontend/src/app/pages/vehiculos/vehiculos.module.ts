import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculosComponent } from './vehiculos.component';
import { VehiculosRoutingModule } from './vehiculos.routing';

@NgModule({
  imports: [CommonModule, VehiculosRoutingModule],
  declarations: [VehiculosComponent],
})
export class VehiculosModule {}
