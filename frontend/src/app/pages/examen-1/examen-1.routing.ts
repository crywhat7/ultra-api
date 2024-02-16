import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Examen1Component } from './examen-1.component';

const routes: Routes = [
  {
    path: '',
    component: Examen1Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Examen1RoutingModule {}
