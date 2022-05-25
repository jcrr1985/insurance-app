import { IArancel } from './IArancel';
import { IDocument } from './IDocument';

export interface IGasto {
  idPrestacion: number;
  folio: number;
  fecha: Date;
  idTipoDoc: number;
  rutPrestador: string;
  extension: string;
  base64: string;
  origenImagen: string;
  diagnostico: string;
  diagnosticoMonto: number;
  montoDocumento: number;
  flagRecetaPermanente: boolean;
  flagDescuentoAcumulado: boolean;
  descuentoAcumulado: number;
  flagDocEnvIsapre: boolean;
  flagMasDeUnaSesion: boolean;
  aranceles: IArancel[];
  docAdicionales: IDocument[];
  docDiagnostico: IDocument[];
}
