import { Usuario } from 'src/app/shared/interfaces/usuario';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedsModule } from './shared/shareds.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    SharedsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule

  ],
  providers: [ArancelService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
