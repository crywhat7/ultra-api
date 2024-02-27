import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../modules/primeng/primeng.module';
import { AtmRoutingModule } from './atm.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginRegisterComponent } from './views/login-register/login-register.component';
import { MainComponent } from './views/main/main.component';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MessageChatComponent } from './components/message-chat/message-chat.component';

@NgModule({
  declarations: [
    LoginRegisterComponent,
    MainComponent,
    TicketCardComponent,
    UserCardComponent,
    MessageChatComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AtmRoutingModule,
    HttpClientModule,
    PrimeNgModule,
  ],
})
export class AtmModule {}
