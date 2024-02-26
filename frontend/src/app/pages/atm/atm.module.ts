import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../modules/primeng/primeng.module';
import { AtmRoutingModule } from './atm.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginRegisterComponent } from './views/login-register/login-register.component';
import { MainComponent } from './views/main/main.component';

@NgModule({
  declarations: [LoginRegisterComponent, MainComponent],
  imports: [
    CommonModule,
    FormsModule,
    AtmRoutingModule,
    HttpClientModule,
    PrimeNgModule,
  ],
})
export class AtmModule {}
