
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallaFinalComponent } from './reembolso/pantalla-final/pantalla-final.component';
import { ReembolsoComponent } from './reembolso/reembolso.component';
import { SolicitarReembolsoComponent } from './reembolso/solicitar-reembolso/solicitar-reembolso.component';
import { TablaHistorialComponent } from './reembolso/tabla-historial/tabla-historial.component';
import { TablaResumenReembolsoComponent } from './reembolso/tabla-resumen-reembolso/tabla-resumen-reembolso.component';
import { TablaMobileComponent } from './shared/components/tabla-mobile/tabla-mobile.component';
import { TestingComponent } from './shared/components/testing/testing.component';

const routes: Routes = [
  { path: '', component: ReembolsoComponent },
  { path: 'home', component: TablaHistorialComponent },
  { path: 'reembolso', component : ReembolsoComponent},
  { path: 'historial', component: TablaHistorialComponent },
  { path: 'solicitud', component: SolicitarReembolsoComponent },
  { path: 'resumen', component: TablaResumenReembolsoComponent },
  { path: 'final', component: PantallaFinalComponent },
  { path: 'testing', component: TestingComponent },
  { path: 'tmogile', component: TablaMobileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
              relativeLinkResolution: 'corrected'
            })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
