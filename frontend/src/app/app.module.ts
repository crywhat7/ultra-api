import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AriMilModule } from './pages/ari-mil/ari-mil.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Examen1Module } from './pages/examen-1/examen-1.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgModule } from './modules/primeng/primeng.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    AriMilModule,
    Examen1Module,
    PrimeNgModule,
  ],
  providers: [MessageService],
  exports: [FormsModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
