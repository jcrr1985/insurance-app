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

  public cards: ICard[] = [
    { prestacion: 'Consulta Médica', name: 'atencionmedica', status: 'disabled', idPrestacion: 1 },
    { prestacion: 'Atención Hospitalaria', name: 'atencionhospitalaria', status: '', idPrestacion: 2 },
    { prestacion: 'Marcos y lentes', name: 'optica', status: '', idPrestacion: 3 },
    { prestacion: 'Atención Dental', name: 'dentista', status: '', idPrestacion: 4 },
    { prestacion: 'Examenes y Procedimientos', name: 'examenes', status: '', idPrestacion: 5 },
    { prestacion: 'Compra de medicamentos', name: 'medicamentos', status: '', idPrestacion: 6 },
  ];

  


  public continuar: boolean = false;

  constructor(private reembolsoService: ReembolsoService, private applicationRef: ApplicationRef) { }

  ngOnInit(): void {
    let total: number = 0;
    this.solicitudes.forEach(solicitud => {
      total += (solicitud.valorPrestacion - solicitud.bonificacion);
    });
    this.montoTotalSolicitado = total;
    console.log('this.montoTotalSolicitado', this.montoTotalSolicitado);
    this.reembolsoService.montoTotalSolicitado = this.montoTotalSolicitado;
  }


  cancelar() {
    console.log('cancelando');
  }

  habilitarSeleccionBeneficiario(valor: boolean) {
    this.reembolsoService.habilitarSeleccionBeneficiario.next(valor);
  }
  setValorRadioButtons(respuesta: string) {
    this.nuevoReembolso = respuesta;
    console.log('this.nuevoReembolso', this.nuevoReembolso);
    // this.applicationRef.tick()
  }
  returnValorRadioButtons() {
    return this.nuevoReembolso;
  }
}