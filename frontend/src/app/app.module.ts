import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AriMilModule } from './pages/ari-mil/ari-mil.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, AppRoutingModule, AriMilModule],
  exports: [FormsModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
