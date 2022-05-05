import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReembolsoModule } from './reembolso/reembolso.module';
import { SharedsModule } from './shared/shareds.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    ReembolsoModule,
    SharedsModule,

  ],
  exports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReembolsoModule,

  ],
  providers: [ArancelService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
