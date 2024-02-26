import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'atm',
    pathMatch: 'full',
  },
  {
    path: 'ari-mil',
    loadChildren: () =>
      import('./pages/ari-mil/ari-mil.module').then((m) => m.AriMilModule),
  },
  {
    path: 'examen-1',
    loadChildren: () =>
      import('./pages/examen-1/examen-1.module').then((m) => m.Examen1Module),
  },
  {
    path: 'vehiculos',
    loadChildren: () =>
      import('./pages/vehiculos/vehiculos.module').then(
        (m) => m.VehiculosModule
      ),
  },
  {
    path: 'atm',
    loadChildren: () =>
      import('./pages/atm/atm.module').then((m) => m.AtmModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
