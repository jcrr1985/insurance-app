export interface IUsuario {
  codigoAsegurado: number;
  mailCliente: string;
  nombres: string;
  apellidos: string;
  ctaBancaria: string;
  codBanco: number;
  nombreBanco: string;
  codigoIsapre?: any;
  estado: string;
  polizas: IPoliza;
}

export interface ICarga {
  rut: string;
  dv: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: Date;
  codParentesco: number;
  parentesco: string;
  estado: string;
}

export interface IPoliza {
  poliza: string;
  rutEmpresa: string;
  cargas: ICarga[];
  coberturas: ICobertura[];
}

export interface ICobertura {
  idCobertura: number;
  descripcion: string;
}