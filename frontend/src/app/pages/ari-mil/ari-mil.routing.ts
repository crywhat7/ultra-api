import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { SessionGuard } from './guards/login-guard';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [SessionGuard],
    canLoad: [SessionGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AriMilRoutingModule {}
