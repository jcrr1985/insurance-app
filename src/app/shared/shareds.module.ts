import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PrestacionTarjetaComponent } from './components/prestacion-tarjeta/prestacion-tarjeta.component';
import { ChipsComponent } from './components/chips/chips.component';
import { CustomStepperComponent } from './components/custom-stepper/custom-stepper.component';
import { TableResumeDetallePrestacionComponent } from './components/table-resume-detalle-prestacion/table-resume-detalle-prestacion.component';
import { InputCustomDsComponent } from './components/input-custom-ds/input-custom-ds.component';
import { TestingComponent } from './components/testing/testing.component';
import { ModalExampleComponent } from './components/modal/ingreso-prestacion/modal-example/modal-example.component';
import { TableDetalleReembolsoComponent } from './components/table-detalle-reembolso/table-detalle-reembolso.component';
import { DsInputComponent } from './components/inputs/ds-input/ds-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DsSelectV2Component } from './components/inputs/ds-select-v2/ds-select-v2.component';
import { DsSearchV2Component } from './components/inputs/ds-search-v2/ds-search-v2.component';
import { CardOptionComponent } from './components/card-option/card-option.component';
import { PillComponent } from './components/pill/pill.component';
import { ColDocLiqComponent } from './components/col-doc-liq/col-doc-liq.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    PrestacionTarjetaComponent,
    ChipsComponent,
    CustomStepperComponent,
    TableResumeDetallePrestacionComponent,
    InputCustomDsComponent,
    TestingComponent,
    ModalExampleComponent,
    TableDetalleReembolsoComponent,
    DsInputComponent,
    DsSelectV2Component,
    DsSearchV2Component,
    CardOptionComponent,
    PillComponent,
    ColDocLiqComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    TestingComponent,
    HeaderComponent,
    SidebarComponent,
    HeaderComponent,
    ChipsComponent,
    CustomStepperComponent,
    TableResumeDetallePrestacionComponent,
    DsInputComponent,
    DsSelectV2Component,
    DsSearchV2Component,
    CardOptionComponent,
    PillComponent,
    ColDocLiqComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedsModule {}
