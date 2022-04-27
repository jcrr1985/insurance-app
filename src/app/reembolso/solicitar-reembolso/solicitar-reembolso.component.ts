import { Component, OnDestroy, OnInit } from '@angular/core';
import '@vs-design-system/ds-input';
import '@vs-design-system/ds-datepicker';
import '@vs-design-system/ds-select';
import '@vs-design-system/ds-stepper';
import '@vs-design-system/ds-radio';
import '@vs-design-system/ds-title';
import '@vs-design-system/ds-messaging';
import '@vs-design-system/ds-tooltip';
import '@vs-design-system/ds-button';
import '@vs-design-system/ds-file';

import { Chip, CustomStepperSize, FilesUploaded, } from '../../shared/interfaces/interfaces';
import { ReembolsoService } from '../../shared/services/reembolso.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-solicitar-reembolso',
  templateUrl: './solicitar-reembolso.component.html',
  styleUrls: ['./solicitar-reembolso.component.scss']
})
export class SolicitarReembolsoComponent implements OnInit, OnDestroy {
  public paragraphEnabled: string = '#EF6F00';
  public paragraphDisabled: string = '#43505E';
  public formReembolso!: FormGroup;

  public chipsData: Chip[];

  public stepperOneSource = () => [{ label: '', status: 'active' }];
  public stepperTwoSource = () => [{ label: '', status: 'waiting' }];
  public stepperThreeSource = () => [{ label: '', status: 'waiting' }];
  public stepperFourSource = () => [{ label: '', status: 'waiting' }];
  public stepperFiveSource = () => [{ label: '', status: 'waiting' }];

  public personSelectOption = beneficiariosArray;
  public isapreFonasaOptions = previsionesArray;

  public filesUploaded: FilesUploaded[] = [];
  public montoReelbolso: number = 0;

  public customStepperSize: CustomStepperSize = {
    stepperOne: '104px',
    stepperTwo: '104px',
    stepperThree: '104px',
    stepperFour: '104px',
    stepperFive: '104px',
  };

  public stepsStatusOn: any = {
    stepOne_who: {
      personaSeleccionada: false,
    },
    stepTwo_selectOption: {
      prestacionSeleccionada: false,
      reembolsoPrevioIsapre: null
    },
    stepThree_general: {
      /* tipoDocumentoSeleccionado: null,
      fileUploaded: false,
      agenciaSeleccionada: false, */
      rutInstitucion: false,
      boletaFactura: false,
      fechaAtencion: false,
      valorPrestacion: false,
      bonificacionTotal: false,
      copagoMayor: null
    },
    stepFour_general: {
      tipoDocumentoSeleccionado: null,
      fileUploaded: false,
      agenciaSeleccionada: false,
    },

    stepFive_Details: {
      reembolsoCalculation: false,
    },
  };

  private nuevaPrestacionData!: string[];
  public totalHistorico!: number;
  public isModalActive: boolean = true;
  public modalSolicitudCompletada: boolean = false;
  public modalRegistrarMedicamento: boolean = false;

  constructor(private reembolsoService: ReembolsoService, private router: Router) {
    this.chipsData = this.reembolsoService.getChipsData();
    this.createForm();
  }
  ngOnDestroy(): void {
    if (window && window.removeAllListeners) {
      window.removeAllListeners();
    }
  }

  ngOnInit(): void {
    this.subscribeChangesOnInput();
    this.addAccessKey();
  }

  /**
   * @description observa los eventos generados por el DS para setear los valores al form
   */
  subscribeChangesOnInput() {
    window.addEventListener('onchangeSelect', (event: any) => {
      if (event.target.id == 'personaSeleccionada') {
        const idPersonSelected = event.detail[0].value;
        this.setStepsStatus(
          {
            step: 'stepOne_who',
            option: 'personaSeleccionada',
            value: idPersonSelected
          }
        );
        this.evaluateStepOne();
      }
      if (event.target.id == 'isapreFonasaSelect') {
        console.log('event', event);
        let idAgencia;
        if (event.detail[0]?.value) {
          idAgencia = event.detail[0]?.value;
          this.setStepsStatus(
            {
              step: 'stepThree_general',
              option: 'agenciaSeleccionada',
              value: idAgencia
            }
          );
        }
      }
    });
    window.addEventListener('oninput', (event: any) => {
      if (event.target.id == 'rutInstitucion') {
        const value = event.detail;
        this.setStepsStatus({ step: 'stepThree_general', option: 'rutInstitucion', value });
      }
      if (event.target.id == 'boletaFactura') {
        const value = event.detail;
        this.setStepsStatus({ step: 'stepThree_general', option: 'boletaFactura', value });
      }
      /*   if (event.target.id == 'valorPrestacion') {
          const value = event.detail;
          this.setStepsStatus({ step: 'stepThree_general', option: 'valorPrestacion', value });
          this.calcMontoReembolsar();
        } */
      /*  if (event.target.id == 'bonificacionTotal') {
         const value = event.detail;
         this.setStepsStatus({ step: 'stepThree_general', option: 'bonificacionTotal', value });
         this.calcMontoReembolsar();
         this.stepperThreeSource = () => [{ label: '', status: 'completed' }];
         this.stepperFourSource = () => [{ label: '', status: 'waiting' }];
       } */
    });
    window.addEventListener('onSelectDate', (event: any) => {
      if (event.target.innerText == 'Fecha de atención') {
        const value = event.detail.init;
        this.setStepsStatus({ step: 'stepThree_general', option: 'fechaAtencion', value });
      }
    });
  }
  /**
   * @description construye el formulario para guardar los valores
   */
  createForm() {
    this.formReembolso = new FormGroup({
      personaSeleccionada: new FormControl(''),
      prestacionSeleccionada: new FormControl(''),
      reembolsoPrevioIsapre: new FormControl(''),
      tipoDocumentoSeleccionado: new FormControl(''),
      agenciaSeleccionada: new FormControl(''),
      rutInstitucion: new FormControl(''),
      boletaFactura: new FormControl(''),
      fechaAtencion: new FormControl(''),
      valorPrestacion: new FormControl(0),
      bonificacionTotal: new FormControl(0),
    });
  }
  /**
   *
   * @param formControlName nombre del formControlName en el formulario
   * @param value valor para ser asignado
   * @description setea un valor dentro del formulario
   */
  setForm(formControlName: string, value: any) {
    try {
      this.formReembolso.get(formControlName)?.patchValue(value);
    } catch (error) {
      console.log('error setting form', formControlName);
    }
  }
  /**
   *
   * @param formControlName nombre del formControlName en el formulario
   * @returns {any} pathValue - Valor del formControl en el formulario
   * @description retorna el valor del campo seleccionado dentro del formulario
   */
  getForm(formControlName: string) {
    try {
      return this.formReembolso.get(formControlName)?.value;
    } catch (error) {
      console.log('formControlName has no value yet', formControlName);
      return null;
    }
  }
  /**
   *
   * @param step property
   * @param option property
   * @param value property
   * @description setea el valor para el archivo de configuracion stepsStatusOn
   */
  setStepsStatus(data: any) {
    const { step, option, value } = data;
    this.stepsStatusOn[step][option] = value;
    this.setForm(option, value);
    this.getSizeStepper();
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

  /**
   * @description Evalua los requisitos necesarios para el progress del 1er paso - ¿Quien se Atendió?
   */
  evaluateStepOne() {
    const status = this.stepsStatusOn.stepOne_who.personaSeleccionada
      ? 'completed'
      : 'waiting';
    this.stepperOneSource = () => [{ label: '', status }];
    this.stepperTwoSource = () => [{ label: '', status: 'active' }];
  }
  /**
   * @description Evalua los requisitos necesarios para el progress del 2do paso - Selecciona tu prestacion
   */
  evaluateStepTwo() {
    const status = this.stepsStatusOn.stepTwo_selectOption
      .prestacionSeleccionada && this.stepsStatusOn.stepTwo_selectOption.reembolsoPrevioIsapre
      ? 'completed'
      : 'waiting';

    if (status == "completed") this.stepperTwoSource = () => [{ label: '', status }];
    if (status == "completed") this.stepperThreeSource = () => [{ label: '', status: 'active' }];
  }
  /**
   * @description Evalúa los requisitos necesarios para el progress del 3er paso - Datos Generales
   */
  evaluateStepThird() {

    const statusrutInstitucion = this.stepsStatusOn.stepThree_general
      .rutInstitucion
      ? 'completed'
      : 'waiting';
    const statusboletaFactura = this.stepsStatusOn.stepThree_general
      .boletaFactura
      ? 'completed'
      : 'waiting';

    const statusFechaAtencion = this.stepsStatusOn.stepThree_general
      .fechaAtencion
      ? 'completed'
      : 'waiting';

    const statusValorPrestacion = this.stepsStatusOn.stepThree_general
      .valorPrestacion
      ? 'completed'
      : 'waiting';

    const statusBonificacion = this.stepsStatusOn.stepThree_general
      .bonificacionTotal
      ? 'completed'
      : 'waiting';
    const statusCopago = this.stepsStatusOn.stepThree_general
      .copagoMayor
      ? 'completed'
      : 'waiting';


    let status: string;
    if (
      statusrutInstitucion == 'completed' &&
      statusboletaFactura == 'completed' &&
      statusFechaAtencion == 'completed' &&
      // statusValorPrestacion == 'completed' &&
      //statusBonificacion == 'completed' &&
      statusCopago == 'completed'
    ) {
      status = 'completed';
    } else {
      status = 'waiting';
      console.log(
        'status inputs "faltan llenar datos en el 3rd step >_<',
        status
      );
    }
    this.stepperThreeSource = () => [{ label: '', status }];
    /*  this.formReembolso.valueChanges.subscribe((val) => {
       console.log('val changed', val);
       //if (status == 'completed') this.stepperThreeSource = () => [{ label: '', status }];
     }); */
  }
  /**
 * @description Evalúa los requisitos necesarios para el progress del 4to paso - sube Documentos
 */
  evaluateStepFour() {
    const statusfileUploaded = this.stepsStatusOn.stepFour_general.fileUploaded
      ? 'completed'
      : 'waiting';

    let status: string;

    if (
      statusfileUploaded == 'completed') {
      status = 'completed';
    } else {
      status = 'waiting';
    }
    this.stepperFourSource = () => [{ label: '', status }];
    this.stepperFiveSource = () => [{ label: '', status }];
    /* 
        this.formReembolso.valueChanges.subscribe((val) => {
          console.log('val changed', val);
          this.stepperFourSource = () => [{ label: '', status }];
        }); */
  }
  evaluateStepFive() { }
  /**
   * @description calcula el monto total disponible para reembolsar
   */
  calcMontoReembolsar() {
    const valor_1 = parseFloat(this.getForm('valorPrestacion'));
    const valor_2 = parseFloat(this.getForm('bonificacionTotal'));
    this.montoReelbolso = valor_1 - valor_2;
  }

  getSizeStepper() {
    setTimeout(() => {
      const one = <any>(
        document.getElementById('stepperOneContent')?.offsetHeight
      );
      const two = <any>(
        document.getElementById('stepperTwoContent')?.offsetHeight
      );
      const three = <any>(
        document.getElementById('stepperThreeContent')?.offsetHeight
      );
      const four = <any>(
        document.getElementById('stepperFourContent')?.offsetHeight
      );
      const five = <any>(
        document.getElementById('stepperFiveContent')?.offsetHeight
      );
      this.customStepperSize.stepperOne = one - 40 + 'px';
      this.customStepperSize.stepperTwo =
        two <= 110 ? two + 'px' : two - 35 + 'px';
      this.customStepperSize.stepperThree =
        three <= 110 ? three + 'px' : three - 35 + 'px';
      this.customStepperSize.stepperFour =
        four <= 110 ? four + 'px' : four - 35 + 'px';
      this.customStepperSize.stepperFive =
        five <= 110 ? five + 'px' : five - 35 + 'px';
    }, 10);
  }

  /* Modal Agregar detalle adicional */
  showAddMoreDetailModal() {
    this.isModalActive = true;
  }
  hideAddMoreDetailModal(ev: boolean) {
    this.isModalActive = false;
  }
  /* Modal solicitud compleatada */
  showModalSolicitudCompletada() {
    this.modalSolicitudCompletada = true;
  }
  hiddenModalSolicitudCompeltada() {
    this.modalSolicitudCompletada = false;
  }
  /* Modal registra medicamento */
  showModalRegistrarMedicamento() {
    this.modalRegistrarMedicamento = true;
  }
  hiddenModalRegistrarMedicamento() {
    this.modalRegistrarMedicamento = false;
  }


  /**
  * @description una funcion temporal para acceder a un apartado de pruebas
  */
  addAccessKey() {
    window.addEventListener('keydown', event => {
      if (event.ctrlKey && event.code == 'KeyQ') this.router.navigate(['/testing']);
    })
  }
}

const beneficiariosArray = [
  { label: 'Seleccione', value: 0, selected: false },
  { label: 'Alejandro Salgado', value: 1, selected: false },
  { label: 'Maria Salgado', value: 2, selected: false },
  { label: 'Camilo Salgado', value: 3, selected: false },
];
const previsionesArray = [
  { label: 'Seleccione', value: 0, selected: false },
  { label: 'Colmena', value: 1, selected: false },
  { label: 'Consalud', value: 2, selected: false },
  { label: 'Cruz Blanca', value: 3, selected: false },
];
