import { DataStorageService } from './../../../../shared/services/data-storage.service';
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
  @Input() eliminarDocumentoAdicional: any;
  stepsStatusOn: any;
  isapreFonasaOptions: any = previsionesArray;
  idPrestacionSeleccionada: number = 1;


  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() evaluateStepFour: EventEmitter<any> = new EventEmitter<any>();

  public subtituloPrimerDocumento: string = '';
  public documentsDisplay: any = {
    consultamedica: {
      nameFiles: [{ name: `${this.subtituloPrimerDocumento}`, files: [], multi: false, required: true, valid: false, esDiagnostico: false }, { name: 'Documento de diagnóstico', files: [], multi: true, required: true, valid: false, esDiagnostico: true }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true, esDiagnostico: false }],
      cols: 'col-span-4'
    },
    hospitalario: {
      nameFiles: [{ name: 'Documento Hospitalario', files: [], multi: false, required: true, valid: false }],
      filesUploades: [[], [], []],
      cols: 'col-span-12',
    },
    lentes: {
      nameFiles: [{ name: 'Documento Reembolso', files: [], multi: false, required: true, valid: false }, { name: 'Receta Óptica', files: [], multi: true, required: true, valid: false }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true }],
      cols: 'col-span-4'
    },
    dentales: {
      nameFiles: [{ name: 'Documento Reembolso', files: [], multi: false, required: true, valid: false }, { name: 'Formulario Dental', files: [], multi: true, required: true, valid: false }, { name: 'Presupuesto Dental', files: [], multi: true, required: true, valid: false }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true }],
      cols: 'col-span-3'
    },
    examenes: {
      nameFiles: [{ name: 'Documento Reembolso', files: [], multi: false, required: true, valid: false }, { name: 'Documento de diagnóstico', files: [], multi: true, required: true, valid: false }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true }],
      cols: 'col-span-4'
    },
    medicamentos: {
      nameFiles: [{ name: 'Documento Reembolso', files: [], multi: false, required: true, valid: false }, { name: 'Documento de diagnóstico', files: [], multi: true, required: true, valid: false }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true }],
      cols: 'col-span-4'
    },
  }
  constructor(private dataStorageService: DataStorageService, private arancelService: ArancelService) {
  }

  ngOnChanges(changes: SimpleChanges) { }
  filesUploaded: any = [];
  ngOnInit(): void {
    this.dataStorageService.getFormReemboslo().subscribe(statusOn => this.stepsStatusOn = statusOn);
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.idPrestacionSeleccionada = id)
    this.addEventListener();
    this.restoreDocs();
  }

  restoreDocs() {
    this.documentsDisplay = {
      consultamedica: {
        nameFiles: [{ name: `${this.subtituloPrimerDocumento}`, files: [], multi: false, required: true, valid: false, esDiagnostico: false }, { name: 'Documento de diagnóstico', files: [], multi: true, required: true, valid: false, esDiagnostico: true }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true, esDiagnostico: false }],
        cols: 'col-span-4'
      },
      hospitalario: {
        nameFiles: [{ name: 'Documento Hospitalario', files: [], multi: false, required: true, valid: false }],
        filesUploades: [[], [], []],
        cols: 'col-span-12',
      },
      lentes: {
        nameFiles: [{ name: 'Documento Reembolso', files: [], multi: false, required: true, valid: false }, { name: 'Receta Óptica', files: [], multi: true, required: true, valid: false }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true }],
        cols: 'col-span-4'
      },
      dentales: {
        nameFiles: [{ name: 'Documento Reembolso', files: [], multi: false, required: true, valid: false }, { name: 'Formulario Dental', files: [], multi: true, required: true, valid: false }, { name: 'Presupuesto Dental', files: [], multi: true, required: true, valid: false }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true }],
        cols: 'col-span-3'
      },
      examenes: {
        nameFiles: [{ name: 'Documento Reembolso', files: [], multi: false, required: true, valid: false }, { name: 'Documento de diagnóstico', files: [], multi: true, required: true, valid: false }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true }],
        cols: 'col-span-4'
      },
      medicamentos: {
        nameFiles: [{ name: 'Documento Reembolso', files: [], multi: false, required: true, valid: false }, { name: 'Documento de diagnóstico', files: [], multi: true, required: true, valid: false }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true }],
        cols: 'col-span-4'
      },
    }
  }

  addEventListener() {
    document.addEventListener('dsFileSendFiles', async (evt: any) => {
      const index = parseInt(evt.target.id.replace('documento', ''));
      let fileEvnt = [];
      let multi = false;
      switch (this.idPrestacionSeleccionada) {
        case 1:
          fileEvnt = [...evt.detail];
          multi = this.documentsDisplay.consultamedica.nameFiles[index]['multi'];
          multi ? this.documentsDisplay.consultamedica.nameFiles[index].files.push(...fileEvnt) : this.documentsDisplay.consultamedica.nameFiles[index].files = fileEvnt
          this.validateFileState('consultamedica', index);
          this.emitirCambioArchivo()
          break;
        case 2:
          fileEvnt = [...evt.detail];
          multi = this.documentsDisplay.hospitalario.nameFiles[index]['multi'];
          multi ? this.documentsDisplay.hospitalario.nameFiles[index].files.push(...fileEvnt) : this.documentsDisplay.hospitalario.nameFiles[index].files = fileEvnt;
          this.validateFileState('hospitalario', index);
          this.emitirCambioArchivo()
          break;
        case 3:
          fileEvnt = [...evt.detail];
          multi = this.documentsDisplay.lentes.nameFiles[index]['multi'];
          multi ? this.documentsDisplay.lentes.nameFiles[index].files.push(...fileEvnt) : this.documentsDisplay.lentes.nameFiles[index].files = fileEvnt
          this.validateFileState('lentes', index);
          this.emitirCambioArchivo()
          break;
        case 4:
          fileEvnt = [...evt.detail];
          multi = this.documentsDisplay.dentales.nameFiles[index]['multi'];
          multi ? this.documentsDisplay.dentales.nameFiles[index].files.push(...fileEvnt) : this.documentsDisplay.dentales.nameFiles[index].files = fileEvnt;
          this.validateFileState('dentales', index);
          this.emitirCambioArchivo()
          break;
        case 5:
          fileEvnt = [...evt.detail];
          multi = this.documentsDisplay.examenes.nameFiles[index]['multi'];
          multi ? this.documentsDisplay.examenes.nameFiles[index].files.push(...fileEvnt) : this.documentsDisplay.examenes.nameFiles[index].files = fileEvnt;
          this.validateFileState('examenes', index);
          this.emitirCambioArchivo()
          break;
        case 6:
          fileEvnt = [...evt.detail];
          multi = this.documentsDisplay.medicamentos.nameFiles[index]['multi'];
          multi ? this.documentsDisplay.medicamentos.nameFiles[index].files.push(...fileEvnt) : this.documentsDisplay.medicamentos.nameFiles[index].files = fileEvnt;
          this.validateFileState('medicamentos', index);
          this.emitirCambioArchivo()
          break;

        default:
          break;
      }
      await timer(1000);
      (document.querySelector(`#${evt.target.id} > div > div > input`) as any).value = null;
      this.evaluateStepFour.emit()
    })
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
    await timer(100).toPromise();
    this.dataStorageService.setFormReembolso('stepFour_general', 'fileUploaded', archivosSubidosCorrectamente)
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
    // this.sendData.emit(data)
    // this.evaluateStepFour.emit();
    this.dataStorageService.setFormReembolso(data.step, data.option, data.value);

    switch (data.value) {

      case 1:
        this.documentsDisplay.consultamedica.nameFiles[0].name = 'Documento de reembolso';
        break;
      case 2:
        this.documentsDisplay.consultamedica.nameFiles[0].name = 'Documento de Bono atencion';
        break;
      case 3:
        this.documentsDisplay.consultamedica.nameFiles[0].name = 'Documento de Boleta o Factura';
        break;

      default:
        break;
    }
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

const previsionesArray = [
  { key: 'Fonasa', value: 1, selected: false },
  { key: 'Colmena', value: 2, selected: false },
  { key: 'Consalud', value: 3, selected: false },
  { key: 'Cruz Blanca', value: 4, selected: false },
  { key: 'Banmédica', value: 5, selected: false },
  { key: 'Masvida', value: 6, selected: false },
  { key: 'Vida', value: 7, selected: false },

];
