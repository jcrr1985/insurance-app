import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DetallePrestacionComponent } from './reembolso/modales/detalle-prestacion/detalle-prestacion.component';
import { ModalRegistrarMedicamentoComponent } from './reembolso/modales/modal-registrar-medicamento/modal-registrar-medicamento.component';
import { ModalSolicitudReembolsoCompletadaComponent } from './reembolso/modales/modal-solicitud-reembolso-completada/modal-solicitud-reembolso-completada.component';
import { PantallaFinalComponent } from './reembolso/pantalla-final/pantalla-final.component';
import { ReembolsoComponent } from './reembolso/reembolso.component';
import { StepDatosGeneralesComponent } from './reembolso/solicitar-reembolso/components-steps/step-datos-generales/step-datos-generales.component';
import { StepDetallePrestacionComponent } from './reembolso/solicitar-reembolso/components-steps/step-detalle-prestacion/step-detalle-prestacion.component';
import { StepDocumentosGeneralesComponent } from './reembolso/solicitar-reembolso/components-steps/step-documentos/step-documentos-generales.component';
import { StepQuienSeAtendioComponent } from './reembolso/solicitar-reembolso/components-steps/step-quien-se-atendio/step-quien-se-atendio.component';
import { StepSeleccionaPrestacionComponent } from './reembolso/solicitar-reembolso/components-steps/step-selecciona-prestacion/step-selecciona-prestacion.component';
import { SolicitarReembolsoComponent } from './reembolso/solicitar-reembolso/solicitar-reembolso.component';
import { TablaHistorialComponent } from './reembolso/tabla-historial/tabla-historial.component';
import { TablaResumenReembolsoComponent } from './reembolso/tabla-resumen-reembolso/tabla-resumen-reembolso.component';
import { SharedsModule } from './shared/shareds.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ReembolsoComponent,
    TablaHistorialComponent,
    DetallePrestacionComponent,
    ModalSolicitudReembolsoCompletadaComponent,
    ModalRegistrarMedicamentoComponent,
    SolicitarReembolsoComponent,
    StepQuienSeAtendioComponent,
    StepSeleccionaPrestacionComponent,
    StepDocumentosGeneralesComponent,
    StepDatosGeneralesComponent,
    StepDetallePrestacionComponent,
    TablaResumenReembolsoComponent,
    PantallaFinalComponent,
  ],
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
    AppRoutingModule,
    ReembolsoComponent,
    TablaHistorialComponent,
    DetallePrestacionComponent
  ],
  providers: [ArancelService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
