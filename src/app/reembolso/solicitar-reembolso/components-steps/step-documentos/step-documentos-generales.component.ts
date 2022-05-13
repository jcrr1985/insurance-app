import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import '@vs-design-system/ds-file';
import { timer } from 'rxjs';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';

@Component({
  selector: 'app-step-documentos-generales',
  templateUrl: './step-documentos-generales.component.html',
  styleUrls: ['./step-documentos-generales.component.scss']
})
export class StepDocumentosGeneralesComponent implements OnInit, OnChanges {
  @Input() montoReelbolso: any;
  @Input() stepperFourSource: any;
  @Input() customStepperSize: any;
  @Input() stepsStatusOn: any;
  @Input() isapreFonasaOptions: any;
  @Input() eliminarDocumentoAdicional: any;
  idPrestacionSeleccionada: number = 1;


  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() evaluateStepFour: EventEmitter<any> = new EventEmitter<any>();
  public documentsDisplay: any = {
    consultamedica: {
      multi: false,
      nameFiles: [{ name: 'Documento Reembolso', files: [], required: true, valid: false, esDiagnostico: false }, { name: 'Documento de diagnóstico', files: [], required: true, valid: false, esDiagnostico: true }, { name: 'Documento adicional', files: [], required: false, valid: true, esDiagnostico: false }],
      cols: 'col-span-4'
    },
    hospitalario: {
      multi: false,
      nameFiles: [{ name: 'Documento Hospitalario', files: [], required: true, valid: false }],
      filesUploades: [[], [], []],
      cols: 'col-span-12',
    },
    lentes: {
      multi: false,
      nameFiles: [{ name: 'Documento Reembolso', files: [], required: true, valid: false }, { name: 'Receta Óptica', files: [], required: true, valid: false }, { name: 'Documento adicional', files: [], required: false, valid: true }],
      cols: 'col-span-4'
    },
    dentales: {
      multi: false,
      nameFiles: [{ name: 'Documento Reembolso', files: [], required: true, valid: false }, { name: 'Formulario Dental', files: [], required: true, valid: false }, { name: 'Presupuesto Dental', files: [], required: true, valid: false }, { name: 'Documento adicional', files: [], required: false, valid: true }],
      cols: 'col-span-3'
    },
    examenes: {
      multi: false,
      nameFiles: [{ name: 'Documento Reembolso', files: [], required: true, valid: false }, { name: 'Documento de diagnóstico', files: [], required: true, valid: false }, { name: 'Documento adicional', files: [], required: false, valid: true }],
      cols: 'col-span-4'
    },
    medicamentos: {
      multi: false,
      nameFiles: [{ name: 'Documento Reembolso', files: [], required: true, valid: false }, { name: 'Documento de diagnóstico', files: [], required: true, valid: false }, { name: 'Documento adicional', files: [], required: false, valid: true }],
      cols: 'col-span-4'
    },
  }
  constructor(private arancelService: ArancelService) {
  }
  ngOnChanges(changes: SimpleChanges) { }
  filesUploaded: any = [];
  ngOnInit(): void {
    this.idPrestacionSeleccionada = this.arancelService.idprestacionSeleccionada;
    this.arancelService.setIdSubject$.subscribe(prestacionId => {
      this.idPrestacionSeleccionada = prestacionId;
    });
    this.addEventListener();
    this.restoreDocs(); 
  }

  restoreDocs() {
    this.documentsDisplay = {
      consultamedica: {
        multi: false,
        nameFiles: [{ name: 'Documento de reembolso', files: [], required: true, valid: false, esDiagnostico: false }, { name: 'Documento de diagnóstico', files: [], required: true, valid: false, esDiagnostico: true }, { name: 'Documento adicional', files: [], required: false, valid: true, esDiagnostico: false }],
        cols: 'col-span-4'
      },
      hospitalario: {
        multi: false,
        nameFiles: [{ name: 'Documentos hospitalario', files: [], required: true, valid: false }],
        filesUploades: [[], [], []],
        cols: 'col-span-12',
      },
      lentes: {
        multi: false,
        nameFiles: [{ name: 'Documento de reembolso', files: [], required: true, valid: false }, { name: 'Receta óptica', files: [], required: true, valid: false }, { name: 'Documento adicional', files: [], required: false, valid: true }],
        cols: 'col-span-4'
      },
      dentales: {
        multi: false,
        nameFiles: [{ name: 'Documento de reembolso', files: [], required: true, valid: false }, { name: 'Formulario dental', files: [], required: true, valid: false }, { name: 'Presupuesto dental', files: [], required: true, valid: false }, { name: 'Documento adicional', files: [], required: false, valid: true }],
        cols: 'col-span-3'
      },
      examenes: {
        multi: false,
        nameFiles: [{ name: 'Documento de reembolso', files: [], required: true, valid: false }, { name: 'Documento de diagnóstico', files: [], required: true, valid: false }, { name: 'Documento adicional', files: [], required: false, valid: true }],
        cols: 'col-span-4'
      },
      medicamentos: {
        multi: false,
        nameFiles: [{ name: 'Boleta', files: [], required: true, valid: false }, { name: 'Receta medica', files: [], required: true, valid: false }, { name: 'Documento adicional', files: [], required: false, valid: true }],
        cols: 'col-span-4'
      },
    }
  }

  addEventListener() {
    const listener: any = document.eventListeners ? document.eventListeners() : null;
    if (!listener.length) document.addEventListener('dsFileSendFiles', (evt: any) => {
      console.log("intentando recibir", evt);
      const index = parseInt(evt.target.id.replace('documento', ''));
      console.log("añadiento a esta prestacion ", this.idPrestacionSeleccionada)
      console.log("index", index)
      let fileEvnt
      switch (this.idPrestacionSeleccionada) {
        case 1:
          console.log("actual ->", this.documentsDisplay.consultamedica.nameFiles[index].files)
          console.log("recibido", evt.detail);
          fileEvnt = evt.detail;
          this.documentsDisplay.consultamedica.nameFiles[index].files.push(...fileEvnt)
          this.validateFileState('consultamedica', index);
          this.emitirCambioArchivo()
          console.log("final ->", this.documentsDisplay.consultamedica.nameFiles[index].files)

          break;
        case 2:
          fileEvnt = evt.detail;
          this.documentsDisplay.hospitalario.nameFiles[index].files.push(...fileEvnt)
          this.validateFileState('hospitalario', index);
          this.emitirCambioArchivo()
          break;
        case 3:
          fileEvnt = evt.detail;
          this.documentsDisplay.lentes.nameFiles[index].files.push(...fileEvnt)
          this.validateFileState('lentes', index);
          this.emitirCambioArchivo()
          break;
        case 4:
          fileEvnt = evt.detail;
          this.documentsDisplay.dentales.nameFiles[index].files.push(...fileEvnt)
          this.validateFileState('dentales', index);
          this.emitirCambioArchivo()
          break;
        case 5:
          fileEvnt = evt.detail;
          this.documentsDisplay.examenes.nameFiles[index].files.push(...fileEvnt)
          this.validateFileState('examenes', index);
          this.emitirCambioArchivo()
          break;
        case 6:
          fileEvnt = evt.detail;
          this.documentsDisplay.medicamentos.nameFiles[index].files.push(...fileEvnt)
          this.validateFileState('medicamentos', index);
          this.emitirCambioArchivo()
          break;

        default:
          break;
      }
      // (document.querySelector(`#${evt.target.id} > div > div > input`) as any).value = null;
      this.evaluateStepFour.emit()
    })
    /* document.addEventListener('dsFileDeleteFile', (evt: any) => {
      const index = parseInt(evt.target.id.replace('documento', ''));
      console.log(evt.detail)
    })
    document.addEventListener('dsFileClick', (evt: any) => {
      const index = parseInt(evt.target.id.replace('documento', ''));
      console.log(evt.detail)
    }) */
  }

  validateFileState(nombrePrestacion: string, index: number) {
    const isRequired = this.documentsDisplay[nombrePrestacion].nameFiles[index].required;
    this.documentsDisplay[nombrePrestacion].nameFiles[index].valid = isRequired ? this.documentsDisplay[nombrePrestacion].nameFiles[index].files.length > 0 ? true : false : true;
  }
  /**
   * @description valida si estan correctos los archivos cargados en los inputs
   * @returns {Boolean} true / false
   */
  validarCargaDeArchivos() {
    let selected = [];
    switch (this.idPrestacionSeleccionada) {
      case 1:
        selected = this.documentsDisplay.consultamedica.nameFiles;
        break;
      case 2:
        selected = this.documentsDisplay.hospitalario.nameFiles;
        break;
      case 3:
        selected = this.documentsDisplay.lentes.nameFiles;
        break;
      case 4:
        selected = this.documentsDisplay.dentales.nameFiles;
        break;
      case 5:
        selected = this.documentsDisplay.examenes.nameFiles;
        break;
      case 6:
        selected = this.documentsDisplay.medicamentos.nameFiles;
        break;

      default:
        break;
    }
    for (let x of selected) {
      if (!x.valid) return false;
    }
    return true;
  }
  async emitirCambioArchivo() {
    const archivosSubidosCorrectamente = this.validarCargaDeArchivos();
    console.log("archivosSubidosCorrectamente", archivosSubidosCorrectamente)
    const data = { step: 'stepFour_general', option: 'fileUploaded', value: archivosSubidosCorrectamente }
    await timer(100).toPromise();
    this.sendData.emit(data)
    this.evaluateStepFour.emit();
  }
  deleteDocs(prestacion: string, indexNameFiles: number, nameFile: string) {
    let newFiles = [];
    for (let x of this.documentsDisplay[prestacion]['nameFiles'][indexNameFiles]['files']) {
      if (x.name != nameFile) newFiles.push(x);
    }
    this.documentsDisplay[prestacion]['nameFiles'][indexNameFiles]['files'] = newFiles;
    this.validateFileState(prestacion, indexNameFiles);
    this.emitirCambioArchivo();
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
}
