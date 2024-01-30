import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AriMilComponent } from './ari-mil.component';
import { AriMilRoutingModule } from './ari-mil.routing';
import { MainComponent } from './views/main/main.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardPostComponent } from './components/card-post/card-post.component';

@NgModule({
  declarations: [
    AriMilComponent,
    LoginComponent,
    MainComponent,
    CardPostComponent,
  ],
  imports: [CommonModule, AriMilRoutingModule, FormsModule, HttpClientModule],
})
export class AriMilModule {}
