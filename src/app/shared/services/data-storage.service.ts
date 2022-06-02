import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  //#######################################################################
  //################## Para Formulario de Reemboslo #######################
  //#######################################################################
  //#######################################################################

  /**
   * @description Behavior Subjet del formulario de reembolso
   */
  private reembolsoFormBehavior: BehaviorSubject<any>;
  /**
   * @description Observable para conocer el estado del formulario
   */
  public reembolsoForm$: Observable<any>;
  /**
   * @description formulario  para solicitar un reembolso, mantiene los valores de la  aplicacion en curso
   */
  public reembolsoForm: any;

  //#######################################################################
  //################## Para Beneficiario Seleccionado #####################
  //#######################################################################
  //#######################################################################

  /**
   * @description Behavior Subjet del beneficiario
   */
  public beneficiarioBehavior: BehaviorSubject<any>;
  /**
   * @description Observable para conocer el beneficiario
   */
  public beneficiario$: Observable<any>;
  /**
   * @description formulario  para solicitar un reembolso, mantiene los valores de la  aplicacion en curso
   */
  public beneficiario: any;



  //#######################################################################
  //############## Para Detalle de prestaciones tabla #####################
  //#######################################################################
  //#######################################################################

  /**
   * @description Behavior Subject del detalle de prestaciones cargadas para la solicitud de reembolso
   */
  public detallePrestacionesBehavior: BehaviorSubject<any>;
  /**
   * @description Observable de las prestaciones disponibles que han sido cargadas en el formulario de solicitar reembolso
   */
  public detallerPrestaciones$: Observable<any>;
  /**
   * @description Arreglo de las prestaciones que han sido cargadads en el detalle
   */
  public detallePrestaciones: any[];

  //#######################################################################
  //################## Para prestaciones en resumen #######################
  //#######################################################################
  //#######################################################################

  /**
   * @description Behavior Subject del detalle de prestaciones cargadas para la solicitud de reembolso
   */
  public prestacionesCargadasBehavior: BehaviorSubject<any>;
  /**
   * @description Observable de las prestaciones disponibles que han sido cargadas en el formulario de solicitar reembolso
   */
  public prestacionesCargadas$: Observable<any>;
  /**
   * @description Arreglo de las prestaciones que han sido cargadads en el detalle
   */
  public prestacionesCargadas: any[];

  //#######################################################################
  //################# Para id prestacion seleccionada #####################
  //#######################################################################
  //#######################################################################

  /**
   * @description Behavior Subject del detalle de prestaciones cargadas para la solicitud de reembolso
   */
  public idprestacionSeleccionadaBehavior: BehaviorSubject<any>;
  /**
   * @description Observable de las prestaciones disponibles que han sido cargadas en el formulario de solicitar reembolso
   */
  public idprestacionSeleccionada$: Observable<any>;
  /**
   * @description Arreglo de las prestaciones que han sido cargadads en el detalle
   */
  public idprestacionSeleccionada: number;

  public montoTotalSolicitadoSubject: Subject<any> = new Subject();
  public montoTotalSolicitado$ = this.montoTotalSolicitadoSubject.asObservable();

  public montoAndStuff: any;



  get getmontoAndStuff() {
    return this.montoAndStuff;
  }

  constructor() {
    this.beneficiarioBehavior = new BehaviorSubject('');
    this.beneficiario$ = this.beneficiarioBehavior.asObservable();
    this.beneficiario$.subscribe(e => {
      this.beneficiario = e;
    })

    // _____________________________________________________________
    // _______________ Para Formulario Reembolso ___________________
    // _____________________________________________________________
    this.reembolsoFormBehavior = new BehaviorSubject(formReembolso);
    this.reembolsoForm = formReembolso;
    this.reembolsoForm$ = this.reembolsoFormBehavior.asObservable();
    // _____________________________________________________________
    // ______________ Para carga de Prestaciones ___________________
    // _____________________________________________________________
    this.detallePrestacionesBehavior = new BehaviorSubject(prestaciones);
    this.detallerPrestaciones$ = this.detallePrestacionesBehavior.asObservable();
    this.detallePrestaciones = prestaciones;
    // _____________________________________________________________
    // _______________ Para resumen prestaciones ___________________
    // _____________________________________________________________
    this.prestacionesCargadasBehavior = new BehaviorSubject([]);
    this.prestacionesCargadas$ = this.prestacionesCargadasBehavior.asObservable();
    this.prestacionesCargadas = [];
    // _____________________________________________________________
    // ______________ Para íd prestacion seleccionada ______________
    // _____________________________________________________________
    this.idprestacionSeleccionadaBehavior = new BehaviorSubject(0)
    this.idprestacionSeleccionada$ = this.idprestacionSeleccionadaBehavior.asObservable();
    this.idprestacionSeleccionada = 0;
  }
  /**
   * @description setea un valor en el observable y formulario de reembolso
   * @param {string} step Paso del formuarlio en el cual setear valor
   * @param {string} option Nombre de la opcion en el formulario
   * @param {any} value Valor para ser seteado el formulario
   */
  setFormReembolso(step: string, option: string, value: any) {
    try {
      this.reembolsoForm[step][option] = value;
      this.reembolsoFormBehavior.next(this.reembolsoForm);
    } catch (error) {

    }
  }
  /**
   * @description retorna un observable del formulario de la aplciacion
   * @returns {Observable} reembolform$
   */
  getFormReemboslo() {
    return this.reembolsoForm$;
  }
  temptext = '';
  /**
   * @description retorna un arreglo de los archivos cargados en base64
   * @param namePrestacion
   */
  async getFilesFormReembolsoBase64(namePrestacion: string, index: number) {
    const prestaciones = ['consultamedica', 'hospitalario', 'lentes', 'dentales', 'examenes', 'medicamentos']
    let filesReume: any = [];
    for (const prestacion of prestaciones) {
      const files = this.reembolsoForm.files.docsStructure[prestacion].nameFiles;
      for (let archivo of files) {
        for (const file of archivo.files) {
          const reader = new FileReader();
          reader.onload = () => this.temptext = (reader.result as string)
          reader.readAsDataURL(file);
          const data = { prestacion: prestacion, name: file.name, base64: this.temptext };
          filesReume.push(data);
        }
      }
    }
    return filesReume;
  }

  /**
   * @description restura el formulario de reembolso a su estado original y actualiza  todos los componentes subscritos
   */


  resturarFormularioReembolso() {
    this.reembolsoForm = {
      stepOne_who: {
        personaSeleccionada: false,
      },
      stepTwo_selectOption: {
        prestacionSeleccionada: false,
        reembolsoPrevioIsapre: null,
      },
      stepThree_general: {
        agenciaSeleccionada: '',
        rutInstitucion: '',
        boletaFactura: '',
        fechaAtencion: '',
        copagoMayor: '',
        montoSolicitado: '',
      },
      stepFour_general: {
        tipoDocumentoSeleccionado: false,
        fileUploaded: false,
        agenciaSeleccionada: false,
      },
      stepFive_Details: {
        reembolsoCalculation: false,
      },
      files: {
        docsStructure: documentsDisplay,
        firstDocName: ''
      }
    };
    this.reembolsoFormBehavior.next(this.reembolsoForm);
  }

  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------


  /**
  * @description agrega una nueva prestacion al detalle de las prestaciones
  * @param prestacion prestacion recibida del modal de agregar detalle prestacion
  */
  agregarPrestacion(prestacion: any) {
    const id = this.detallePrestaciones.length;
    this.detallePrestaciones.push({ ...prestacion, id });
    this.detallePrestacionesBehavior.next(this.detallePrestaciones);
  }
  /**
   * @description retorna un observable de las prestaciones cargadas en el modal desde el servicio
   * @returns {array} Prestaciones
   */
  getPrestaciones() {
    return this.detallerPrestaciones$;
  }
  /**
   * @description restaura las prestaciones que han sido cargadas desde el boton agregar detalle prestacion y actualiza los subscritos con el valor por defecto
   */
  restaurarDetallePrestaciones() {
    this.detallePrestaciones = [];
    this.detallePrestacionesBehavior.next(this.detallePrestaciones);
  }
  /**
   * @description elimina la prestacion indicada segun el id correspondiente
   * @param id id de la prestacion cargada
   */
  deletePrestacion(id: number) {
    this.detallePrestaciones = this.detallePrestaciones.filter(e => e.id != id);
    this.detallePrestacionesBehavior.next(this.detallePrestaciones);

  }

  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------



  /**
   * @description agrega una nueva prestacion a las prestaciones del resumen
   * @param prestacion prestacion recibida una vez presionado el boton de siguiente en formulario de reembolso
   */
  agregarPrestacionResumen(prestacion: any) {
    const id = this.prestacionesCargadas.length;
    this.prestacionesCargadas.push({ ...prestacion, id });
    this.prestacionesCargadasBehavior.next(this.prestacionesCargadas);
  }
  /**
   * @description retorna un observable de las prestaciones cargadas para el resumen
   * @returns {array} Prestaciones
   */
  getPrestacionesResumen() {
    return this.prestacionesCargadas$;
  }
  /**
  * @description elimina el ultimo registro en el resumen de prestaciones
  */
  popPrestacionResume() {
    this.prestacionesCargadas.pop();
    console.log(this.prestacionesCargadas)
    this.prestacionesCargadasBehavior.next(this.prestacionesCargadas);
  }
  /**
   * @description restaura las prestaciones que estan ya disponibles en el resumen y actualiza los subscritos con el valor por defecto
   */
  restaurarPrestacionesResumen() {
    this.prestacionesCargadas = [];
    this.prestacionesCargadasBehavior.next(this.prestacionesCargadas);
  }


  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------

  /**
   * @description setea el id de la prestacion seleccionada en la card de detalle o en el resumen de reembolso
   * @param idPrestacion id de la prestacion seleccionada
   */
  setIdPrestacion(idPrestacion: number) {
    this.idprestacionSeleccionada = idPrestacion;
    this.idprestacionSeleccionadaBehavior.next(this.idprestacionSeleccionada);
  }
  /**
   * @description retorna un observable del id de la prestacion seleccionada
   * @returns {Number} idPrestacion
   */
  getIdPrestacionSeleccionada() {
    return this.idprestacionSeleccionada$;
  }
  /**
   * @description restaura el id seleccionado de la prestacion a 0
   */
  restaurarId() {
    this.idprestacionSeleccionada = 0;
  }

  /**
 * @description retorna un observable con el beneficiario seleccionado
 * @returns {array} Prestaciones
 */
  public get getBeneficiario() {
    return this.beneficiario;
  }

}


const prestaciones: any = [];

const resumePrestaciones: any = [];

const documentsDisplay: any = {
  consultamedica: {
    nameFiles: [{ name: '', files: [], multi: false, required: true, valid: false, esDiagnostico: false }, { name: 'Documento de diagnóstico', files: [], multi: true, required: true, valid: false, esDiagnostico: true }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true, esDiagnostico: false }],
    cols: 'col-span-4'
  },
  hospitalario: {
    nameFiles: [{ name: 'Documento Hospitalario', files: [], multi: true, required: true, valid: false }],
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
    nameFiles: [{ name: 'Documento Reembolso', files: [], multi: false, required: true, valid: false }, { name: 'Receta médica', files: [], multi: true, required: true, valid: false }, { name: 'Documento adicional', files: [], multi: true, required: false, valid: true }],
    cols: 'col-span-4'
  },
}

const formReembolso = {
  stepOne_who: {
    personaSeleccionada: false,
  },
  stepTwo_selectOption: {
    prestacionSeleccionada: false,
    reembolsoPrevioIsapre: null,
  },
  stepThree_general: {
    agenciaSeleccionada: '',
    rutInstitucion: '',
    boletaFactura: '',
    fechaAtencion: '',
    copagoMayor: '',
    montoSolicitado: '',
  },
  stepFour_general: {
    tipoDocumentoSeleccionado: false,
    fileUploaded: false,
    agenciaSeleccionada: false,
  },

  stepFive_Details: {
    reembolsoCalculation: false,
  },
  files: {
    docsStructure: documentsDisplay,
    firstDocName: ''
  }
};
