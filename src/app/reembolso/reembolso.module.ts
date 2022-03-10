import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReembolsoComponent } from './reembolso.component';
import { RouterModule, Routes } from '@angular/router';
import { TablaHistorialComponent } from './tabla-historial/tabla-historial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedsModule } from '../shared/shareds.module';
import { DetallePrestacionComponent } from './modales/detalle-prestacion/detalle-prestacion.component';
import { ModalSolicitudReembolsoCompletadaComponent } from './modales/modal-solicitud-reembolso-completada/modal-solicitud-reembolso-completada.component';
import { ModalRegistrarMedicamentoComponent } from './modales/modal-registrar-medicamento/modal-registrar-medicamento.component';
import { SolicitarReembolsoComponent } from './solicitar-reembolso/solicitar-reembolso.component';
import { StepQuienSeAtendioComponent } from './solicitar-reembolso/components-steps/step-quien-se-atendio/step-quien-se-atendio.component';
import { StepSeleccionaPrestacionComponent } from './solicitar-reembolso/components-steps/step-selecciona-prestacion/step-selecciona-prestacion.component';
import { StepDatosGeneralesComponent } from './solicitar-reembolso/components-steps/step-datos-generales/step-datos-generales.component';
import { StepDetallePrestacionComponent } from './solicitar-reembolso/components-steps/step-detalle-prestacion/step-detalle-prestacion.component';
import { TestingComponent } from '../shared/components/testing/testing.component';

const route: Routes = [
  { path: '', component: TablaHistorialComponent },
  { path: 'historial', component: TablaHistorialComponent },
  { path: 'solicitud', component: SolicitarReembolsoComponent },
  { path: 'testing', component: TestingComponent }
];

@NgModule({
  declarations: [ReembolsoComponent, TablaHistorialComponent, DetallePrestacionComponent, ModalSolicitudReembolsoCompletadaComponent, ModalRegistrarMedicamentoComponent, SolicitarReembolsoComponent, StepQuienSeAtendioComponent, StepSeleccionaPrestacionComponent, StepDatosGeneralesComponent, StepDetallePrestacionComponent],
  imports: [CommonModule, RouterModule.forChild(route), SharedsModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, ReembolsoComponent, TablaHistorialComponent, DetallePrestacionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReembolsoModule { }
