import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
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
import { TestingComponent } from './shared/components/testing/testing.component';
import { SharedsModule } from './shared/shareds.module';

const routes: Routes = [
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
    TablaResumenReembolsoComponent,
    PantallaFinalComponent
  ],
  imports: [CommonModule,
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'corrected'
    }),
    SharedsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule,CommonModule, ReembolsoComponent, TablaHistorialComponent, DetallePrestacionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
