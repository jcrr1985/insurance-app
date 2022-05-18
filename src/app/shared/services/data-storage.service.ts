import { BehaviorSubject, Observable } from 'rxjs';
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
  //################## Para Detalle de prestaciones #######################
  //#######################################################################
  //#######################################################################

  /**
   * @description Behavior Subject del detalle de prestaciones cargadas para la solicitud de reembolso
   */
  private detallePrestacionesBehavior: BehaviorSubject<any>;
  /**
   * @description Observable de las prestaciones disponibles que han sido cargadas en el formulario de solicitar reembolso
   */
  private detallerPrestaciones$: Observable<any>;
  /**
   * @description Arreglo de las prestaciones que han sido cargadads en el detalle
   */
  private detallePrestaciones: any[];

  constructor() {
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
    this.reembolsoForm = formReembolso;
    this.reembolsoFormBehavior.next(formReembolso);
  }
  /**
   * @description agrega una nueva prestacion al detalle de las prestaciones
   * @param prestacion prestacion recibida del modal de agregar detalle prestacion
   */
  agregarPrestacion(prestacion: any) {
    this.detallePrestaciones.push(prestacion);
    this.detallePrestacionesBehavior.next(this.detallePrestaciones);
  }
  /**
   * @description retorna las prestaciones cargadas en el modal desde el servicio
   * @returns {array} Prestaciones
   */
  getPrestaciones() {
    return this.detallePrestaciones;
  }
  /**
   * @description restaura las prestaciones y actualiza los subscritos con el valor por defecto
   */
  restaurarDetallePrestaciones() {
    this.detallePrestaciones = prestaciones;
    this.detallePrestacionesBehavior.next(this.detallePrestaciones);
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