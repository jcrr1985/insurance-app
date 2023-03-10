import { IClaim } from "../interfaces/IClaim";

export class Historico {
  private readonly _estado: string;
  private readonly _fechaSolicitud: Date;
  private readonly _tipoPrestacion: string;
  private readonly _montoSolicitado: number;
  private readonly _montoReembolsado: any;
  private readonly _nombreBeneficiario: string;
  private readonly _relacionBeneficiario: string;
  private readonly _numeroSolicitud: number;
  private readonly _fechaPago: Date | null;

  constructor(reembolso: IClaim) {
    this._estado = reembolso.claimsStatus;
    this._fechaSolicitud = new Date(reembolso.issueDate);
    this._tipoPrestacion = reembolso.claimType.name ? reembolso.claimType.name : 'Prestación Sin Nombre';
    this._montoSolicitado = reembolso.claimedAmount;
    this._montoReembolsado = reembolso.paidAmount;
    this._nombreBeneficiario = reembolso.beneficiary.name;
    this._relacionBeneficiario = reembolso.beneficiary.relacion;
    this._numeroSolicitud = reembolso.requestNumber;
    this._fechaPago = reembolso.paymentDate && new Date(reembolso.paymentDate).getFullYear() !== 1 ? new Date(reembolso.paymentDate) : null;
  }

  public get estado(): string {
    return this._estado;
  }

  public get fechaSolicitud(): Date {
    return this._fechaSolicitud;
  }

  public get tipoPrestacion(): string {
    return this._tipoPrestacion;
  }

  public get montoSolicitado(): number {
    return this._montoSolicitado;
  }

  public get montoReembolsado(): number {
    return this._montoReembolsado;
  }

  public get nombreBeneficiario(): string {
    return this._nombreBeneficiario;
  }

  public get relacionBeneficiario(): string {
    return this._relacionBeneficiario;
  }

  public get numeroSolicitud(): number {
    return this._numeroSolicitud;
  }

  public get fechaPago(): Date | null {
    return this._fechaPago;
  }
}
