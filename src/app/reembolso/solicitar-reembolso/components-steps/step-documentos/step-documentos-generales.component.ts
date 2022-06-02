import { DataStorageService } from './../../../../shared/services/data-storage.service';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import '@vs-design-system/ds-file';
import { timer } from 'rxjs';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IFile } from 'src/app/shared/interfaces/interfaces';
import Utils from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-step-documentos-generales',
  templateUrl: './step-documentos-generales.component.html',
  styleUrls: ['./step-documentos-generales.component.scss']
})
export class StepDocumentosGeneralesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() montoReelbolso: any;
  @Input() stepperFourSource: any;
  @Input() customStepperSize: any;
  @Input() eliminarDocumentoAdicional: any;
  stepsStatusOn: any;
  isapreFonasaOptions: any = previsionesArray;
  idPrestacionSeleccionada: number = 1;

  fileUrl: any;
  mostrarPreview: boolean = false;

  handlerFunction = async (evt: any) => {
    const index = parseInt(evt.target.id.replace('documento', ''));
    let i: number = 0;
    let fileEvnts: IFile[] = [];
    let multi = false;
    while(i < evt.detail.length){
      let base64 : string = await Utils.transformarABase64(evt.detail[i])
      fileEvnts.push({
        file : evt.detail[i],
        base64 : base64.split(",")[1],
        extension : evt.detail[i].type.split("/")[1],
      })
      i++;
    }
    switch (this.idPrestacionSeleccionada) {
      case 1:
        multi = this.documentsDisplay.consultamedica.nameFiles[index]['multi'];
        multi ? this.documentsDisplay.consultamedica.nameFiles[index].files.push(...fileEvnts) : this.documentsDisplay.consultamedica.nameFiles[index].files = [fileEvnts[0]];
        this.validateFileState('consultamedica', index);
        this.emitirCambioArchivo()
        break;
      case 2:
        multi = this.documentsDisplay.hospitalario.nameFiles[index]['multi'];
        multi ? this.documentsDisplay.hospitalario.nameFiles[index].files.push(...fileEvnts) : this.documentsDisplay.hospitalario.nameFiles[index].files = [fileEvnts[0]];
        this.validateFileState('hospitalario', index);
        this.emitirCambioArchivo()
        break;
      case 3:
        multi = this.documentsDisplay.lentes.nameFiles[index]['multi'];
        multi ? this.documentsDisplay.lentes.nameFiles[index].files.push(...fileEvnts) : this.documentsDisplay.lentes.nameFiles[index].files = [fileEvnts[0]];
        this.validateFileState('lentes', index);
        this.emitirCambioArchivo()
        break;
      case 4:
        multi = this.documentsDisplay.dentales.nameFiles[index]['multi'];
        multi ? this.documentsDisplay.dentales.nameFiles[index].files.push(...fileEvnts) : this.documentsDisplay.dentales.nameFiles[index].files = [fileEvnts[0]];
        this.validateFileState('dentales', index);
        this.emitirCambioArchivo()
        break;
      case 5:
        multi = this.documentsDisplay.examenes.nameFiles[index]['multi'];
        multi ? this.documentsDisplay.examenes.nameFiles[index].files.push(...fileEvnts) : this.documentsDisplay.examenes.nameFiles[index].files = [fileEvnts[0]];
        this.validateFileState('examenes', index);
        this.emitirCambioArchivo()
        break;
      case 6:
        multi = this.documentsDisplay.medicamentos.nameFiles[index]['multi'];
        multi ? this.documentsDisplay.medicamentos.nameFiles[index].files.push(...fileEvnts) : this.documentsDisplay.medicamentos.nameFiles[index].files.push(fileEvnts[0])
        this.validateFileState('medicamentos', index);
        this.emitirCambioArchivo()
        break;
      default:
        break;
    }
    await timer(1000);
    (document.querySelector(`#${evt.target.id} > div > div > input`) as any).value = null;
    this.evaluateStepFour.emit()
  }



  @Output() sendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() evaluateStepFour: EventEmitter<any> = new EventEmitter<any>();

  public subtituloPrimerDocumento: string = '';
  public previewDocumentName: string = '';
  public nameDocSelectedPreview: string = '';


  public documentsDisplay: any;
  constructor(private dataStorageService: DataStorageService, private sanitizer: DomSanitizer, private arancelService: ArancelService) {
  }

  ngOnChanges(changes: SimpleChanges) { }
  ngOnInit(): void {
    this.dataStorageService.getFormReemboslo().subscribe(statusOn => {
      this.stepsStatusOn = statusOn;
      this.restoreDocs();
      this.documentsDisplay = statusOn.files.docsStructure;
    });
    if (this.stepsStatusOn['stepFour_general']['tipoDocumentoSeleccionado']) {
      switch (parseInt(this.stepsStatusOn['stepFour_general']['tipoDocumentoSeleccionado'])) {
        case 1:
          this.documentsDisplay.consultamedica.nameFiles[0].name = 'Documento de reembolso';
          this.subtituloPrimerDocumento = 'Documento de reembolso';
          break;
        case 2:
          this.documentsDisplay.consultamedica.nameFiles[0].name = 'Documento de Bono atencion';
          this.subtituloPrimerDocumento = 'Documento de Bono atencion';
          break;
        case 3:
          this.documentsDisplay.consultamedica.nameFiles[0].name = 'Documento de Boleta o Factura';
          this.subtituloPrimerDocumento = 'Documento de Boleta o Factura';
          break;

        default:
          break;
      }
    }
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.idPrestacionSeleccionada = id)
    this.addEventListener();
  }
  ngOnDestroy(): void {
    document.removeEventListener('dsFileSendFiles', this.handlerFunction)

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

    document.addEventListener('dsFileSendFiles', this.handlerFunction)
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
    this.dataStorageService.setFormReembolso('files', 'docsStructure', this.documentsDisplay);
    this.dataStorageService.setFormReembolso('files', 'firstDocName', this.subtituloPrimerDocumento);
    this.dataStorageService.setFormReembolso('stepFour_general', 'fileUploaded', archivosSubidosCorrectamente)
  }
  deleteDocs(prestacion: string, indexNameFiles: number, nameFile: string) {
    let files = this.documentsDisplay[prestacion]['nameFiles'][indexNameFiles]['files'].filter( (e : IFile) => e.file.name != nameFile);
    this.documentsDisplay[prestacion]['nameFiles'][indexNameFiles]['files'] = files;
    this.validateFileState(prestacion, indexNameFiles);
    this.emitirCambioArchivo();
  }
  vistaPreviaArchivo(event: any, docName: string) {
    this.previewDocumentName = docName;
    this.nameDocSelectedPreview = event.name;
    const extensionesDisponibles = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
    console.log(event);
    if (extensionesDisponibles.includes(event.type)) {
      const reader = new FileReader();
      reader.onload = () =>
        (this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string));

      reader.readAsDataURL(event);
      this.mostrarPreview = true;
    } else {
      console.log("Extencion no permitida para visualizar")
      console.log("extensione disponibles", extensionesDisponibles);
      alert('Visual no disponible por el tipo de extension');
    }
  }

  setStepsStatus(data: any) {
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
