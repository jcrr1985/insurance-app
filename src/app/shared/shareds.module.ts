import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { PrestacionTarjetaComponent } from "./components/prestacion-tarjeta/prestacion-tarjeta.component";
import { ChipsComponent } from "./components/chips/chips.component";
import { CustomStepperComponent } from './components/custom-stepper/custom-stepper.component';
import { TableResumeDetallePrestacionComponent } from './components/table-resume-detalle-prestacion/table-resume-detalle-prestacion.component';
import { InputCustomDsComponent } from './components/input-custom-ds/input-custom-ds.component';
import { TestingComponent } from "./components/testing/testing.component";

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    PrestacionTarjetaComponent,
    ChipsComponent,
    CustomStepperComponent,
    TableResumeDetallePrestacionComponent,
    InputCustomDsComponent,
    TestingComponent
  ],
  imports: [CommonModule],
  exports: [TestingComponent, HeaderComponent, SidebarComponent, HeaderComponent, ChipsComponent, CustomStepperComponent, TableResumeDetallePrestacionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedsModule { }
