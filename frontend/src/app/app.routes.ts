import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ari-mil',
    pathMatch: 'full',
  },
  {
    path: 'ari-mil',
    loadChildren: () =>
      import('./pages/ari-mil/ari-mil.module').then((m) => m.AriMilModule),
  },
  {
    path: 'vehiculos',
    loadChildren: () =>
      import('./pages/vehiculos/vehiculos.module').then(
        (m) => m.VehiculosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
