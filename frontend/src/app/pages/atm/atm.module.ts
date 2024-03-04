import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../modules/primeng/primeng.module';
import { AtmRoutingModule } from './atm.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginRegisterComponent } from './views/login-register/login-register.component';
import { MainComponent } from './views/main/main.component';
import { CrudsComponent } from './views/cruds/cruds/cruds.component';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MessageChatComponent } from './components/message-chat/message-chat.component';
import { AtmButtonComponent } from './components/ui-components/button/button.component';
import { AtmBadgeComponent } from './components/ui-components/badge/badge.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    LoginRegisterComponent,
    MainComponent,
    CrudsComponent,
    HeaderComponent,
    TicketCardComponent,
    UserCardComponent,
    MessageChatComponent,
    // UI Components
    AtmButtonComponent,
    AtmBadgeComponent,
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
