import { DataStorageService } from './../../shared/services/data-storage.service';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { ReembolsoService } from 'src/app/shared/services/reembolso.service';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/shared/interfaces/ICard';

@Component({
  selector: 'app-tabla-resumen-reembolso',
  templateUrl: './tabla-resumen-reembolso.component.html',
  styleUrls: ['./tabla-resumen-reembolso.component.scss']
})
export class TablaResumenReembolsoComponent implements OnInit {
  public montoTotalSolicitado!: number;
  public nuevoReembolso: string = '';
  public solicitudes: any[] = [
    {
      tipoReembolso: "Consulta medica en duro",
      numerosesiones: 3,
      valorPrestacion: 1000,
      bonificacion: 500
    },
    {
      tipoReembolso: "Compra medicamentos en duro",
      numerosesiones: 3,
      valorPrestacion: 2000,
      bonificacion: 600
    }, {
      tipoReembolso: "Examenes y Proc en Duro",
      numerosesiones: 3,
      valorPrestacion: 3000,
      bonificacion: 700
    },
  ];

  public opcionesPrestacionesCLEM: ICard[] = [
    { prestacion: 'Consulta Médica', name: 'atencionmedica', status: 'disabled', idPrestacion: 1 },
    { prestacion: 'Marcos y lentes', name: 'optica', status: '', idPrestacion: 3 },
    { prestacion: 'Examenes y Procedimientos', name: 'examenes', status: '', idPrestacion: 5 },
    { prestacion: 'Compra de medicamentos', name: 'medicamentos', status: '', idPrestacion: 6 },
  ];

  public opcionesPrestacionesD: ICard[] = [
    { prestacion: 'Atención Dental', name: 'dentista', status: '', idPrestacion: 4 },
  ];

  public opcionesPrestacionesH: ICard[] = [
    { prestacion: '', name: '', status: '', idPrestacion: 2 },
  ];




  public continuar: boolean = false;
  public prestacionSeleccionada: any;
  public goToMensajeFinal: string = 'no';

  constructor(private dataStorageService: DataStorageService, private reembolsoService: ReembolsoService, private arancelService: ArancelService) { }

  ngOnInit(): void {
    let total: number = 0;
    this.solicitudes.forEach(solicitud => {
      total += (solicitud.valorPrestacion - solicitud.bonificacion);
    });
    this.montoTotalSolicitado = total;
    this.reembolsoService.montoTotalSolicitado = this.montoTotalSolicitado;
    //this.prestacionSeleccionada = this.arancelService.getPrestacionSeleccionadaId ? this.arancelService.getPrestacionSeleccionadaId : 1;
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.prestacionSeleccionada = id);
    this.dataStorageService.getPrestacionesResumen().subscribe(prestaciones => console.log("has cargado esto", prestaciones))
    if (this.prestacionSeleccionada == 2) {
      this.nuevoReembolso = 'no';
      this.goToMensajeFinal = 'sí'
    }
  }

  setPrestacion(id: number) {
    this.dataStorageService.setIdPrestacion(id);
    this.arancelService.idprestacionSeleccionada = id;
  }
  cancelar() {
    this.restaurarFormulario();
  }

  habilitarSeleccionBeneficiario(valor: boolean) {
    this.reembolsoService.setHabilitarStepone(valor);
    this.restaurarFormulario();
  }
  setValorRadioButtons(respuesta: string) {
    this.nuevoReembolso = respuesta;
  }
  returnValorRadioButtons() {
    return this.nuevoReembolso;
  }
  restaurarFormulario() {
    this.dataStorageService.resturarFormularioReembolso();
    this.dataStorageService.restaurarDetallePrestaciones();
  }
}

// negro esta media confusa tu logica en este lado...xd