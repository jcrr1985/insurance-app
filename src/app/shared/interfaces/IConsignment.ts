import { IGasto } from "./IGasto";

export interface IConsignment {
  policy: string;
  clasif: number;
  codCobertura: string;
  fechaDenuncia: Date;
  rutTitular: string;
  dvRutTitular: string;
  rutBeneficiario: string;
  dvRutBeneficiario: string;
  nombresBeneficiario: string;
  apellidosBeneficiario: string;
  idIsapre: number;
  mailCliente: string;
  codigoBanco: string;
  nombreBanco: string;
  numeroCuenta: string;
  plataforma: string;
  sistemaOperativo: string;
  nombresTitular: string;
  apellidosTitular: string;
  folioDenuncio: number;
  montoTotal: number;
  gastos: IGasto[];
}
