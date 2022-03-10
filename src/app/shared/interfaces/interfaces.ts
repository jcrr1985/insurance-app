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

export interface DatosReembolso {
  nombre: string;
  numSolicitud: number;
  montoSolicitado: string;
  fechaPago: string;
  estado: estadoSolicitud;
  documentoLiquidacion: {
    iconLiquidacion: IconLiquidacion;
    textoLiquidacion: TextoLiquidacion;
  };
}

export interface estadoSolicitud {
  darkerColor: string;
  ligterColor: string;
  text: string;
  iconText: string;
  // text:string

}

export interface IconLiquidacion {
  color: string;
  size: string;
  iconName: string;
}

export interface TextoLiquidacion {
  type: string;
  family: string;
  weight: string;
  color: string;
  text: string;
}

export interface FilesUploaded {
  name: string;
}

export interface PaginationSource {
  label: string;
  value: number;
}

export interface CustomStepperSize  {
  stepperOne: string;
  stepperTwo: string;
  stepperThree: string;
  stepperFour: string;
}
