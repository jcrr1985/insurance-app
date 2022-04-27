import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import '@vs-design-system/ds-file';

@Component({
  selector: 'app-step-documentos-generales',
  templateUrl: './step-documentos-generales.component.html',
  styleUrls: ['./step-documentos-generales.component.scss']
})
export class StepDocumentosGeneralesComponent implements OnInit {
  @Input() montoReelbolso: any;
  @Input() stepperFourSource: any;
  @Input() customStepperSize: any;
  @Input() stepsStatusOn: any;
  @Input() isapreFonasaOptions: any;
  @Input() idPrestacionSeleccionada: number = 1;


  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() evaluateStepFour: EventEmitter<any> = new EventEmitter<any>();
  documentsDisplay = {
    hospitalario: {
      multi: false,
      nameFiles: ['Documento de reembolso', 'Documento de diagnóstico', 'Documento adicional'],
      cols: 'col-span-3'
    },

    consultamedica: {
      multi: false,
      nameFiles: ['Documento 1', 'Documento 2', 'Documento 3'],
      cols: 'col-span-3'
    },
    dentales: {
      multi: false,
      nameFiles: ['Documento 1', 'Documento 2', 'Documento 3'],
      cols: 'col-span-3'
    },
    examenes: {
      multi: false,
      nameFiles: ['Documento 1', 'Documento 2', 'Documento 3', 'Documento 4'],
      cols: 'col-span-3'
    },
    medicamentos: {
      multi: false,
      nameFiles: ['Documento 1', 'Documento 2', 'Documento 3', 'Documento 4'],
      cols: 'col-span-3'
    },
    lentes: {
      multi: false,
      nameFiles: ['Documento 1', 'Documento 2', 'Documento 3', 'Documento 4'],
      cols: 'col-span-3'
    },




  }
  constructor() { }
  filesUploaded: any = [];
  ngOnInit(): void {
  }

  setStepsStatus(data: any) {
    this.sendData.emit(data)
    this.evaluateStepFour.emit();
  }
  /**
  *
  * @param step property
  * @param option property
  * @returns {boolean | string | null}
  * @description retorna el valor del archivo de stepsStatusOn
  */
  getStepsStatus(step: string, option: string) {
    return this.stepsStatusOn[step][option];
  }

  uploadingFilesEvent(event: any) {
    console.log(event);
    if (event.target.id === 'file_uploader') {
      this.filesUploaded = event.target.files;
      this.stepsStatusOn.stepFour_general.fileUploaded = true;
      this.evaluateStepFour.emit();
    }
  }

}
