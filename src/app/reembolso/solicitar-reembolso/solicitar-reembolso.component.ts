import { DataStorageService } from './../../shared/services/data-storage.service';
import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
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

import {
  Chip,
  CustomStepperSize,
  FilesUploaded,
} from '../../shared/interfaces/interfaces';
import { ReembolsoService } from '../../shared/services/reembolso.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IstepsStatusOn } from 'src/app/shared/interfaces/IStepsStatusOn';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-solicitar-reembolso',
  templateUrl: './solicitar-reembolso.component.html',
  styleUrls: ['./solicitar-reembolso.component.scss'],
})
export class SolicitarReembolsoComponent implements OnInit, OnDestroy, AfterContentChecked {
  public formReembolso!: FormGroup;
  public chipsData: Chip[];

  public stepperOneSource = () => [{ label: '', status: 'active' }];
  public stepperTwoSource = () => [{ label: '', status: 'waiting' }];
  public stepperThreeSource = () => [{ label: '', status: 'waiting' }];
  public stepperFourSource = () => [{ label: '', status: 'waiting' }];
  public stepperFiveSource = () => [{ label: '', status: 'waiting' }];

  public filesUploaded: FilesUploaded[] = [];
  public montoReelbolso: number = 0;
  public prestacionSeleccionada: any = null;
  public habilitarBotones: boolean = false;

  public historicoSesiones = [
    { prestacion: "consulta psicologica", valor: 50000 },
    { prestacion: "consulta psiquiatrica", valor: 60000 }
  ]


  public customStepperSize: CustomStepperSize = {
    stepperOne: '104px',
    stepperTwo: '104px',
    stepperThree: '104px',
    stepperFour: '104px',
    stepperFive: '104px',
  };

  public stepsStatusOn: any;

  private nuevaPrestacionData!: string[];
  public totalHistorico!: number;
  public isModalActive: boolean = true;
  public modalSolicitudCompletada: boolean = false;
  public modalRegistrarMedicamento: boolean = false;
  public habilitarSeleccionBeneficiario!: boolean;
  public eliminarDocumentoAdicional!: string;
  public prestacionesCargadas: any;
  public formularioActual: any;

  constructor(
    private dataStorageService: DataStorageService,
    private reembolsoService: ReembolsoService,
    private router: Router,
    private arancelService: ArancelService,
    private cdref: ChangeDetectorRef
  ) {
    this.chipsData = this.reembolsoService.getChipsData();
    this.createForm();
  }
  ngOnDestroy(): void {
    if (window && (window as any).removeAllListeners) {
      (window as any).removeAllListeners();
    }
  }

  ngOnInit(): void {
    this.subscribeChangesOnInput();
    this.subscripcionDatos();
    this.addAccessKey();
    this.getSizeStepper();
    this.validarPaso1Required();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  /**
   * @description se subscribe a los observables correspondientes y necesarios para el correcto funcionamiento
   */
  subscripcionDatos() {
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.prestacionSeleccionada = id)
    this.reembolsoService.habilitarSeleccionBeneficiario$.subscribe(val => {
      this.habilitarSeleccionBeneficiario = val;
    })
  }
  /**
   * @description valida que el paso 1 sea inputado  o no
   */
  validarPaso1Required() {
    const habilitar = this.reembolsoService.habilitarPaso1;
    if (!habilitar) {
      this.setStepsStatus({ step: 'stepOne_who', option: 'personaSeleccionada', value: true });
      this.prestacionSeleccionada = this.reembolsoService.idprestacion;
    };
  }

  /**
   * @description observa los eventos generados por el DS para setear los valores al form
   */
  subscribeChangesOnInput() {
    this.dataStorageService.getFormReemboslo().subscribe(statusOn => {
      this.stepsStatusOn = statusOn;
      console.log("en el formulario ->", statusOn);
      this.evaluateStepOne();
      this.evaluateStepTwo();
      this.evaluateStepThree();
      this.evaluateStepFour();
      this.evaluateStepFive();
    })

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
    });
  }
  botonCancelar() {
    this.dataStorageService.restaurarDetallePrestaciones();
    this.dataStorageService.resturarFormularioReembolso();
    this.dataStorageService.restaurarId();
    this.dataStorageService.restaurarPrestacionesResumen();
    this.router.navigate(['/']);
  }
  botonSiguiente() {
    this.dataStorageService.getPrestaciones().subscribe(prestaciones => this.prestacionesCargadas = prestaciones);
    this.dataStorageService.getFormReemboslo().subscribe(form => this.formularioActual = form);
    this.dataStorageService.agregarPrestacionResumen({ prestaciones: this.prestacionesCargadas, idprestacionSeleccionada: this.prestacionSeleccionada, formValues: this.formularioActual });
    this.dataStorageService.restaurarDetallePrestaciones();
    this.router.navigate(['/resumen']);
  }
  public formatter = new Intl.NumberFormat('es-CL');

  /**
   *
   * @param formControlName nombre del formControlName en el formulario
   * @param value valor para ser asignado
   * @description setea un valor dentro del formulario
   */
  setForm(formControlName: string, value: any) {
    console.log('setForm: ', this.setForm)
    try {
      this.formReembolso.get(formControlName)?.patchValue(this.formatter.format(value));
    } catch (error) {
      console.log('error setting field', formControlName);
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
    if (status == 'completed') this.stepperTwoSource = () => [{ label: '', status: 'active' }];
    this.getSizeStepper();
  }
  /**
   * @description Evalua los requisitos necesarios para el progressF del 2do paso - Selecciona tu prestacion
   */
  evaluateStepTwo() {
    const status =
      this.stepsStatusOn.stepTwo_selectOption.prestacionSeleccionada &&
        this.stepsStatusOn.stepTwo_selectOption.reembolsoPrevioIsapre
        ? 'completed'
        : 'waiting';

    if (status == 'completed') {
      this.stepperTwoSource = () => [{ label: '', status }];
      this.stepperThreeSource = () => [{ label: '', status: 'active' }];
      let stepThreeStatus = this.stepperThreeSource()[0].status
    }
  }
  /**
   * @description Evalúa los requisitos necesarios para el progress del 3er paso - Datos Generales
   */
  evaluateStepThree() {

    const agenciaSeleccionada = this.stepsStatusOn.stepThree_general
      .agenciaSeleccionada
      ? 'completed'
      : 'waiting';

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

    const statusCopago = this.stepsStatusOn.stepThree_general.copagoMayor
      ? 'completed'
      : 'waiting';

    const statusMontoSolicitado = this.stepsStatusOn.stepThree_general.montoSolicitado
      ? 'completed'
      : 'waiting';

    let status: string;

    if (this.prestacionSeleccionada != 2) {
      if (agenciaSeleccionada == 'completed' && statusrutInstitucion == 'completed' && statusboletaFactura == 'completed' && statusFechaAtencion == 'completed' && statusCopago == 'completed') {
        status = 'completed';
        this.stepperThreeSource = () => [{ label: '', status }];
        if (status == 'completed') this.stepperFourSource = () => [{ label: '', status: 'active' }];
      }
    } else {
      if (statusMontoSolicitado == 'completed') {
        status = 'completed';
        this.stepperThreeSource = () => [{ label: '', status: status }];
        if (status == 'completed') this.stepperFourSource = () => [{ label: '', status: 'active' }];
      }
    }



  }
  /**
   * @description Evalúa los requisitos necesarios para el progress del 4to paso - sube Documentos
   */
  evaluateStepFour() {
    const statusfileUploaded = (this.stepsStatusOn.stepFour_general.fileUploaded && this.stepsStatusOn.stepFour_general.tipoDocumentoSeleccionado) || (this.prestacionSeleccionada == 2 && this.stepsStatusOn.stepFour_general.fileUploaded)
      ? 'completed'
      : 'active';

    if (statusfileUploaded == 'completed') this.stepperFourSource = () => [{ label: '', status: statusfileUploaded }];
    this.stepperFiveSource = () => [{ label: '', status: statusfileUploaded == 'completed' ? 'active' : 'waiting' }];
    this.getSizeStepper();

    // verificando activacion de botones

    this.validarActivacionBotonesSiguiente();
  }
  evaluateStepFive() {
    const statusfileUploaded = (this.stepsStatusOn.stepFour_general.fileUploaded && this.stepsStatusOn.stepFour_general.tipoDocumentoSeleccionado) || (this.prestacionSeleccionada == 2 && this.stepsStatusOn.stepFour_general.fileUploaded)
    if (statusfileUploaded) {
      this.dataStorageService.getPrestaciones().subscribe(prestaciones => {
        this.stepperFiveSource = () => [{ label: '', status: statusfileUploaded && prestaciones.length ? 'completed' : 'active' }];
      })
      // validando habilitar botones
      this.validarActivacionBotonesSiguiente();
    }
    this.getSizeStepper();

  }

  validarActivacionBotonesSiguiente() {
    if (this.prestacionSeleccionada == 2 && this.stepsStatusOn.stepFour_general.fileUploaded) {
      this.habilitarBotones = true;
    }
    else {
      this.dataStorageService.getPrestaciones().subscribe(prestaciones => {
        prestaciones.length ? this.habilitarBotones = true : this.habilitarBotones = false;
      })
    }
  }

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
      this.customStepperSize.stepperOne = one + 5 + 'px';

      this.customStepperSize.stepperTwo =
        two <= 110 ? two + 'px' : two - 40 + 'px';

      this.customStepperSize.stepperThree =
        three <= 110 ? three + 50 + 'px' : three - 35 + 'px';
      this.customStepperSize.stepperFour =
        four <= 110 ? four + 50 + 'px' : four - 35 + 'px';
      this.customStepperSize.stepperFive =
        five <= 110 ? five + 50 + 'px' : five - 35 + 'px';
    }, 100);
  }

  /* Modal Agregar detalle adicional */
  mostrarAgregarDetallesModal() {
    this.isModalActive = true;
  }
  ocultarAgregarDetallesModal(ev: boolean) {
    this.isModalActive = false;
  }
  /* Modal solicitud compleatada */
  mostrarModalSolicitudCompeltada() {
    this.modalSolicitudCompletada = true;
  }
  ocultarModalSolicitudCompeltada() {
    this.modalSolicitudCompletada = false;
  }
  /* Modal registra medicamento */
  mostrarModalRegistrarMedicamento() {
    this.modalRegistrarMedicamento = true;
  }
  ocultarModalRegistrarMedicamento() {
    this.modalRegistrarMedicamento = false;
  }

  /**
   * @description una funcion temporal para acceder a un apartado de pruebas
   */
  addAccessKey() {
    window.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.code == 'KeyQ')
        this.router.navigate(['/testing']);
    });
  }

  mostrarDocumentoAdicional(respuestaCopago: string) {
    this.eliminarDocumentoAdicional = respuestaCopago;
  }
}
