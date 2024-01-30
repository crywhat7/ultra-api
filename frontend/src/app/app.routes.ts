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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
