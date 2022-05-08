import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-resumen-reembolso',
  templateUrl: './tabla-resumen-reembolso.component.html',
  styleUrls: ['./tabla-resumen-reembolso.component.scss']
})
export class TablaResumenReembolsoComponent implements OnInit {
  public montoTotalSolicitado!: number;
  public nuevoReembolso!: boolean;
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
  ]

  constructor() { }

  ngOnInit(): void {
    let total: number = 0;
    this.solicitudes.forEach(solicitud => {
      total += (solicitud.valorPrestacion - solicitud.bonificacion);
    });
    this.montoTotalSolicitado = total;
    console.log('this.montoTotalSolicitado', this.montoTotalSolicitado)
  }
}