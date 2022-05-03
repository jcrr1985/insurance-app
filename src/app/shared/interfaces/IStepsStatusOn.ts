export interface IstepsStatusOn {
  stepOne_who: StepOneWho;
  stepTwo_selectOption: StepTwoSelectedOption;
  stepThree_general: StepThreeGeneral;
  stepFour_general: StepFourGeneral;
  stepFive_Details: StepFiveDetails;
}

export interface StepOneWho {
  personaSeleccionada: boolean;
}

export interface StepTwoSelectedOption {
  prestacionSeleccionada: boolean;
  reembolsoPrevioIsapre?: any;
}

export interface StepThreeGeneral {
  rutInstitucion: boolean;
  boletaFactura: boolean;
  fechaAtencion: boolean;
  copagoMayor?: any;
}

export interface StepFourGeneral {
  tipoDocumentoSeleccionado?: any;
  fileUploaded: boolean;
  agenciaSeleccionada: boolean;
}

export interface StepFiveDetails {
  reembolsoCalculation: boolean;
}
