import { Injectable } from '@angular/core';
import { Chip, Reembolsos } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReembolsoService {
  public datosReembolsosRepetido: Reembolsos[] = [];

  public reembolsos: Reembolsos[] = [
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Trasacción Farmacia',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Trasacción Farmacia',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Trasacción Farmacia',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Trasacción Farmacia',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Trasacción Farmacia',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Pagado parcial',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'transacción IMED',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'En evaluación',
    },
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: 'Sin pago',
    },
    {
      nombre: 'Leandro Letelier',
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
