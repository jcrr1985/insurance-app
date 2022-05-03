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
  documentsDisplay: any = {
    hospitalario: {
      multi: false,
      nameFiles: [{ name: 'Documento Reembolso', files: [] }, { name: 'Documento de diagnóstico', files: [] }, { name: 'Documento adicional', files: [] }],
      filesUploades: [[], [], []],
      cols: 'col-span-4'
    },

    consultamedica: {
      multi: false,
      nameFiles: [{ name: 'Documento Reembolso', files: [] }, { name: 'Documento de diagnóstico', files: [] }, { name: 'Documento adicional', files: [] }],
      cols: 'col-span-3'
    },
    dentales: {
      multi: false,
      nameFiles: [{ name: 'Documento Reembolso', files: [] }, { name: 'Documento de diagnóstico', files: [] }, { name: 'Documento adicional', files: [] }],
      cols: 'col-span-3'
    },
    examenes: {
      multi: false,
      nameFiles: [{ name: 'Documento Reembolso', files: [] }, { name: 'Documento de diagnóstico', files: [] }, { name: 'Documento adicional', files: [] }],
      cols: 'col-span-3'
    },
    medicamentos: {
      multi: false,
      nameFiles: [{ name: 'Documento Reembolso', files: [] }, { name: 'Documento de diagnóstico', files: [] }, { name: 'Documento adicional', files: [] }],
      cols: 'col-span-3'
    },
    lentes: {
      multi: false,
      nameFiles: [{ name: 'Documento Reembolso', files: [] }, { name: 'Documento de diagnóstico', files: [] }, { name: 'Documento adicional', files: [] }],
      cols: 'col-span-3'
    },




  }
  constructor() { }
  filesUploaded: any = [];
  ngOnInit(): void {
    this.addEventListener();
  }

  addEventListener() {
    document.addEventListener('dsFileSendFiles', (evt: any) => {
      const index = parseInt(evt.target.id.replace('documento', ''));
      console.log(evt.detail)
      switch (this.idPrestacionSeleccionada) {
        case 1:
          this.documentsDisplay.hospitalario.nameFiles[index].files = evt.detail;
          break;
        case 2:
          this.documentsDisplay.consultamedica.nameFiles[index].files = evt.detail;
          break;
        case 3:
          this.documentsDisplay.dentales.nameFiles[index].files = evt.detail;
          break;
        case 4:
          this.documentsDisplay.examenes.nameFiles[index].files = evt.detail;
          break;
        case 5:
          this.documentsDisplay.medicamentos.nameFiles[index].files = evt.detail;
          break;
        case 6:
          this.documentsDisplay.lentes.nameFiles[index].files = evt.detail;
          break;

        default:
          break;
      }
      console.log(evt.detail)
    })
    document.addEventListener('dsFileDeleteFile', (evt: any) => {
      const index = parseInt(evt.target.id.replace('documento', ''));
      console.log(evt.detail)
    })
    document.addEventListener('dsFileClick', (evt: any) => {
      const index = parseInt(evt.target.id.replace('documento', ''));
      console.log(evt.detail)
    })
  }

  deleteDocs(prestacion: string, indexNameFiles: number, nameFile: string) {
    let newFiles = [];
    for (let x of this.documentsDisplay[prestacion]['nameFiles'][indexNameFiles]['files']) {
      if (x.name != nameFile) newFiles.push(x);
    }
    this.documentsDisplay[prestacion]['nameFiles'][indexNameFiles]['files'] = newFiles;
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
