import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReembolsoComponent } from './reembolso.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedsModule } from '../shared/shareds.module';
import { DetallePrestacionComponent } from './modales/detalle-prestacion/detalle-prestacion.component';
import { ModalSolicitudReembolsoCompletadaComponent } from './modales/modal-solicitud-reembolso-completada/modal-solicitud-reembolso-completada.component';
import { ModalRegistrarMedicamentoComponent } from './modales/modal-registrar-medicamento/modal-registrar-medicamento.component';
import { SolicitarReembolsoComponent } from './solicitar-reembolso/solicitar-reembolso.component';
import { StepQuienSeAtendioComponent } from './solicitar-reembolso/components-steps/step-quien-se-atendio/step-quien-se-atendio.component';
import { StepSeleccionaPrestacionComponent } from './solicitar-reembolso/components-steps/step-selecciona-prestacion/step-selecciona-prestacion.component';
import { StepDocumentosGeneralesComponent } from './solicitar-reembolso/components-steps/step-documentos/step-documentos-generales.component';
import { StepDatosGeneralesComponent } from './solicitar-reembolso/components-steps/step-datos-generales/step-datos-generales.component';
import { StepDetallePrestacionComponent } from './solicitar-reembolso/components-steps/step-detalle-prestacion/step-detalle-prestacion.component';
import { TestingComponent } from '../shared/components/testing/testing.component';
import { ConsultaMedicaComponent } from './modales/detalle-prestacion/tipos/consulta-medica/consulta-medica.component';
import { AtencionHospitalariaComponent } from './modales/detalle-prestacion/tipos/atencion-hospitalaria/atencion-hospitalaria.component';
import { MarcosYLentesComponent } from './modales/detalle-prestacion/tipos/marcos-y-lentes/marcos-y-lentes.component';
import { AtencionDentalComponent } from './modales/detalle-prestacion/tipos/atencion-dental/atencion-dental.component';
import { CompraMedicamentosComponent } from './modales/detalle-prestacion/tipos/compra-medicamentos/compra-medicamentos.component';
import { ExamenesYProcedimientosComponent } from './modales/detalle-prestacion/tipos/examenes-y-procedimientos/examenes-y-procedimientos.component';
import { TablaHistorialComponent } from './tabla-historial/tabla-historial.component';
import { TablaResumenReembolsoComponent } from './tabla-resumen-reembolso/tabla-resumen-reembolso.component';
import { PantallaFinalComponent } from './pantalla-final/pantalla-final.component';

const route: Routes = [
  { path: '', component: ReembolsoComponent },
  { path: 'home', component: TablaHistorialComponent },
  { path: 'reembolso', component : ReembolsoComponent},
  { path: 'historial', component: TablaHistorialComponent },
  { path: 'solicitud', component: SolicitarReembolsoComponent },
  { path: 'resumen', component: TablaResumenReembolsoComponent },
  { path: 'final', component: PantallaFinalComponent },
  { path: 'testing', component: TestingComponent }
];

@NgModule({
  declarations: [ReembolsoComponent,
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
    ConsultaMedicaComponent,
    AtencionHospitalariaComponent,
    MarcosYLentesComponent,
    AtencionDentalComponent,
    CompraMedicamentosComponent,
    ExamenesYProcedimientosComponent,
    TablaResumenReembolsoComponent,
    PantallaFinalComponent
  ],
  imports: [CommonModule, RouterModule.forChild(route), SharedsModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, ReembolsoComponent, TablaHistorialComponent, DetallePrestacionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReembolsoModule { }
