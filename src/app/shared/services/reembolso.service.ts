import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Chip, Reembolsos } from '../interfaces/interfaces';

@Injectable({
      providedIn: 'root',
})
export class ReembolsoService {
      public datosReembolsosRepetido: Reembolsos[] = [];

      public reembolsos: Reembolsos[] = [
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
            },
            {
                  nombre: 'Leandro Letelier 28',
                  parentesco: 'Coyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Pagado parcial',
            },
            {
                  nombre: 'Alejandro Salgado',
                  parentesco: 'Yo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción IMED',
            },
            {
                  nombre: 'Marcelo Salgado',
                  parentesco: 'Hijo',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'En evaluación',
            },
            {
                  nombre: 'Ana María Gonzales',
                  parentesco: 'Madre',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Sin pago',
            },
            {
                  nombre: 'Francisca Arriagada',
                  parentesco: 'Conyugue',
                  numSolicitud: 152734,
                  montoSolicitado: '$13.000',
                  fechaPago: '2021-12-28T11:44:00Z',
                  estado: 'Transacción Farmacia',
            },
      ];

      public chipsData: Chip[] = [
            {
                  nombre: 'vs-Nurse-men',
                  desripcion: 'Consulta Médica',
                  state: false,
            },
            {
                  nombre: 'vs-Hospital-bed-vive',
                  desripcion: 'Atención Hospitalaria',
                  state: false,
            },
            {
                  nombre: 'vs-Microscope',
                  desripcion: 'Marcos y lentes',
                  state: false,
            },
            {
                  nombre: 'vs-Sad',
                  desripcion: 'Atención Dental',
                  state: false,
            },
            {
                  nombre: 'bi-sunglasses',
                  desripcion: 'Marcos y lentes',
                  state: false,
            },
            {
                  nombre: 'vs-Recetas',
                  desripcion: 'Compra de medicamentos',
                  state: false,
            },
      ];

      public habilitarSeleccionBeneficiario: BehaviorSubject<any> = new BehaviorSubject(true);
      public habilitarSeleccionBeneficiario$ = this.habilitarSeleccionBeneficiario.asObservable();
      public habilitarPaso1: boolean = true;
      public idprestacion: number = 1;

      constructor() { }
      setHabilitarStepone(value: boolean) {
            this.habilitarPaso1 = value;
            this.habilitarSeleccionBeneficiario.next(value);

      }
      getReembolsos(): Reembolsos[] {
            return this.reembolsos;
      }

      getChipsData(): Chip[] {
            return this.chipsData;
      }

      public montoTotalSolicitado: number = 0;

      setMontoTotalSolicitado(montoTotal: number) {
            this.montoTotalSolicitado = montoTotal
      }

      public get getMontoTotalSolicitado() {
            return this.montoTotalSolicitado;
      }

}
