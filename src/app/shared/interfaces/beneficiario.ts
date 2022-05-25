export interface Beneficiario {
    rut: string;
    nombre: string;
    apellido: string;
    parentesco: string;
    esActivo: string;
    codigoCobertura?: number;
    coberturas?: number[];
  }