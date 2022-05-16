export interface Persona {
  nombre: string;
  edad: number;
  desc: string;
}

export interface Chip {
  nombre: string;
  desripcion: string;
  state: boolean;
}

export interface Reembolsos {
  nombre: string;
  parentesco: string;
  numSolicitud: number;
  montoSolicitado: string;
  fechaPago: string;
  estado: string;
}

export interface FilesUploaded {
  name: string;
}

export interface PaginationSource {
  label: string;
  value: number;
}

export interface CustomStepperSize {
  stepperOne: string;
  stepperTwo: string;
  stepperThree: string;
  stepperFour: string;
  stepperFive: string;
}
export interface Prestacion {
  /**
   * @description consulta medica - medicamentos - lentes ...
   */
  tipoPrestacion: string;
  prestacionSeleccionada: string;
  numerosesiones: String;
  sesiones: number;
  valorPrestacion: number;
  bonificacion: number;
}
