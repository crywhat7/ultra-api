import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculosComponent } from './vehiculos.component';
import { SessionGuard } from '../ari-mil/guards/login-guard';

const routes: Routes = [
  {
    path: '',
    component: VehiculosComponent,
    canActivate: [SessionGuard],
    canLoad: [SessionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculosRoutingModule {}
