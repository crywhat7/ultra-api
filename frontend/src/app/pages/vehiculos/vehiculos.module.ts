import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculosComponent } from './vehiculos.component';
import { VehiculosRoutingModule } from './vehiculos.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [VehiculosComponent],
})
export class VehiculosModule {}
