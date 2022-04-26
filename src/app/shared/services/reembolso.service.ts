import { Injectable } from '@angular/core';
import { Chip, Reembolsos } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReembolsoService {
  public datosReembolsosRepetido: Reembolsos[] = [];

  public reembolsos: Reembolsos[] = [
    {
      nombre: 'Leandro Letelier 1',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier 2',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier 3',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier 4',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier 5',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier 6',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Trasacción Farmacia',
    },
    {
      nombre: 'Leandro Letelier 7',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier 8',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier 9',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier 10',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier 11',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier 12',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Trasacción Farmacia',
    },
    {
      nombre: 'Leandro Letelier 13',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier 14',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier 15',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier 16',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier 17',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier 18',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Trasacción Farmacia',
    },
    {
      nombre: 'Leandro Letelier 19',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier 20',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier 21 ',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier 22 ',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier 23',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier 24',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Trasacción Farmacia',
    },
    {
      nombre: 'Leandro Letelier 25',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier 26',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier 27',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier 28',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier 29',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier 30',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Trasacción Farmacia',
    },
    {
      nombre: 'Leandro Letelier 31',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier 32',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier 33',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier 34',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier 35',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier 36',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Trasacción Farmacia',
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

  constructor() {}

  getReembolsos(): Reembolsos[] {
    return this.reembolsos;
  }

  getChipsData(): Chip[] {
    return this.chipsData;
  }
}
