import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
  private reembolsoForm$: Observable<any>;
  /**
   * @description formulario  para solicitar un reembolso, mantiene los valores de la  aplicacion en curso
   */
  private reembolsoForm: any;

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
  private prestacionesCargadasBehavior: BehaviorSubject<any>;
  /**
   * @description Observable de las prestaciones disponibles que han sido cargadas en el formulario de solicitar reembolso
   */
  private prestacionesCargadas$: Observable<any>;
  /**
   * @description Arreglo de las prestaciones que han sido cargadads en el detalle
   */
  private prestacionesCargadas: any[];

  //#######################################################################
  //################# Para id prestacion seleccionada #####################
  //#######################################################################
  //#######################################################################

  /**
   * @description Behavior Subject del detalle de prestaciones cargadas para la solicitud de reembolso
   */
  private idprestacionSeleccionadaBehavior: BehaviorSubject<any>;
  /**
   * @description Observable de las prestaciones disponibles que han sido cargadas en el formulario de solicitar reembolso
   */
  private idprestacionSeleccionada$: Observable<any>;
  /**
   * @description Arreglo de las prestaciones que han sido cargadads en el detalle
   */
  private idprestacionSeleccionada: number;

  public montoTotalSolicitadoSubject: Subject<any> = new Subject();
  public montoTotalSolicitado$ = this.montoTotalSolicitadoSubject.asObservable();

  public montoAndStuff: any;

  setmontoAndStuff() {
    this.montoTotalSolicitado$.subscribe(montoAndStuff => {
      console.log('dentro de setMontoAndStuff en el servicio')
      this.montoAndStuff = montoAndStuff
      console.log('this.montoAndStuff', this.montoAndStuff)
    })
  }

  get getmontoAndStuff() {
    return this.montoAndStuff;
  }
  
  constructor() {
    this.setmontoAndStuff();

    this.beneficiarioBehavior = new BehaviorSubject('');
    this.beneficiario$ = this.beneficiarioBehavior.asObservable();
    this.beneficiario$.subscribe( e => {
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
        agenciaSeleccionada: false,
        rutInstitucion: false,
        boletaFactura: false,
        fechaAtencion: false,
        copagoMayor: null,
        montoSolicitado: false,
      },
      stepFour_general: {
        tipoDocumentoSeleccionado: false,
        fileUploaded: false,
        agenciaSeleccionada: false,
      },

      stepFive_Details: {
        reembolsoCalculation: false,
      },
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


const formReembolso = {
  stepOne_who: {
    personaSeleccionada: false,
  },
  stepTwo_selectOption: {
    prestacionSeleccionada: false,
    reembolsoPrevioIsapre: null,
  },
  stepThree_general: {
    agenciaSeleccionada: false,
    rutInstitucion: false,
    boletaFactura: false,
    fechaAtencion: false,
    copagoMayor: null,
    montoSolicitado: false,
  },
  stepFour_general: {
    tipoDocumentoSeleccionado: false,
    fileUploaded: false,
    agenciaSeleccionada: false,
  },

  stepFive_Details: {
    reembolsoCalculation: false,
  },
};

const prestaciones: any = [];

const resumePrestaciones: any = [];
